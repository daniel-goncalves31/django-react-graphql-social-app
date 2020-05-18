from django.http import HttpResponse


def unauthenticated_user(subscription):
    def wrapper_func(root, info):
        print(dict(info.context))
        return subscription(root, info)

    return wrapper_func
