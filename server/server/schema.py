import graphene
from api.schema import Mutation as ApiMutation, Query as ApiQuery


class Query(ApiQuery, graphene.ObjectType):
    pass


class Mutation(ApiMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
