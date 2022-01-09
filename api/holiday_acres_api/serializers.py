from rest_framework import serializers
from holiday_acres_api.models.Users import User
from holiday_acres_api.models.Paddocks import Paddock
from holiday_acres_api.models.Horses import Horse
from holiday_acres_api.models.Barn_Sections import Barn_Section
from holiday_acres_api.models.Feeds import Feed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]


class PaddockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paddock
        fields = ["paddock_name", "paddock_tier"]


class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ["feed_type", "amount", "unit", "id"]


# https://stackoverflow.com/questions/59882167/nameerror-name-serializers-is-not-defined
# some people have had this issue
class HorseSerializer(serializers.ModelSerializer):
    feed = FeedSerializer(many=True)

    class Meta:
        model = Horse
        # instead of hardcoding all of the fields, would a function make more sense?
        fields = ["id", "name", "user", "feed", "stall"]

    def update(self, instance, validated_data):
        if "name" in validated_data.keys():
            instance.name = validated_data["name"]

        instance.save()

        # Nuke whatever feed is currently in the DB for this horse for it's feed
        for current_feed in instance.feed.all():
            current_feed.delete()

        # If new feed was provided, put that in
        if "feed" in validated_data.keys():
            for feed in validated_data["feed"]:
                Feed.objects.create(
                    horse=instance,
                    feed_type=Feed.FeedType(feed["feed_type"]),
                    unit=Feed.FeedUnit(feed["unit"]),
                    amount=feed["amount"],
                )

        return instance


class BarnSectionSerializer(serializers.ModelSerializer):
    horses = HorseSerializer(many=True)

    class Meta:
        model = Barn_Section
        fields = ["id", "name", "horses"]
