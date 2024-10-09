TORTOISE_ORM = {
    "connections": {
        "default": {
            "engine": "tortoise.backends.sqlite",
            "credentials": {"file_path": "db.sqlite3"},
        }
    },
    "apps": {
        "models": {
            "models": [
                "models",
                "meals.models",
                "aerich.models"
            ],
            "default_connection": "default",
        },
    },
}
