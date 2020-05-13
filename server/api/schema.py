import graphene
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

        return SignUpMutation(user=user)


class Query(object):
    users = graphene.List(UserType)

    def resolve_users(self, info, **kwargs):
        return User.objects.all()


class Mutation(object):
    signup = SignUpMutation.Field()
