from rest_framework import serializers
from holiday_acres_api.models import User, Paddock, Horse


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]


class PaddockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paddock
        fields = ["paddock_name", "paddock_tier"]


# https://stackoverflow.com/questions/59882167/nameerror-name-serializers-is-not-defined
# some people have had this issue
class HorseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horse
        # instead of hardcoding all of the fields, would a function make more sense?
        fields = [
            "name",
            "user",
            "age",
            "feed",
            "misc_notes",
            "health",
            # tier will limit which paddocks may be selected
            "tier",
            # paddock will select a specific paddock
            "paddock",
        ]
