from pydantic import BaseModel


class FeedSchema(BaseModel):
    #id: int
    feed_type: str
    amount: float
    horse_id: int
    unit: str

    class Config:
        orm_mode = True
