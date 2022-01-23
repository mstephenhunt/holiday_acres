import pytest

from holiday_acres_api.models import Feed, Horse


"""
Can create and fetch basic feed in DB
"""


@pytest.mark.django_db
def test_feed_create():

    # create horse instance for relationship
    horse = Horse(
        name="Firebrand",
        stall="New Barn 3",
        special_instructions="Important things you should know about horses",
    )
    horse.save()

    # create feed instance
    new_feed = Feed(feed_type="CARB_SAFE", unit="SCOOP", amount=1, horse=1)
    new_feed.save()

    # Should only be one feed in DB
    assert Feed.objects.count() == 1

    # Get that horse -- also there's probably a better way to do this get()
    db_new_feed = Feed.objects.first().get()

    assert Feed.objects.count() == 1
