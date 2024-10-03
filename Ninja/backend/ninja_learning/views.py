from django.http import HttpResponse


def home(request):
    user_attrs = dir(request.user)
    print(user_attrs)
    if request.user.is_authenticated:
        return HttpResponse(f"Hello, {request.user}!")
    else:
        return HttpResponse("Hello, guest!")
