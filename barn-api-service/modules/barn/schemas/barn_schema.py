from sqlalchemy.orm import Query
from pydantic import BaseModel, conlist, ValidationError
from typing import List
from modules.barn.schemas.horse_schema import HorseSchema

class BarnSchema(BaseModel):
    id: int
    name: str
    horses: List[HorseSchema]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
