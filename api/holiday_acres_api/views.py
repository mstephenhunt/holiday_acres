from django.db.models.fields import NullBooleanField
from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from holiday_acres_api.serializers import (
    OwnerSerializer,
    HorseSerializer,
    BarnSectionSerializer,
)
from holiday_acres_api.models import Owner, Paddock, Horse, Barn_Section
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from datetime import datetime
import requests
import environ
import os
from api.settings import BASE_DIR

# set up port 3001 environment variable
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))
user_service_var = env("USER_SERVICE")
django_secret_key = env("SECRET_MIDDLE_KEY")

# ViewSets
class OwnerViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all owner models in the DB
    """

    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer


# class PaddockViewSet(viewsets.ModelViewSet):
#     """
#     Dummy endpoint to return all paddock models in the DB
#     """

#     queryset = Paddock.objects.all()
#     serializer_class = PaddockSerializer


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


# views
@api_view(["POST"])
def register_account_request(request):
    """
    Passes data from the /users/register route to 3001/user to create new users in the database.
    """
    body = request.data
    response = HttpResponse()
    response.status_code = 200
    requests.post(
        (f"http://{user_service_var}/user"),
        data={"email": body["email"], "password": body["password"]},
        headers={"haec-auth-token": django_secret_key},
    )
    print("New User Created")
    return response


@api_view(["POST"])
def login(request):
    body = request.data
    returnedToken = requests.post(
        (f"http://{user_service_var}/user/login"),
        data={"email": body["email"], "password": body["password"]},
        headers={"haec-auth-token": django_secret_key},
    )
    token = returnedToken.text
    return JsonResponse({"token": token})


@api_view(["POST"])
def logout(request):
    body = request.data
    response = HttpResponse()
    response.status_code = 200
    logout = requests.post(
        (f"http://{user_service_var}/user/logout"),
        data={"email": body["email"]},
        headers={"haec-auth-token": django_secret_key},
    )
    return response


@api_view(["GET"])
def health_check(request):
    response = JsonResponse({"current_datetime": datetime.now()})
    response.status_code = 200
    return response
