from database import Base
from sqlalchemy import Column, Integer, String


class BarnSection(Base):
    __tablename__ = "holiday_acres_api_barn_section"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

"""Seans questions

    what is Base?

    Column(Integer, primary_key=True, index=True) confused on what this is doing
        is this to put items into the table or
        is this calling the ID column then doulbe checking that everything being passed back
        is a integer, and primary key?  what is index
    """
class Horse(Base):
    __tablename__ = "holiday_acres_api_horse"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
