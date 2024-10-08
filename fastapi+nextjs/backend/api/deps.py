from typing import Annotated
from tortoise import Tortoise, fields
from tortoise.models import Model
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")
oauth2_bearer_dependency = Annotated[str, Depends(oauth2_bearer)]

async def get_current_username(token: oauth2_bearer_dependency):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
user_dependency = Annotated[dict, Depends(get_current_username)]