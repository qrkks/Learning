from datetime import datetime
from fastapi import FastAPI, HTTPException
from tortoise.contrib.fastapi import register_tortoise
from api.database import TORTOISE_ORM
from api.models import User
from pydantic import BaseModel

app = FastAPI()


# 使用 register_tortoise 初始化数据库
register_tortoise(
    app,
    config=TORTOISE_ORM,
    # db_url='sqlite://db.sqlite3',  # 数据库 URL
    # modules={'models': ['api.models']},  # 指定模型路径
    generate_schemas=True,  # 是否自动生成表
    add_exception_handlers=True,  # 添加数据库相关异常处理
)


@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI with Tortoise ORM!"}


class UserCreate(BaseModel):
    username: str
    password: str


@app.post("/users")
async def create_user(user: UserCreate):
    user = User(username=user.username, password=user.password) # type: ignore
    await user.save() # type: ignore
    return user


class Userout(BaseModel):
    id: int
    username: str
    password: str
    created_at: datetime
    updated_at: datetime


# 根据 ID 获取单个用户
@app.get("/users/{user_id}", response_model=Userout)
async def get_user_by_id(user_id: int):
    user: User = await User.get(id=user_id)
    if not user:
        raise User.DoesnotExist(status_code=404, detail="User not found")
    return user

# 获取所有用户
@app.get("/users", response_model=list[Userout])
async def get_all_users():
    users: list[User] = await User.all() # 一个包含多个模型的列表
    return users
