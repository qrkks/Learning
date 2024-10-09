TORTOISE_ORM = {
    "connections": {
        "default": "sqlite://db.sqlite3",  # SQLite数据库连接字符串
    },
    "apps": {
        "models": {
            "models": ["models", "aerich.models"],
            "default_connection": "default",
        },
    },
}
