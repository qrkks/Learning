from django.db import models
from django.conf import settings
# from django.contrib.auth import get_user_model
# Create your models here.

User = settings.AUTH_USER_MODEL
# User = get_user_model()

class WaitlistEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='waitlist_entries', null=True, blank=True, default=None)
    email = models.EmailField()
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)
