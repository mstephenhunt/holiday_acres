import pytest

from holiday_acres_api.models.Users import User

"""
Can create and fetch basic user in DB
"""


@pytest.mark.django_db
def test_user_create():
    user = User(first_name="Testy McTesterson")
    user.save()

    # Should only be one user in DB
    assert User.objects.count() == 1

    # Get that user -- also there's probably a better way to do this get()
    db_user = User.objects.all()[:1].get()

    # Check name
    assert db_user.first_name == "Testy McTesterson"
