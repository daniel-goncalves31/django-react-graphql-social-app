import os
from configparser import RawConfigParser

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from graphene_file_upload.django import FileUploadGraphQLView
from graphql.backend import GraphQLCoreBackend
from graphql_jwt.decorators import jwt_cookie
from graphql_playground.views import GraphQLPlaygroundView

from server.settings import BASE_DIR


class GraphQLCustomCoreBackend(GraphQLCoreBackend):
    def __init__(self, executor=None):
        # type: (Optional[Any]) -> None
        super().__init__(executor)
        self.execute_params['allow_subscriptions'] = True


config = RawConfigParser()
config.read(os.path.join(settings.BASE_DIR, 'config.ini'))

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql/", csrf_exempt(jwt_cookie(
        FileUploadGraphQLView.as_view(graphiql=True, backend=GraphQLCustomCoreBackend()))), name='graphql'),
    path('', csrf_exempt(jwt_cookie(GraphQLPlaygroundView.as_view(
        endpoint=config.get('server', 'SERVER_URL') + "/graphql/"))))
    # path('accounts/', include('allauth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
