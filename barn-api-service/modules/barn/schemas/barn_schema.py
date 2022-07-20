from sqlalchemy.orm import Query
from pydantic import BaseModel, conlist, ValidationError
from typing import List
from modules.barn.schemas.horse_schema import HorseSchema 
from modules.barn.models.BarnSection import Horse


class BarnSchema(BaseModel):
    id: int
    name: str
    horse: List[Horse]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
