from django.db import models
from django.db.models.deletion import SET_DEFAULT, SET_NULL


class Paddock(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # PADDOCK DATA
    paddock_name = models.CharField(max_length=200)
    paddock_tier = models.IntegerField()
