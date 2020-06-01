from django.db.models.signals import post_delete, post_save
from graphene_subscriptions.signals import (post_delete_subscription,
                                            post_save_subscription)

from .models import Comment, Message, Notification, Post

# Post Signals
post_save.connect(post_save_subscription,
                  sender=Post, dispatch_uid="post_post_save")

post_delete.connect(post_delete_subscription, sender=Post,
                    dispatch_uid="post_post_delete")

# Comments Signals
post_save.connect(post_save_subscription,
                  sender=Comment, dispatch_uid="comment_post_save")

# Chat Messages Signals
post_save.connect(post_save_subscription,
                  sender=Message, dispatch_uid="message_post_save")

# Notification Signals
post_save.connect(post_save_subscription, sender=Notification,
                  dispatch_uid="notification_post_save")
