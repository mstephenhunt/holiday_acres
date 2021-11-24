from django.db import models
from django.db.models.deletion import SET_DEFAULT, SET_NULL


class User(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # USER DATA
    username = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200, null=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
