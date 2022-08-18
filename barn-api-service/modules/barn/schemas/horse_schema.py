from pydantic import BaseModel


class HorseSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
