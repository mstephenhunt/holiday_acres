from django.db import models
from .Horses import Horse
from django.db.models.deletion import SET_DEFAULT, SET_NULL


class Feed(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Feed DATA
    feed_type = models.CharField(max_length=200)
    unit = models.CharField(max_length=200)
    amount = models.IntegerField(blank=True)
    # one-to-many relation (one user to many horses)
    horse = models.ForeignKey(Horse, related_name="feed", null=True, on_delete=SET_NULL)
