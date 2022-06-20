from ..models.BarnSection import BarnSection
from database import db


async def get_barn_sections():
    return db().query(BarnSection).all()
