from tortoise import fields
from tortoise.models import Model


class Test(Model):
    id = fields.IntField(pk=True)
    content = fields.TextField()
