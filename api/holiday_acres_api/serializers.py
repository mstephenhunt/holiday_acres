from rest_framework import serializers
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

        # Nuke whatever feed is currently in the DB for this horse for it's feed
        for current_feed in horse.feed.all():
            current_feed.delete()

        # If new feed was provided, put that in
        if "feed" in data.keys():
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
