from ..models.BarnSection import BarnSection, Horse, Feed
from database import db


async def get_barn_sections():
    return db().query(BarnSection).all()

async def create_barn_section(barn_section_input):
    # Pull any fields off of the input passed to the endpoint
    input_name = barn_section_input.name

    # Create an in-memory instance of a BarnSection model
    new_barn_section = BarnSection(name=input_name)

    # Put the model into the database
    db_connector = db()
    db_connector.add(new_barn_section)
    db_connector.flush()
    db_connector.commit()
    db_connector.refresh(new_barn_section)

    return new_barn_section

async def get_horses():
    return db().query(Horse).all()

async def get_feeds():
    return db().query(Feed).all()
