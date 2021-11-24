import pytest

from django.test import RequestFactory
from holiday_acres_api.views import register_account_request


def test_create_user_view():
    request = RequestFactory().post("/users/register")
    response = register_account_request(request)

    assert response.status_code == 500
    assert response.reason_phrase == "Missing required fields to register user"
