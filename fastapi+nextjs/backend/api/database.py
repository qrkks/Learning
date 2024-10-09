TORTOISE_ORM = {
    "connections": {
        "default": "sqlite://db.sqlite3",  # 数据库 URL
    },
    "apps": {
        "models": {
            "models": ["api.models", "aerich.models"],  # 模型路径
            "default_connection": "default",
        }
    }
}

