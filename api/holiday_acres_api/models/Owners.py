from django.db import models
from django.db.models.deletion import SET_DEFAULT, SET_NULL


class Owner(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # OWNER DATA
    name = models.CharField(max_length=200)
