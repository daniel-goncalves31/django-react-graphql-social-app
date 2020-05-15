import json

from django.middleware.http import MiddlewareMixin
from graphql_jwt.middleware import JSONWebTokenMiddleware
from graphql_jwt.utils import jwt_encode


class CookieMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if token := getattr(request, "set_jwt_cookie", None):
            response.set_cookie('JWT', token, httponly=True, expires=300)

        return response
