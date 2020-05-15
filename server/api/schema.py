import graphene
from django.contrib.auth import authenticate, login
from django.shortcuts import HttpResponse
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from graphql_jwt.utils import jwt_encode, set_cookie

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ['password']


class SignUp(graphene.Mutation):
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
        # response = HttpResponse('')
        # token = jwt_encode({'username': user.username})
        # set_cookie(response, 'JWT', token, 300)
        return SignUp(user=user)


class LoginInputType(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)


class Login(graphene.Mutation):
    class Arguments:
        login_input = LoginInputType(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, login_input):
        user = authenticate(request=info.context,
                            username=login_input['username'], password=login_input['password'])

        if user is not None:
            login(info.context, user)
            return Login(user=user)
        else:
            raise ValueError('Username or password is incorrect!')


class Query(object):
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_users(self, info, **kwargs):
        return User.objects.all()

    @login_required
    def resolve_me(self, info, **kwargs):
        user = info.context.user
        return user


class Mutation(object):
    signup = SignUp.Field()
    login = Login.Field()
