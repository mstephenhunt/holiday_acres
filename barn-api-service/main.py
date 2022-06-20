from fastapi import FastAPI
from database import SessionLocal
from services import barn_service


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


@app.get("/")
async def root():
    results = await barn_service.get_barn_sections(get_db())

    for result in results:
        print(result.name)
    # users = crud.get_users(db, skip=skip, limit=limit)
    # return users
    return {"message": "Hello World"}
