import pytest

from holiday_acres_api.models.Barns import Barn

from holiday_acres_api.models.Barn_sections import Barn_section


@pytest.mark.django_db
def test_barn_create():
    # create barn_section instance for testing
    new_barn = Barn(name="New Barn")
    new_barn.save()

    # Should only be one barn in DB
    assert Barn.objects.count() == 1

    # Get that horse -- also there's probably a better way to do this get()
    db_barn = Barn.objects.first()

    # Check name
    assert db_barn.name == "New Barn"


# @pytest.mark.django_db
# def test_horse_relationships_create():
#     # create instance for paddock relationship
#     test_paddock = Paddock(paddock_name="test_paddock", paddock_tier=9)
#     test_paddock.save()
#     # create instance for user relationship
#     test_user = User(
#         email="tester1@testplace.com",
#         username="LetsTest54321!",
#         password="ATestPW_12345",
#         first_name="Testy",
#         last_name="McTesterson",
#     )
#     test_user.save()
#     # create horse instance for testing
#     horse = Horse(
#         name="Firebrand",
#         age=10,
#         tier=0,
#         feed="Lots of food",
#         health="Good",
#         misc_notes="Important things you should know about horses",
#         paddock=test_paddock,
#         user=test_user,
#     )
#     horse.save()

#     # Should only be one user in DB
#     assert Horse.objects.count() == 1

#     # Get that user -- also there's probably a better way to do this get()
#     db_horse = Horse.objects.all()[:1].get()

#     # Check relationships
#     assert db_horse.paddock == test_paddock
#     assert db_horse.user == test_user
