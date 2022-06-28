from ..models.BarnSection import BarnSection
from database import db


async def get_horse():
    return db().query(BarnSection).all()