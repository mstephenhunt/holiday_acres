from rest_framework import serializers
from django.http import HttpResponse
from holiday_acres_api.models.Users import User
from holiday_acres_api.models.Paddocks import Paddock
from holiday_acres_api.models.Horses import Horse
from holiday_acres_api.models.Barn_Sections import Barn_Section
from holiday_acres_api.models.Feeds import Feed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]


class PaddockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paddock
        fields = ["id", "paddock_name", "paddock_tier"]


class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ["id", "feed_type", "amount", "unit"]


# https://stackoverflow.com/questions/59882167/nameerror-name-serializers-is-not-defined
# some people have had this issue
class HorseSerializer(serializers.ModelSerializer):
    feed = FeedSerializer(many=True)

    class Meta:
        model = Horse
        # instead of hardcoding all of the fields, would a function make more sense?
        fields = ["id", "name", "user", "feed", "stall", "special_instructions"]

    def update(self, horse, data):
        if "name" in data.keys():
            horse.name = data["name"]
        if "user" in data.keys():
            horse.user = data["user"]
        if "stall" in data.keys():
            horse.stall = data["stall"]
        if "special_instructions" in data.keys():
            horse.special_instructions = data["special_instructions"]

        horse.save()

        # If new feed was provided, put that in by removing
        # the old instance and creating a new instance
        response = HttpResponse()
        if "feed" in data.keys():

            for feed in data["feed"]:
                if feed["feed_type"] == "HAY_CUT" and feed["unit"] not in [
                    "FIRST_CUT",
                    "SECOND_CUT",
                ]:
                    raise Exception("Haycut must be 1st cut or 2nd cut")
                if feed["amount"] < 0:
                    raise Exception("Amount must be a positive value")
            #     # validate feed type
            #     feed_type_list = [
            #         "PELLETS",
            #         "HAY_PELLETS",
            #         "HAY_CUT",
            #         "FIBREMAX",
            #         "ALFALA",
            #         "CARBSAFE",
            #         "OIL",
            #         "NONE",
            #     ]
            #     if feed["feed_type"] not in feed_type_list:
            #         print("Incorrect feed type")
            #         return horse
            #     # validate unit type
            #     feed_unit_list = ["HANDFUL", "SCOOP", "FIRST_CUT", "SECOND_CUT"]
            #     if feed["unit"] not in feed_unit_list:
            #         print("Incorrect unit type")
            #         raise Exception("Incorrect unit type")
            # Nuke whatever feed is currently in the DB for this horse for it's feed
            for current_feed in horse.feed.all():
                current_feed.delete()

            # Create new instance of feed from data
            for feed in data["feed"]:
                Feed.objects.create(
                    horse=horse,
                    feed_type=Feed.FeedType(feed["feed_type"]),
                    unit=Feed.FeedUnit(feed["unit"]),
                    amount=feed["amount"],
                )

        return horse


class BarnSectionSerializer(serializers.ModelSerializer):
    horses = HorseSerializer(many=True)

    class Meta:
        model = Barn_Section
        fields = ["id", "name", "horses"]
