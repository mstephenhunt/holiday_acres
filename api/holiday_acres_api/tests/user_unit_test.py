import pytest

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
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()

    # Should only be one user in DB
    assert User.objects.count() == 1

    # Get that user -- also there's probably a better way to do this get()
    db_user = User.objects.all()[:1].get()
    # I think this would work
    # db_user = User.objects.FIRST()

    # Check User fields username, password, first_name, last_name, email
    assert db_user.username == "LetsTest54321!"
    assert db_user.password == "ATestPW_12345"
    assert db_user.email == "tester1@testplace.com"
    assert db_user.first_name == "Testy"
    assert db_user.last_name == "McTesterson"


# Check against duplicate user
@pytest.mark.django_db(transaction=True)
def test_user_duplicate():
    # first user
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()
    # duplicate user
    user2 = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user2.save()


# Check against missing fields
@pytest.mark.django_db(transaction=True)
def test_user_missing_fields():
    # missing email
    user = User(
        username="LetsTest54321!",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()
    assert user == user
    # missing username
    user = User(
        email="tester1@testplace.com",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()

    # missing password
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()

    # missing password_confirmation
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        first_name="Testy",
        last_name="McTesterson",
    )
    user.save()

    # missing first_name
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        last_name="McTesterson",
    )
    user.save()

    # missing last_name
    user = User(
        email="tester1@testplace.com",
        username="LetsTest54321!",
        password="ATestPW_12345",
        password_confirmation="ATestPW_12345",
        first_name="Testy",
    )
    user.save()
