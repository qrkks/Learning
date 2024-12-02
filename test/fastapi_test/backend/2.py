from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional
from fastapi.templating import Jinja2Templates
from tortoise.contrib.fastapi import register_tortoise
from database import TORTOISE_ORM
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from models import User

SECRET_KEY = "hello"
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
templates = Jinja2Templates(directory='templates')

register_tortoise(
    app,
    config=TORTOISE_ORM,
    generate_schemas=True,
    add_exception_handlers=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 修改为生产环境中的实际前端 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class UserIn(BaseModel):
    username: str
    password: str


class UserInDB(UserIn):
    hashed_password: str


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user(username: str):
    user = await User.get_or_none(username=username)
    return user


async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


class Login(BaseModel):
    username: str
    password: str


@app.post('/token', response_model=Token)
async def login_for_access_token(login_data: Login):  # 接收 JSON 请求体
    # 通过 login_data 获取用户名和密码
    user = await authenticate_user(login_data.username, login_data.password)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 设置 Token 的过期时间
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    # 创建 Access Token
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    # 返回 Token
    return Token(access_token=access_token, token_type="bearer")


@app.post('/user')
async def create_user(user: UserIn):
    existing_user = await User.get_or_none(username=user.username)
    if existing_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    user_db = User(
        username=user.username,
        password=user.password,
        hashed_password=hashed_password)
    await user_db.save()
    return {"username": user.username, "id": user_db.id}


@app.get('/users')
async def get_users():
    users = await User.all()
    return [UserInDB(username=user.username, hashed_password=user.hashed_password) for user in users]


@app.delete('/user')
async def delete_user(user_id: int):
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await user.delete()
    return {"detail": "User deleted successfully"}


@app.get('/test/{id}')
async def test(id: int, q: int = 1):
    return {'Hello': 'World', 'id': id, 'q': q}


@app.get('/')
async def root(req: Request, name: Optional[str] = None):
    return templates.TemplateResponse(
        'index.html',
        {
            'request': req,
            'name': name,
        }
    )

@app.get('/user/me')
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

