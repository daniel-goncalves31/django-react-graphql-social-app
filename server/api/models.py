from django.contrib.auth.models import AbstractUser
from django.db import models

from .utils import OverwriteStorage


def photo_image_path(user, filename):
    file_extension = filename.split('.')[1]
    new_filename = str(user.id) + "." + file_extension
    return f"users/photos/{new_filename}"


def back_image_path(user, filename):
    file_extension = filename.split('.')[1]
    new_filename = str(user.id) + "." + file_extension
    return f"users/back_images/{new_filename}"


def post_image_path(post, filename):
    return f"posts/{str(post.user.id)}/{filename}"


class User(AbstractUser):
    first_name = None
    last_name = None
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=False, error_messages={
                              'unique': "Email is already taken"})
    photo = models.ImageField(
        upload_to=photo_image_path, null=True, storage=OverwriteStorage())
    back_image = models.ImageField(
        upload_to=back_image_path, null=True, storage=OverwriteStorage())


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    image = models.ImageField(upload_to=post_image_path, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'post']


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):

    NOTIFICATION_TYPES = [
        ('marked in post', 'marked in post')
    ]

    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='senders')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='receivers')
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    readed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    user_one = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='users_one')
    user_two = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='users_two')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user_one', 'user_two']


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=255)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
