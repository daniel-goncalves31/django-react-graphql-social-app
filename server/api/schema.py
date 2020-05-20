import graphene
from django.contrib.auth import authenticate, login
from django.shortcuts import HttpResponse
from graphene_django.types import DjangoObjectType
from graphene_file_upload.scalars import Upload
from graphene_subscriptions.events import CREATED
from graphql_jwt.decorators import login_required
from graphql_jwt.utils import jwt_encode, set_cookie

from .models import Comment, Like, Notification, Post, User


# Types
class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ['password', 'post_set', 'like_set',
                   'comment_set', 'notification_set', 'senders', 'receivers']


class PostType(DjangoObjectType):
    class Meta:
        model = Post
        exclude = ['comment_set']


class LikeType(DjangoObjectType):
    class Meta:
        model = Like


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class NotificationGQLType(DjangoObjectType):
    class Meta:
        model = Notification

# Inputs Types


class SignUpInputType(graphene.InputObjectType):
    name = graphene.String(required=True)
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=True)


class PostInputType(graphene.InputObjectType):
    text = graphene.String(required=True)
    image = Upload(required=False)


class CommentInputType(graphene.InputObjectType):
    text = graphene.String(required=True)
    post_id = graphene.ID(required=True)
    users_marked = graphene.List(graphene.ID, required=True)

# Mutations


class SignUp(graphene.Mutation):
    class Arguments:
        signup_input = SignUpInputType(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, signup_input):
        user = User.objects.create_user(**signup_input)
        user.save()

        user = authenticate(request=info.context,
                            username=signup_input['username'], password=signup_input['password'])
        login(info.context, user)

        token = jwt_encode({'username': user.username})
        info.context.set_jwt_cookie = token
        return SignUp(user=user)


class CreatePost(graphene.Mutation):
    class Arguments:
        post_input = PostInputType(required=True)

    post = graphene.Field(PostType)

    @login_required
    def mutate(self, info, post_input):
        user = info.context.user

        post = Post(user=user, **post_input)
        post.save()

        return CreatePost(post=post)


class LikePost(graphene.Mutation):

    class Arguments:
        post_id = graphene.ID(required=True)

    like = graphene.Field(LikeType)

    @login_required
    def mutate(self, info, post_id):
        user = info.context.user
        post = Post.objects.get(id=post_id)
        like = Like(user=user, post=post)
        like.save()

        return LikePost(like)


class DislikePost(graphene.Mutation):

    class Arguments:
        like_id = graphene.ID(required=True)

    disliked = graphene.Boolean()

    @login_required
    def mutate(self, info, like_id):
        like = Like.objects.get(id=like_id)

        if like.user.id != info.context.user.id:
            raise ValueError("User and like owner aren't the same")

        like.delete()
        return DislikePost(disliked=True)


class CreateComment(graphene.Mutation):

    class Arguments:
        comment_input = CommentInputType(required=True)

    ok = graphene.Boolean()

    @login_required
    def mutate(self, info, comment_input):
        user = info.context.user

        for user_marked_id in comment_input['users_marked']:
            user_marked = User.objects.get(id=user_marked_id)
            notification = Notification(
                sender=user, receiver=user_marked, type='marked in post')
            notification.save()

        post = Post.objects.get(id=comment_input['post_id'])
        comment = Comment(user=user, post=post, text=comment_input['text'])
        comment.save()

        return CreateComment(ok=True)


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    posts = graphene.List(PostType, offset=graphene.Int(
        required=True), limit=graphene.Int(required=True))
    me = graphene.Field(UserType)

    @login_required
    def resolve_users(self, info, **kwargs):
        return User.objects.exclude(id=info.context.user.id).order_by('name')

    @login_required
    def resolve_posts(self, info, offset, limit):
        return Post.objects.order_by('-id')[offset:(offset+limit)]

    @login_required
    def resolve_me(self, info, **kwargs):
        user = info.context.user
        return user


class Mutation(graphene.ObjectType):
    signup = SignUp.Field()
    create_post = CreatePost.Field()
    like_post = LikePost.Field()
    dislike_post = DislikePost.Field()
    create_comment = CreateComment.Field()


class Subscription(graphene.ObjectType):
    on_new_post = graphene.Field(PostType)
    on_new_comment = graphene.Field(CommentType)

    def resolve_on_new_post(root, info):
        return root.filter(
            lambda event:
                event.operation == CREATED and
                isinstance(event.instance, Post)
        ).map(lambda event: event.instance)

    def resolve_on_new_comment(root, info):
        return root.filter(
            lambda event:
                event.operation == CREATED and
                isinstance(event.instance, Comment)
        ).map(lambda event: event.instance)
