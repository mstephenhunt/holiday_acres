from django.db import models


class User(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # USER DATA
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)


class Paddock(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # PADDOCK DATA
    paddock_name = models.CharField(max_length=200)
    paddock_tier = models.IntegerField()


class Horse(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # DB RELATIONSHIPS
    # one-to-many relation (one paddock to many horses)
    paddock = models.ForeignKey(
        Paddock, related_name="horses", on_delete=models.CASCADE
    )
    # one-to-many relation (one user to many horses)
    user = models.ForeignKey(User, related_name="horses", on_delete=models.CASCADE)
    # HORSE DATA
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    tier = models.IntegerField()
    feed = models.CharField(max_length=200)
    health = models.TextField()
    misc_notes = models.TextField()
