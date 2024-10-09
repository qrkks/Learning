from fastapi import FastAPI, HTTPException
from tortoise.contrib.fastapi import register_tortoise
from database import TORTOISE_ORM
from fastapi.middleware.cors import CORSMiddleware
from meals.routers import router as meals_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_tortoise(app, config=TORTOISE_ORM,)

app.include_router(meals_router)


@app.get("/")
async def hello():
    return {"message": "Hello, World with FastAPI with NextJS!"}


@app.get("/error", responses={500: {"description": "Internal Server Error"}})
async def error():
    raise HTTPException(status_code=500, detail="Something went wrong")
