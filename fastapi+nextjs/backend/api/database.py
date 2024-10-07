from tortoise import Tortoise, run_async

# 初始化数据库连接
async def init_db():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',  # 使用SQLite作为数据库
        modules={'models': ['models']}  # 指定模型所在的模块
    )
    await Tortoise.generate_schemas()  # 自动生成数据库表

# 关闭数据库连接
async def close_db():
    await Tortoise.close_connections()
