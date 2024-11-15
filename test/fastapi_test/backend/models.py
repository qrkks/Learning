from tortoise.models import Model
from tortoise import fields


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, description='姓名')
    password = fields.CharField(max_length=50, description='密码')
    hashed_password = fields.CharField(max_length=256)  # 哈希密码
    created_at = fields.DatetimeField(auto_now_add=True)  # 创建时间
    updated_at = fields.DatetimeField(auto_now=True)  # 更新时间
