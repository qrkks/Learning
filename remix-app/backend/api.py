from fastapi import APIRouter
from fastapi_crudrouter.core.tortoise import TortoiseCRUDRouter
from pydantic import BaseModel
from models import Test

router = APIRouter()


@router.get("/")
async def api_root():
    return {"message": "Hello, World with API Router"}


class TestIn(BaseModel):
    content: str


class TestOut(BaseModel):
    id: int
    content: str


@router.post('/test', response_model=TestOut)
async def create_test(TestIn: TestIn):
    test = await Test.create(content=TestIn.content)
    return test


@router.get('/test', response_model=list[TestOut])
async def get_all_test():
    tests = await Test.all()
    return tests

@router.delete('/test/{id}', response_model=TestOut)
async def delete_test(id: int):
    test = await Test.get(id=id)
    await test.delete()
    return test

