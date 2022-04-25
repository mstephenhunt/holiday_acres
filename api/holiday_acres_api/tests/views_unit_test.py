import pytest

from django.test import RequestFactory
from holiday_acres_api.views import register_account_request

"""
factory = RequestFactory()
data = {'message':'A test message'}
request = factory.post('/a/test/path/', data, content_type='application/json')
"""


@pytest.mark.django_db(transaction=True)
def test_create_owner_view():
    request = RequestFactory().post("/owners/register")
    response = register_account_request(request)

    assert response.status_code == 500
    assert response.reason_phrase == "Missing required fields to register owner"


@pytest.mark.django_db(transaction=True)
def test_owner_info():
    data = {
        "first_name": "Jon",
        "last_name": "hunt",
        "email": "anemailaddress",
        "phone": "0123456789",
    }
    request = RequestFactory().post(
        "/owners/register", data, content_type="application/json"
    )
    response = register_account_request(request)
    assert response.status_code == 500
    assert response.reason_phrase == "owners information doesn't match"


@pytest.mark.django_db(transaction=True)
def test_duplicate_owner():
    # register example owner
    data = {
        "first_name": "Jon",
        "last_name": "hunt",
        "email": "anemailaddress",
        "phone": "0123456789",
    }
    request = RequestFactory().post(
        "/owners/register", data, content_type="application/json"
    )
    response = register_account_request(request)
    # register duplicate user
    data = {
        "first_name": "Jon",
        "last_name": "hunt",
        "email": "anemailaddress",
        "phone": "0123456789",
    }
    request2 = RequestFactory().post(
        "/owners/register", data, content_type="application/json"
    )
    response = register_account_request(request2)
    assert response.status_code == 500
    assert response.reason_phrase == "Owner already exists"
    # register a second, non-duplicate user
    data = {
        "first_name": "Someone",
        "last_name": "Else",
        "email": "anewemailaddress",
        "phone": "9876534210",
    }
    request3 = RequestFactory().post(
        "/owners/register", data, content_type="application/json"
    )
    response = register_account_request(request3)
    assert response.status_code == 200
