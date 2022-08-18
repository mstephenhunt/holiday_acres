from database import Base
from sqlalchemy import Column, Integer, String, Float, Table, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class BarnSection(Base):
    __tablename__ = "holiday_acres_api_barn_section"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    name = Column(String)
    horses = relationship("Horse")


class Horse(Base):
    __tablename__ = "holiday_acres_api_horse"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    barn_section_id = Column(Integer, ForeignKey("holiday_acres_api_barn_section.id"))
    feed = relationship("Feed")


class Feed(Base):
    __tablename__ = "holiday_acres_api_feed"
    id = Column(Integer, primary_key=True, index=True)
    feed_type = Column(String)
    amount = Column(Float)
    horse_id = Column(Integer, ForeignKey("holiday_acres_api_horse.id"))
    unit = Column(String)
