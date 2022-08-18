from ..models.BarnSection import BarnSection, Horse, Feed
from database import db


async def get_horses():
    return db().query(Horse).all()

async def create_horse(horse_input):
    # Pull any fields off of the input passed to the endpoint
    input_name = horse_input.name

    # Create an in-memory instance of a BarnSection model
    new_horse = Horse(name=input_name)

    # Put the model into the database
    db_connector = db()
    db_connector.add(new_horse)
    db_connector.flush()
    db_connector.commit()
    db_connector.refresh(new_horse)

    return new_horse

# async def get_horses():
#     return db().query(Horse).all()

async def get_feeds():
    return db().query(Feed).all()
