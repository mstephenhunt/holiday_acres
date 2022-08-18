from pydantic import BaseModel
from modules.barn.schemas.feed_schema import FeedSchema
from typing import List, Optional



class HorseSchema(BaseModel):
    id: int
    name: str
    feed: Optional[List[FeedSchema]]

    class Config:
        orm_mode = True

class HorseInputSchema(BaseModel):
    name: str
