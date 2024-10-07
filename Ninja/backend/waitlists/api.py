from ninja import Router
from .models import WaitlistEntry
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailSchema, WaitlistEntryCreateSchema
from django.shortcuts import get_object_or_404
from ninja_learning.custom_jwt_auth import CookieJWTAuth
from ninja_jwt.authentication import JWTAuth
router = Router()


@router.get("/", response=list[WaitlistEntryDetailSchema], auth=JWTAuth())
def get_waitlist(request):
    print(request.META['REMOTE_ADDR'])
    print(request.META.get('HTTP_USER_AGENT'))
    print(request.META.get('HTTP_HOST'))
    print(request.META.get('HTTP_X_FORWARDED_FOR'))
    return WaitlistEntry.objects.filter(user=request.user)


@router.post("/", response=WaitlistEntryDetailSchema, auth=JWTAuth())
def create_waitlist_entry(request, payload: WaitlistEntryCreateSchema):
    print(request.user)
    return WaitlistEntry.objects.create(user=request.user, **payload.dict())
    # print(request.headers)
    # print(request.body)
    # print(payload)
    # print(payload.dict())
    # return payload


@router.get("/{entry_id}", response=WaitlistEntryDetailSchema, auth=CookieJWTAuth())
def get_waitlist_entry(request, entry_id: int):
    return get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)
