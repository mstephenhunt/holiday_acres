from django.shortcuts import render
from rest_framework import viewsets
from holiday_acres_api.serializers import (
    UserSerializer,
    PaddockSerializer,
    HorseSerializer,
)
from holiday_acres_api.models.Users import User
from holiday_acres_api.models.Paddocks import Paddock
from holiday_acres_api.models.Horses import Horse
from rest_framework.decorators import api_view
from django.http import HttpResponse


class UserViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all user models in the DB
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class PaddockViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all paddock models in the DB
    """

    queryset = Paddock.objects.all()
    serializer_class = PaddockSerializer


class HorseViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all horse models in the DB
    """

    queryset = Horse.objects.all()
    serializer_class = HorseSerializer


@api_view(["POST"])
def register_account_request(request):
    """
    From the /users/register route. Used to create new users in the database.
    """
    body = request.data
    response = HttpResponse()

    # If required fields are missing, return 500 through api
    if (
        "username" not in body
        or "password" not in body
        or "password_confirmation" not in body
    ):
        response.status_code = 500
        response.write("Missing required fields to register user")

    username = body["username"]
    password = body["password"]
    password_confirmation = body["password_confirmation"]

    # If the passwords don't match, reject the creation
    if password != password_confirmation:
        response.status_code = 500
        response.write("Password and password confirmation don't match")

    # Does this user exist in the database?
    # TODO

    # All good, create the user
    # TODO

    response.status_code = 200
    return response
