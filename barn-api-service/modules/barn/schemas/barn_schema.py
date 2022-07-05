from pydantic import BaseModel


class BarnSchema(BaseModel):
    #id: int
    name: str

    class Config:
        orm_mode = True
