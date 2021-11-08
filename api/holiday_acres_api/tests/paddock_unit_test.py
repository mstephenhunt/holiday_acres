import pytest

from holiday_acres_api.models.Paddocks import Paddock


"""
Can create and fetch basic paddock in DB
"""


@pytest.mark.django_db
def test_paddock_create():
    paddock = Paddock(paddock_name="Paddock 1", paddock_tier=0)
    paddock.save()

    # Should only be one paddock in DB
    assert Paddock.objects.count() == 1

    # Get that paddock -- also there's probably a better way to do this get()
    db_paddock = Paddock.objects.all()[:1].get()

    # Check name
    assert db_paddock.paddock_name == "Paddock 1"
    assert db_paddock.paddock_tier == 0
