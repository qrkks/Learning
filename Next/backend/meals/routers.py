from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from meals.models import Meal
import asyncio
from tortoise.transactions import atomic

router = APIRouter(
    prefix="/meals",
    tags=["meals"],
)


class MealIn(BaseModel):
    name: str
    slug: str
    description: str
    image: str


class MealOut(BaseModel):
    id: int
    name: str
    slug: str
    description: str
    image: str
    created_at: datetime
    updated_at: datetime


@router.get("/", response_model=list[MealOut])
async def get_meals(id: Optional[int] = None):
    if id:
        # 如果 id 存在，返回一个列表，包含单个对象
        meal = await Meal.get(id=id)
        if not meal:
            raise HTTPException(status_code=404, detail="Meal not found")
        return [meal]  # 返回一个包含单个对象的列表
    
    # 否则返回所有 meals
    meals = await Meal.all()
    await asyncio.sleep(2)  # 模拟延迟
    return meals


@router.post("/", response_model=MealOut)
async def create_meal(payload: MealIn):
    meal = Meal(name=payload.name, description=payload.description,
                image=payload.image)
    await meal.save()
    return meal


@router.post("/batch", response_model=list[MealOut])
@atomic()
async def create_bulk_meals(payload: list[MealIn]):
    meals = [Meal(**meal.model_dump())
             for meal in payload]  # ★它创建的是类的实例;
    await Meal.bulk_create(meals)  # 使用 bulk insert 批量插入到数据库，提升性能
    return await Meal.all()


@router.delete('/')
async def delete_all_meals():
    await Meal.all().delete()
    return {"message": "All meals deleted"}


@router.get("/{slug}", response_model=MealOut)
async def get_meal(slug: str):
    try:
        meal = await Meal.get(slug=slug)
        return meal
    except:
        raise HTTPException(status_code=404)
