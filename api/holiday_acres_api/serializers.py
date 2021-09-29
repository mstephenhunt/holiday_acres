from rest_framework import serializers
from holiday_acres_api.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name"]
