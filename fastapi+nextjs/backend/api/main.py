from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

app = FastAPI()


# 使用 register_tortoise 初始化数据库
register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',  # 数据库 URL
    modules={'models': ['models']},  # 指定模型路径
    # generate_schemas=True,  # 是否自动生成表
    add_exception_handlers=True,  # 添加数据库相关异常处理
)


@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI with Tortoise ORM!"}

