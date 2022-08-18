from fastapi import APIRouter
from modules.barn.services.barn_service import get_barn_sections, create_barn_section, get_horses, get_feeds
from modules.barn.services.horse_service import get_horses, create_horse, get_horses, get_feeds
from modules.barn.schemas.barn_schema import BarnSchema, BarnInputSchema
from modules.barn.schemas.feed_schema import FeedSchema
from modules.barn.schemas.horse_schema import HorseSchema, HorseInputSchema

barn_router = APIRouter()


@barn_router.get("/barn_sections/", response_model=list[BarnSchema])
async def barn_sections():
    return await get_barn_sections()

@barn_router.post("/barn_sections/", response_model=BarnSchema)
async def post_barn_sections(barn_section: BarnInputSchema):
    return await create_barn_section(barn_section)

@barn_router.get("/horses", response_model=list[HorseSchema])
async def horses():
    return await get_horses()

@barn_router.post("/horses", response_model=HorseSchema)
async def post_horses(horses: HorseInputSchema):
    return await create_horse(horses)

@barn_router.get("/feeds", response_model=list[FeedSchema])
async def feeds():
    return await get_feeds()
