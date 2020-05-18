from django.db.models.signals import post_delete, post_save
from graphene_subscriptions.signals import (post_delete_subscription,
                                            post_save_subscription)

from .models import Post


def trigger_graphene_subscriptions(sender, **kwargs):
    print('###########signals are working')
    post_save_subscription(sender, **kwargs)


post_save.connect(trigger_graphene_subscriptions,
                  sender=Post, dispatch_uid="on_new_post")

# post_save.connect(post_save_subscription, sender=Post,
#                   dispatch_uid="post_model_post_save")
post_delete.connect(post_delete_subscription, sender=Post,
                    dispatch_uid="post_model_post_delete")
