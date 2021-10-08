from django.db import models


class User(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=200)


class Paddock(models.Model):
    name = models.CharField(max_length=200)
    paddock_name = models.CharField(max_length=200)
    horse = models.CharField(max_length=200)
    tier = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Horse(models.Model):
    name = models.CharField(max_length=200)
    # one-to-many relation (many horses to one paddock)
    paddock_name = models.CharField(max_length=200)
    # one-to-many relation (many horses to one owner)
    owner = models.CharField(max_length=200)
    tier = models.IntegerField()
    age = models.IntegerField()
    feed = models.CharField(max_length=200)
    misc_notes = models.TextField()
    health = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
