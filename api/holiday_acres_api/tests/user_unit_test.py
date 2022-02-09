import pytest

from django.test import RequestFactory
from holiday_acres_api.views import register_account_request
from holiday_acres_api.models.Users import User

"""
Can create and fetch basic user in DB
Can create user that doesn't exist in db
Will reject if no users exist in DB
Will reject if username and password are different
Will reject if missing username, password, or password_confirmation
"""

# Test User creation
@pytest.mark.django_db(transaction=True)
def test_user_create():
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()

    # Should only be one user in DB
    assert User.objects.count() == 1

    # better way to get first object
    db_user = User.objects.first()

    # Check User fields username, password, first_name, last_name, email
    assert db_user.username == "LetsTest54321!"
    assert db_user.password == "ATestPW_12345"
    assert db_user.email == "tester1@testplace.com"
    assert db_user.first_name == "Testy"
    assert db_user.last_name == "McTesterson"
