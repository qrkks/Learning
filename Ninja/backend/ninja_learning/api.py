from datetime import datetime
from ninja import Schema

from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI

from .custom_jwt_auth import CookieJWTAuth

api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router("/waitlists", "waitlists.api.router")

@api.get("/hello")
def hello_world(request):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 获取当前时间并格式化
    print(request)
    return {
        'message': 'Hello World from Django Ninja\'s GET',
        'time': current_time
    }


class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str = None
    first_name: str = None
    last_name: str = None
    is_staff: bool = None
    password: str = None
    is_active: bool = None
    last_login: datetime = None


@api.get('/me', response=UserSchema, auth=CookieJWTAuth())
def me(request):
    return request.user

@api.get("/check-headers/")
def check_headers(request):
    # 获取所有请求头
    headers = dict(request.headers)  # 将请求头转换为字典
    print(request.COOKIES.get('auth-token'))
    
    # 返回 JSON 响应
    return headers