import pytest

from holiday_acres_api.models.Owners import Owner
from holiday_acres_api.models.Paddocks import Paddock
from holiday_acres_api.models.Horses import Horse


"""
Can create and fetch basic horse in DB
"""


@pytest.mark.django_db
def test_horse_create():
    # create horse instance for testing
    horse = Horse(
        name="Firebrand",
        stall="New Barn 3",
        special_instructions="Important things you should know about horses",
    )
    horse.save()

    # Should only be one horse in DB
    assert Horse.objects.count() == 1

    # Get that horse -- also there's probably a better way to do this get()
    db_horse = Horse.objects.all()[:1].get()

    # Check name
    assert db_horse.name == "Firebrand"
    assert db_horse.stall == "New Barn 3"
    assert (
        db_horse.special_instructions == "Important things you should know about horses"
    )


@pytest.mark.django_db
def test_horse_relationships_create():
    # create instance for paddock relationship
    test_paddock = Paddock(paddock_name="test_paddock", paddock_tier=9)
    test_paddock.save()
    # create instance for owner relationship
    test_owner = Owner(
        first_name="Testy",
        last_name="McTesterson",
        email="tester1@testplace.com",
        phone="0123456789",
    )
    test_owner.save()
    # create horse instance for testing
    horse = Horse(
        name="Firebrand",
        stall="New Barn 3",
        special_instructions="Important things you should know about horses",
        owner=test_owner,
    )
    horse.save()

    # Should only be one owner in DB
    assert Horse.objects.count() == 1

    # Get that owner -- also there's probably a better way to do this get()
    db_horse = Horse.objects.all()[:1].get()

    # Check relationships
    assert db_horse.owner == test_owner
