from ..models.BarnSection import BarnSection, Horse
from database import db


async def get_barn_sections():
    return db().query(BarnSection).all()

async def get_horse():
    return db().query(Horse).all()
