import pytest

from holiday_acres_api.models import Feed, Horse
from holiday_acres_api.serializers import HorseSerializer


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

    # run horse.update (no negative feed amount)
    has_negative_amount = {"feed": [{"amount": -1}]}

    with pytest.raises(Exception) as exception_info:
        HorseSerializer().update(horse, has_negative_amount)

    assert str(exception_info.value) == "Amount must be a positive value"
    print(exception_info.value)

    # run horse.update (hay cut goes with first or second cut)
    test_hay_cut = {"feed": [{"feed_type": "HAY_CUT", "unit": "SCOOP", "amount": 1}]}

    with pytest.raises(Exception) as exception_info:
        HorseSerializer().update(horse, test_hay_cut)

    assert str(exception_info.value) == "Haycut must be 1st cut or 2nd cut"
    print(exception_info.value)

    # run horse.update (scoopable feed must be scooped or handful-ed)
    test_scoopable_feed = {
        "feed": [{"feed_type": "PELLETS", "unit": "CUP", "amount": 1}]
    }

    with pytest.raises(Exception) as exception_info:
        HorseSerializer().update(horse, test_scoopable_feed)

    assert str(exception_info.value) == "Must measure by scoop or handful"
    print(exception_info.value)

    # run horse.update (cups are for oil)
    test_oil_cups = {"feed": [{"feed_type": "OIL", "unit": "SCOOP", "amount": 1}]}

    with pytest.raises(Exception) as exception_info:
        HorseSerializer().update(horse, test_oil_cups)

    assert str(exception_info.value) == "Oil must be measured in Cups"
    print(exception_info.value)

    # create feed instance
    new_feed = Feed(feed_type="CARB_SAFE", unit="SCOOP", amount=1, horse=horse)

    new_feed.save()

    # Should only be one feed in DB
    assert Feed.objects.count() == 1

    # Get that horse -- also there's probably a better way to do this get()
    db_new_feed = Feed.objects.all()[:1].get()

    # Check that db_new_feed values are consistent

    assert db_new_feed.feed_type == "CARB_SAFE"
    assert db_new_feed.unit == "SCOOP"
    assert db_new_feed.amount == 1
    assert db_new_feed.horse == horse
