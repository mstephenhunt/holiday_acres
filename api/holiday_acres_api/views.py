from django.shortcuts import render
from rest_framework import viewsets
from holiday_acres_api.serializers import UserSerializer
from holiday_acres_api.models import User


class UserViewSet(viewsets.ModelViewSet):
    """
    Dummy endpoint to return all user models in the DB
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
