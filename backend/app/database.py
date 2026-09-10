from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import settings

_client: AsyncIOMotorClient | None = None


def get_database() -> AsyncIOMotorDatabase:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.database_url)
    return _client[settings.mongo_db]


async def get_db() -> AsyncIOMotorDatabase:
    return get_database()


async def init_db() -> None:
    db = get_database()
    await db.users.create_index("email", unique=True)
    await db.contact_messages.create_index("created_at")