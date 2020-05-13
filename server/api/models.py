from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    image_url = models.CharField(max_length=500, null=True)
