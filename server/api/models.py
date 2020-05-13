from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, error_messages={
                              'unique': "Email is already taken.a"})
    photo = models.ImageField(upload_to="users", null=True)
