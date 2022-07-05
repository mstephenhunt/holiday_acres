from decimal import Decimal
from database import Base
from sqlalchemy import Column, Integer, String, Numeric, BigInteger


class BarnSection(Base):
    __tablename__ = "holiday_acres_api_barn_section"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


class Horse(Base):
    __tablename__ = "holiday_acres_api_horse"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Feed(Base):
    __tablename__ = "holiday_acres_api_feed"
    id = Column(Integer, primary_key=True, index=True)
    feed_type = Column(String, unique=True, index=True)
    amount = Column(Numeric, unique=True, index=True)
    horse_id = Column(BigInteger, unique=True, index=True)
    unit = Column(String, unique=True, index=True)







