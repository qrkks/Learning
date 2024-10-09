from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from meals.models import Meal
import asyncio


router = APIRouter(
    prefix="/meals",
    tags=["meals"],
)


class MealIn(BaseModel):
    name: str
    description: str
    image: str

class MealOut(BaseModel):
    id: int
    name: str
    description: str
    image: str
    created_at: datetime
    updated_at: datetime

@router.get("/", response_model=list[MealOut])
async def get_meals():
    meals = await Meal.all()
    await asyncio.sleep(2)
    return meals

@router.post("/", response_model=MealOut)
async def create_meal(payload: MealIn):
    meal = Meal(name=payload.name, description=payload.description, image=payload.image)
    await meal.save()
    return meal

@router.post("/batch", response_model=list[MealOut])
async def create_bulk_meals(payload: list[MealIn]):
    meals = [Meal(name=meal.name, description=meal.description, image=meal.image) for meal in payload] # ★它创建的是类的实例;也可以直接使用**payload
    
    # 使用 bulk insert 批量插入到数据库，提升性能
    await Meal.bulk_create(meals)
    
    return meals

@router.get("/{id}", response_model=MealOut)
async def get_meal(id: int):
    meal = await Meal.get(id=id)
    return meal
