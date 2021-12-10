from django.db import models
from .Users import User
from .Barn_Sections import Barn_Section
from django.db.models.deletion import SET_DEFAULT, SET_NULL


class Horse(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # DB RELATIONSHIPS
    # one-to-many relation (one Barn_Section to many Horses)
    barn_section = models.ForeignKey(
        Barn_Section, related_name="horses", null=True, on_delete=SET_NULL
    )
    # one-to-many relation (one user to many horses)
    user = models.ForeignKey(User, related_name="horses", null=True, on_delete=SET_NULL)
    # HORSE DATA
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    tier = models.IntegerField()
    feed = models.CharField(max_length=200)
    health = models.TextField()
    misc_notes = models.TextField()
