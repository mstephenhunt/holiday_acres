from fastapi import APIRouter
from modules.barn.services.barn_service import get_barn_sections, get_horses, get_feeds
from modules.barn.schemas.barn_schema import BarnSchema
from modules.barn.schemas.feed_schema import FeedSchema

barn_router = APIRouter()


@barn_router.get("/barn_sections/", response_model=list[BarnSchema])
async def barn_sections():
    return await get_barn_sections()

@barn_router.get("/horses", response_model=list[BarnSchema])
async def horses():
    return await get_horses()

@barn_router.get("/feeds", response_model=list[FeedSchema])
async def feeds():
    return await get_feeds()
