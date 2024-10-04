from ninja import Router
from .models import WaitlistEntry
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailSchema, WaitlistEntryCreateSchema
from django.shortcuts import get_object_or_404
from ninja_learning.custom_jwt_auth import CookieJWTAuth
router = Router()


@router.get("/", response=list[WaitlistEntryListSchema], auth=CookieJWTAuth())
def get_waitlist(request):
    return WaitlistEntry.objects.all()


@router.get("/{entry_id}", response=WaitlistEntryDetailSchema, auth=CookieJWTAuth())
def get_waitlist_entry(request, entry_id: int):
    return get_object_or_404(WaitlistEntry, id=entry_id)
