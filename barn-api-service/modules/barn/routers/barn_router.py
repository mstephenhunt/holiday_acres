from fastapi import APIRouter

barn_router = APIRouter()


@barn_router.get("/barn_sections/")
async def barn_sections():
    return [{"username": "Rick"}, {"username": "Morty"}]
