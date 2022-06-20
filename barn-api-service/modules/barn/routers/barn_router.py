from fastapi import APIRouter
from modules.barn.services.barn_service import get_barn_sections

barn_router = APIRouter()


@barn_router.get("/barn_sections/")
async def barn_sections():
    return await get_barn_sections()
