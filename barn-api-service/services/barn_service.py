from sqlalchemy.orm import Session
from models.BarnSection import BarnSection


async def get_barn_sections(db: Session):
    return db.query(BarnSection).all()


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()
