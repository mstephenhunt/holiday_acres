import pytest

from django.test import RequestFactory
from holiday_acres_api.views import register_account_request

"""
factory = RequestFactory()
data = {'message':'A test message'}
request = factory.post('/a/test/path/', data, content_type='application/json')
"""


@pytest.mark.django_db(transaction=True)
def test_create_user_view():
    data = {
        "username": "1234",
        "email": "1234",
        "first_name": "12345",
        "last_name": "123456",
    }
    request = RequestFactory().post(
        "/users/register", data, content_type="application/json"
    )
    response = register_account_request(request)

    assert response.status_code == 500
    assert response.reason_phrase == "Missing required field(s) to register user"


@pytest.mark.django_db(transaction=True)
def test_password_mismatch():
    data = {
        "username": "test_username",
        "password": "12345",
        "password_confirmation": "67890",
        "email": "anemailaddress",
        "first_name": "Jon",
        "last_name": "hunt",
    }
    request = RequestFactory().post(
        "/users/register", data, content_type="application/json"
    )
    response = register_account_request(request)
    assert response.status_code == 500
    assert response.reason_phrase == "Password and password confirmation don't match"


@pytest.mark.django_db(transaction=True)
def test_duplicate_user():
    # register example user
    data = {
        "username": "test_username",
        "password": "12345",
        "password_confirmation": "12345",
        "email": "anemailaddress",
        "first_name": "Jon",
        "last_name": "hunt",
    }
    request = RequestFactory().post(
        "/users/register", data, content_type="application/json"
    )
    response = register_account_request(request)
    # register duplicate user with same "data" info
    request2 = RequestFactory().post(
        "/users/register", data, content_type="application/json"
    )
    response = register_account_request(request2)
    assert response.status_code == 500
    assert response.reason_phrase == "Username already exists"
    # register a second, non-duplicate user
    data = {
        "username": "test_username2",
        "password": "12345",
        "password_confirmation": "12345",
        "email": "anemailaddress",
        "first_name": "Jon",
        "last_name": "hunt",
    }
    request3 = RequestFactory().post(
        "/users/register", data, content_type="application/json"
    )
    response = register_account_request(request3)
    assert response.status_code == 200
    for user in User.objects.all():
        print(user.username)
    print("non-duplicate user created", response.status_code)
