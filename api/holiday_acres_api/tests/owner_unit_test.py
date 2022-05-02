import pytest

from holiday_acres_api.models.Owners import Owner

"""
Can create and fetch basic owner in DB
"""

# Test Owner creation
@pytest.mark.django_db(transaction=True)
def test_owner_create():
    owner = Owner(name="Fat Cat")
    owner.save()

    # Should only be one owner in DB
    assert Owner.objects.count() == 1

    # Get that owner
    db_owner = Owner.objects.first()


# Check against duplicate Owner
@pytest.mark.django_db(transaction=True)
def test_owner_duplicate():
    # first owner
    owner = Owner(name="Fat Cat")
    owner.save()
    # duplicate owner
    owner2 = Owner(name="Fat Cat")
    owner2.save()

    assert owner != owner2
