from django.db.models.fields import NullBooleanField
from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from api.settings import USER_SERVICE
from holiday_acres_api.serializers import (
    UserSerializer,
    PaddockSerializer,
    HorseSerializer,
    BarnSectionSerializer,
)
from holiday_acres_api.models import User, Paddock, Horse, Barn_Section
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from datetime import datetime
import requests


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


class BarnSectionViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all horse models in the DB
    """

    queryset = Barn_Section.objects.all()
    serializer_class = BarnSectionSerializer


@api_view(["POST"])
def register_account_request(request):
    """
    Passes data from the /users/register route to 3001/user to create new users in the database.
    """
    body = request.data
    response = HttpResponse()
    response.status_code = 200
    for item in USER_SERVICE:
        user_service = item
    requests.post(
        (f"http://{user_service}/user"),
        data={"email": body["email"], "password": body["password"]},
    )
    return response


@api_view(["POST"])
def login(request):
    body = request.data
    for item in USER_SERVICE:
        user_service = item
    returnedToken = requests.post(
        (f"http://{user_service}/user/login"),
        data={"email": body["email"], "password": body["password"]},
    )
    token = returnedToken.text
    return JsonResponse({"token": token})


@api_view(["POST"])
def logout(request):
    body = request.data
    response = HttpResponse()
    response.status_code = 200
    for item in USER_SERVICE:
        user_service = item
    logout = requests.post(
        (f"http://{user_service}/user/logout"), data={"email": body["email"]}
    )
    return response


@api_view(["GET"])
def health_check(request):
    response = JsonResponse({"current_datetime": datetime.now()})
    response.status_code = 200
    return response
