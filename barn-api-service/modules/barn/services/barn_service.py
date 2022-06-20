from sqlalchemy.orm import Session
from ..models.BarnSection import BarnSection


async def get_barn_sections(db: Session):
    return db.query(BarnSection).all()
