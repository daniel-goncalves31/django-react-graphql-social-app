from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql", csrf_exempt(jwt_cookie(GraphQLView.as_view(graphiql=True)))),
    # path('accounts/', include('allauth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
