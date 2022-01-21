from django.db import models
from .Horses import Horse
from django.db.models.deletion import SET_NULL
from django.utils.translation import gettext_lazy as _


class Feed(models.Model):

    """
    Enum defs for FeedTypes/Units
    """

    class FeedType(models.TextChoices):
        PELLETS = "PELLETS", _("PELLETS")
        HAY_PELLETS = "HAY_PELLETS", _("HAY_PELLETS")
        HAY_CUT = "HAY_CUT", _("HAY_CUT")
        FIBREMAX = "FIBREMAX", _("FIBREMAX")
        ALFALFA = "ALFALFA", _("ALFALFA")
        CARB_SAFE = "CARB_SAFE", _("CARB_SAFE")
        OIL = "OIL", _("OIL")
        NONE = "", _("")

    class FeedUnit(models.TextChoices):
        SCOOP = "SCOOP", _("SCOOP")
        HANDFUL = "HANDFUL", _("HANDFUL")
        FIRST_CUT = "FIRST_CUT", _("FIRST_CUT")
        SECOND_CUT = "SECOND_CUT", _("SECOND_CUT")
        CUP = "CUP", _("CUP")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    feed_type = models.CharField(
        max_length=200, choices=FeedType.choices, default=FeedType.NONE
    )
    unit = models.CharField(max_length=200, choices=FeedUnit.choices, blank=True)
    amount = models.DecimalField(blank=True, max_digits=5, decimal_places=2)
    # one-to-many relation (one feed to many horses)
    horse = models.ForeignKey(Horse, related_name="feed", null=True, on_delete=SET_NULL)
