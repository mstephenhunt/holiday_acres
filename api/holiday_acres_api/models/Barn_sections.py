from django.db import models

# from .Barns import Barn

"""Along with these, we'll need to make a REQUIRED one-to-many relationship
between Barn -> BarnSection and a REQUIRED one-to-many relationship with
BarnSection and Horse."""


class Barn_section(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Barn_section DATA
    name = models.CharField(max_length=200)
    # Should we have a limit on the number of horses each section can hold?
    # capacity = models.IntegerField
    # one-to-many relation (one Barn to many Barn_sections)
    # barn = models.ForeignKey(
    #     Barn, related_name="barn_section",
    # )
