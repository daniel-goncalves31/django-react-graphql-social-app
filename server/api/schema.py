import logging

import graphene
from django.contrib.auth import authenticate, login
from django.shortcuts import HttpResponse
from graphene_django.types import DjangoObjectType
from graphene_file_upload.scalars import Upload
from graphene_subscriptions.events import CREATED
from graphql_jwt.decorators import login_required
from graphql_jwt.utils import jwt_encode, set_cookie

from .models import Post, User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ['password', 'post_set']


class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = '__all__'


class SignUpInputType(graphene.InputObjectType):
    name = graphene.String(required=True)
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=True)


class PostInputType(graphene.InputObjectType):
    text = graphene.String(required=True)
    image = Upload(required=False)


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


class Query(object):
    users = graphene.List(UserType)
    posts = graphene.List(PostType)
    me = graphene.Field(UserType)

    @login_required
    def resolve_users(self, info, **kwargs):
        return User.objects.exclude(id=info.context.user.id).order_by('name')

    @login_required
    def resolve_posts(self, info, **kwargs):
        return Post.objects.order_by('-id')

    @login_required
    def resolve_me(self, info, **kwargs):
        user = info.context.user
        return user


class Mutation(object):
    signup = SignUp.Field()
    create_post = CreatePost.Field()


class Subscription(graphene.ObjectType):
    on_new_post = graphene.Field(PostType)

    def resolve_on_new_post(root, info):
        print('@@@@@@@@@@@subscription')
        return root.filter(
            lambda event:
                event.operation == CREATED and
                isinstance(event.instance, Post)
        ).map(lambda event: event.instance)
