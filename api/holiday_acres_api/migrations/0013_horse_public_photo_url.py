# Generated by Django 3.2.11 on 2022-06-05 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("holiday_acres_api", "0012_alter_feed_unit")]

    operations = [
        migrations.AddField(
            model_name="horse",
            name="public_photo_url",
            field=models.TextField(null=True),
        )
    ]
