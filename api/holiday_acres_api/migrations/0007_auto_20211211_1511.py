# Generated by Django 3.2.7 on 2021-12-11 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("holiday_acres_api", "0006_alter_feed_horse")]

    operations = [
        migrations.AlterField(
            model_name="feed",
            name="feed_type",
            field=models.CharField(
                choices=[
                    ("PELLETS", "Pellets"),
                    ("HAY_PELLETS", "Hay Pellets"),
                    ("HAY_CUT", "Hay Cut"),
                    ("FIBREMAX", "Fibremax"),
                    ("ALFALFA", "Alfalfa"),
                    ("CARB_SAFE", "Carb Safe"),
                    ("OIL", "Oil"),
                    ("", "None"),
                ],
                default="",
                max_length=200,
            ),
        ),
        migrations.AlterField(
            model_name="feed",
            name="unit",
            field=models.CharField(
                blank=True,
                choices=[
                    ("SCOOP", "Scoop"),
                    ("HANDFUL", "Handful"),
                    ("FIRST_CUT", "First Cut"),
                    ("SECOND_CUT", "Second Cut"),
                ],
                max_length=200,
            ),
        ),
    ]
