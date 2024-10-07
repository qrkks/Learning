from django.contrib import admin

# Register your models here.
from .models import WaitlistEntry


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'email', 'timestamp', )
