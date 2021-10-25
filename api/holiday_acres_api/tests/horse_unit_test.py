import pytest

from holiday_acres_api.models import Horse
from holiday_acres_api.models import Paddock
from holiday_acres_api.models import User


"""
Can create and fetch basic horse in DB
"""


@pytest.mark.django_db
def test_horse_create():
    # create horse instance for testing
    horse = Horse(
        name="Firebrand",
        age=10,
        tier=0,
        feed="Lots of food",
        health="Good",
        misc_notes="Important things you should know about horses",
    )
    horse.save()

    # Should only be one horse in DB
    assert Horse.objects.count() == 1

    # Get that horse -- also there's probably a better way to do this get()
    db_horse = Horse.objects.all()[:1].get()

    # Check name
    assert db_horse.name == "Firebrand"
    assert db_horse.age == 10
    assert db_horse.tier == 0
    assert db_horse.feed == "Lots of food"
    assert db_horse.health == "Good"
    assert db_horse.misc_notes == "Important things you should know about horses"