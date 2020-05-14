from django.contrib.auth.models import AbstractUser
from django.db import models


def user_photo_path(user, filename):
    file_extension = filename.split('.')[1]
    new_filename = str(user.id) + "." + file_extension
    return f"users/{new_filename}"


class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, error_messages={
                              'unique': "Email is already taken.a"})
    photo = models.ImageField(upload_to=user_photo_path, null=True)
