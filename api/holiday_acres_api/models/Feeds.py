from django.db import models
from .Horses import Horse
from django.db.models.deletion import SET_NULL
from django.utils.translation import gettext_lazy as _


class Feed(models.Model):

    """
    Enum defs for FeedTypes/Units
    """

    class FeedType(models.TextChoices):
        PELLETS = ("PELLETS",)
        HAY_PELLETS = ("HAY_PELLETS",)
        HAY_CUT = ("HAY_CUT",)
        FIBREMAX = ("FIBREMAX",)
        ALFALFA = ("ALFALFA",)
        CARB_SAFE = ("CARB_SAFE",)
        OIL = "OIL"
        NONE = ""

    class FeedUnit(models.TextChoices):
        SCOOP = ("SCOOP",)
        HANDFUL = ("HANDFUL",)
        FIRST_CUT = ("FIRST_CUT",)
        SECOND_CUT = "SECOND_CUT"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    feed_type = models.CharField(
        max_length=200, choices=FeedType.choices, default=FeedType.NONE
    )
    unit = models.CharField(max_length=200, choices=FeedUnit.choices, blank=True)
    amount = models.IntegerField(blank=True)
    # one-to-many relation (one user to many horses)
    horse = models.ForeignKey(Horse, related_name="feed", null=True, on_delete=SET_NULL)
