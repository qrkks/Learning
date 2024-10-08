from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from dotenv import load_dotenv
import os

from api.deps import db_dependency, bcrypt_context
from api.models import User

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


class UserCreateSchema(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


async def authenticate_user(username: str, password: str):
    try:
        # 从具体模型中获取 DoesNotExist 异常
        user = await User.get(username=username)
    except User.DoesNotExist:  # 使用模型中的 DoesNotExist
        return False

    if not bcrypt_context.verify(password, user.password):
        return False

    return user


async def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {"sub": username, "id": user_id}
    expire = datetime.now(timezone.utc) + expires_delta
    encode.update({"exp": expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreateSchema, db=Depends(db_dependency)):
    user_obj = User(username=user.username,
                    password=bcrypt_context.hash(user.password))
    await user_obj.save()
    return {"message": "User created"}
