import time 
import json
from fastapi import FastAPI, File, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

templates = Jinja2Templates(directory="templates")

# 使用 @app.middleware 装饰器定义中间件
@app.middleware("http")
async def add_process_time_header(request, call_next):
    # 记录请求的开始时间
    start_time = time.time()

    # 处理请求并获取响应
    response = await call_next(request)

    # 计算处理时间并将其添加到响应头
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)

    # 可选：打印请求和响应的时间
    print(f"Request Time: {start_time}, Response Time: {time.time()}")
    print(f'Process Time: {process_time}')
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request, 
        "name": "pp",
        "items": ["item1", "item2", "item3"],
        })


class User(BaseModel):
    user_id: int
    username: str


@app.get("/user", response_model=User,
         summary="获取用户信息的摘要",
         description="获取用户信息的详情",
         tags=["user"],
         response_description="用户信息返回详情")
async def root():
    return {'user_id': 1001, 'username': 'test'}


@app.post('/', tags=['user'])
async def create_user(user: User):
    print(user)
    print(type(user))
    print(dict(user))
    print(user.model_dump())
    print(user.model_dump_json())
    return user


@app.post('/file')
async def create_file(file: bytes = File()):
    return {'file_size': len(file)}


@app.get("/request")
async def get_request(request: Request):
    return {
        **request.headers,
        **request.query_params,
        **request.cookies,
        'url': request.url,
        'client': request.client,
    }


@app.get('/{id}',  tags=['user'])
async def get_user(id: int, name: str = None):
    return {'user_id': id, 'username': name}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run('1:app', reload=True)
