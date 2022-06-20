from fastapi import FastAPI
from modules.barn.routers.barn_router import barn_router


app = FastAPI()
app.include_router(barn_router)


@app.get("/")
async def root():
    return {"service": "barn-api-service"}
