from django.db import models

"""Along with these, we'll need to make a REQUIRED one-to-many relationship
between Barn -> BarnSection and a REQUIRED one-to-many relationship with
BarnSection and Horse."""


class Barn(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Barn DATA
    name = models.CharField(max_length=200)
    # DB RELATIONSHIPS
    # related_name barn_section
