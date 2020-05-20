from django.db.models.signals import post_delete, post_save
from graphene_subscriptions.signals import (post_delete_subscription,
                                            post_save_subscription)

from .models import Post, Comment

# Post Signals
post_save.connect(post_save_subscription,
                  sender=Post, dispatch_uid="on_post_create")

post_delete.connect(post_delete_subscription, sender=Post,
                    dispatch_uid="on_post_delete")

# Comments Signals
post_save.connect(post_save_subscription,
                  sender=Comment, dispatch_uid="on_comment_create")

