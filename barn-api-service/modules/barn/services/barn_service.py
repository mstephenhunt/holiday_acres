from ..models.BarnSection import BarnSection, Horse, Feed
from database import db


async def get_barn_sections():
    return db().query(BarnSection).all()

async def get_horses():
    return db().query(Horse).all()

async def get_feeds():
    return db().query(Feed).all()
