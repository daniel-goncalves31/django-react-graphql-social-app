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


class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, error_messages={
                              'unique': "Email is already taken"})
    photo = models.ImageField(
        upload_to=photo_image_path, null=True, storage=OverwriteStorage())
    back_image = models.ImageField(
        upload_to=back_image_path, null=True, storage=OverwriteStorage())
