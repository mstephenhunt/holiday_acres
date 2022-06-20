from fastapi import APIRouter
from modules.barn.services.barn_service import get_barn_sections
from modules.barn.schemas.barn_schema import BarnSchema

barn_router = APIRouter()


@barn_router.get("/barn_sections/", response_model=list[BarnSchema])
async def barn_sections():
    return await get_barn_sections()
