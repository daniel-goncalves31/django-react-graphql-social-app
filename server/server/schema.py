import graphene
import graphql_jwt

from api.schema import Mutation as ApiMutation
from api.schema import Query as ApiQuery
from api.schema import UserType


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Query(ApiQuery, graphene.ObjectType):
    pass


class Mutation(ApiMutation, graphene.ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
