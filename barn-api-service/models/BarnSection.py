from database import Base
from sqlalchemy import Column, Integer, String


class BarnSection(Base):
    __tablename__ = "holiday_acres_api_barn_section"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
