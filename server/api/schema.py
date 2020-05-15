import logging

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


class SignUpInputType(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)


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


class LoginInputType(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)


class Login(graphene.Mutation):
    class Arguments:
        login_input = LoginInputType(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, login_input):
        user = authenticate(request=info.context,
                            **login_input)

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
