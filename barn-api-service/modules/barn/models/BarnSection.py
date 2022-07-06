from database import Base
from sqlalchemy import Column, Integer, String, Float


class BarnSection(Base):
    __tablename__ = "holiday_acres_api_barn_section"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Horse(Base):
    __tablename__ = "holiday_acres_api_horse"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

class Feed(Base):
    __tablename__ = "holiday_acres_api_feed"
    id = Column(Integer, primary_key=True, index=True)
    feed_type = Column(String)
    amount = Column(Float)
    horse_id = Column(Integer)
    unit = Column(String)
