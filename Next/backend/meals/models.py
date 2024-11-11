from tortoise import fields
from tortoise.models import Model


class Meal(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    slug = fields.CharField(max_length=255, null=True)
    description = fields.TextField()
    image = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
