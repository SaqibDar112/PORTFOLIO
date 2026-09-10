"""Promote a user to superuser (admin) so they can view contact messages.

Usage:
    python promote_admin.py your@email.com
"""
import sys

from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings


async def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python promote_admin.py your@email.com")
        sys.exit(1)

    email = sys.argv[1].strip().lower()
    client = AsyncIOMotorClient(settings.database_url)
    db = client[settings.mongo_db]

    result = await db.users.update_one(
        {"email": email}, {"$set": {"is_superuser": True}}
    )

    if result.matched_count == 0:
        print(f"No user found with email {email}. Register first, then rerun.")
        sys.exit(1)

    print(f"User {email} is now an admin. Log in and open Dashboard to see messages.")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())