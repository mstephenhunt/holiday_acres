from fastapi import FastAPI
from database import SessionLocal
from modules.barn.routers.barn_router import barn_router
from modules.barn.services.barn_service import get_barn_sections


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


app.include_router(barn_router)


@app.get("/")
async def root():
    results = await get_barn_sections(get_db())

    names = []
    for result in results:
        names.append(result.name)

    return {"barn_sections": names}
