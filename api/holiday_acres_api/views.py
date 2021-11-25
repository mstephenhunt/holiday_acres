from django.db.models.fields import NullBooleanField
from django.shortcuts import render
from rest_framework import viewsets
from holiday_acres_api.serializers import (
    UserSerializer,
    PaddockSerializer,
    HorseSerializer,
)
from holiday_acres_api.models import User, Paddock, Horse
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
        or "email" not in body
        or "first_name" not in body
        or "last_name" not in body
    ):
        response.status_code = 500
        response.reason_phrase = "Missing required fields to register user"
        return response

    username = body["username"]
    password = body["password"]
    password_confirmation = body["password_confirmation"]
    email = body["email"]
    first_name = body["first_name"]
    last_name = body["last_name"]

    # If the passwords don't match, reject the creation
    if password != password_confirmation:
        response.status_code = 500
        response.reason_phrase = "Password and password confirmation don't match"
        return response

    # Does this user exist in the database?
    queryset = User.objects.all()
    # iterate through each User instance, check object.username against username variable
    for user in queryset:
        if user.username == username:
            print("username already exists, dude")
            response.status_code = 500
            response.reason_phrase = "Username already exists"
            return response

    # All good, create the user
    new_user = User.objects.create(
        email=email,
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )
    new_user.save()

    response.status_code = 200
    response.reason_phrase == "New user created"
    return response
