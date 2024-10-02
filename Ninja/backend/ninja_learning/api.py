from datetime import datetime
from ninja import NinjaAPI, Schema
from pydantic import BaseModel

api = NinjaAPI()
# 定义一个Pydantic模型用于返回值的类型注解


class HelloWorldResponse(BaseModel):
    message: str
    time: str  # 当前时间的格式是字符串


@api.get("/hello", response=HelloWorldResponse)
def hello_world(request):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 获取当前时间并格式化
    return {
        'message': 'Hello World from Django Ninja\'s GET',
        'time': current_time
    }
