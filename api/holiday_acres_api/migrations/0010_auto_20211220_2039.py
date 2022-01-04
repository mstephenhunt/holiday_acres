# Generated by Django 3.2.7 on 2021-12-21 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("holiday_acres_api", "0009_alter_feed_amount")]

    operations = [
        migrations.AddField(
            model_name="horse",
            name="special_instructions",
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name="feed",
            name="feed_type",
            field=models.CharField(
                choices=[
                    ("PELLETS", "PELLETS"),
                    ("HAY_PELLETS", "HAY_PELLETS"),
                    ("HAY_CUT", "HAY_CUT"),
                    ("FIBREMAX", "FIBREMAX"),
                    ("ALFALFA", "ALFALFA"),
                    ("CARB_SAFE", "CARB_SAFE"),
                    ("OIL", "OIL"),
                    ("", ""),
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
                    ("SCOOP", "SCOOP"),
                    ("HANDFUL", "HANDFUL"),
                    ("FIRST_CUT", "FIRST_CUT"),
                    ("SECOND_CUT", "SECOND_CUT"),
                ],
                max_length=200,
            ),
        ),
    ]
