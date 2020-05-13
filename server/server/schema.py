import graphene
from api.schema import Query as ApiQuery


class Query(ApiQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
