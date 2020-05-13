import graphene
from django.contrib.auth import authenticate, login
from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ['password']


class SignUpMutation(graphene.Mutation):
    class Arguments:

        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, username, password, email, first_name, last_name):
        user = User.objects.create_user(username=username, password=password,
                                        email=email, first_name=first_name, last_name=last_name)
        user.save()

        user = authenticate(request=info.context,
                            username=username, password=password)
        login(info.context, user)
        return SignUpMutation(user=user)


class LoginMutation(graphene.Mutation):
    class Arguments:

        username = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, username, password):

        user = authenticate(request=info.context,
                            username=username, password=password)

        if user is not None:
            login(info.context, user)
            return LoginMutation(user=user)
        else:
            raise ValueError('Username or password is incorrect!')


class Query(object):
    users = graphene.List(UserType)

    def resolve_users(self, info, **kwargs):
        return User.objects.all()


class Mutation(object):
    signup = SignUpMutation.Field()
    login = LoginMutation.Field()
