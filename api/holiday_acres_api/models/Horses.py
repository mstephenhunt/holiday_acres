from django.db import models
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
    # relationship to Feeds (many horses to one feed)
    # HORSE DATA
    name = models.CharField(max_length=200)
    stall = models.TextField()
    special_instructions = models.TextField(null=True)
