from ninja import NinjaAPI, Schema
from employee.api import router as employee_router

api = NinjaAPI()

api.add_router("/employee", employee_router)


@api.get("/hello/{name}")  # GET /hello/{name}
def hello_name(request, name: str):
    return {"message": f"Hello {name}"}


@api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}


class HelloSchema(Schema):
    name: str = "world from schema"


@api.get("/hello")  # GET /hello
def get_hello(request):
    return {'message': 'Hello World from GET'}

@api.post("/hello")
def post_hello(request, data: HelloSchema):
    return f"Hello {data.name} from POST"


class UserSchema(Schema):
    username: str
    email: str
    first_name: str
    last_name: str

class Error(Schema):
    message: str

@api.get("/me", response={200: UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Please sign in first"}
    return request.user 