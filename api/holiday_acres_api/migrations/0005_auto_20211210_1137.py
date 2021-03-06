# Generated by Django 3.2.7 on 2021-12-10 16:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [("holiday_acres_api", "0004_horse_stall")]

    operations = [
        migrations.RemoveField(model_name="horse", name="feed"),
        migrations.CreateModel(
            name="Feed",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("feed_type", models.CharField(max_length=200)),
                ("unit", models.CharField(max_length=200)),
                ("amount", models.IntegerField(blank=True)),
                (
                    "horse",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="feeds",
                        to="holiday_acres_api.horse",
                    ),
                ),
            ],
        ),
    ]
