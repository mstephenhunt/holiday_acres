from django.shortcuts import render
from rest_framework import viewsets
from holiday_acres_api.serializers import (
    UserSerializer,
    PaddockSerializer,
    HorseSerializer,
)
from holiday_acres_api.models import User, Paddock, Horse


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
