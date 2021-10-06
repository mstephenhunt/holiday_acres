# Generated by Django 3.2.7 on 2021-10-04 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("holiday_acres_api", "0001_initial")]

    operations = [
        migrations.CreateModel(
            name="Paddock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("horse", models.CharField(max_length=200)),
                ("last_maintained", models.DateTimeField()),
                ("tier", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        )
    ]
