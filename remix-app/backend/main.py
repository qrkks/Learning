from fastapi import FastAPI, APIRouter
from api import router
from tortoise.contrib.fastapi import register_tortoise
from database import TORTOISE_ORM

app = FastAPI()

app.include_router(router, prefix="/api")

register_tortoise(app, config=TORTOISE_ORM)


@router.get("/")
async def api_root():
    return {"message": "Hello, World"}


