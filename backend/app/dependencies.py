from bson import ObjectId
from fastapi import Depends, Header, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from .database import get_db
from .security import decode_token


async def get_current_user(
    authorization: str = Header(default=""),
    db: AsyncIOMotorDatabase = Depends(get_db),
) -> dict:
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = authorization[7:].strip()
    try:
        payload = decode_token(token, "access")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    try:
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    if user is None or not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="User not found or inactive")
    return user


async def require_superuser(user: dict = Depends(get_current_user)) -> dict:
    if not user.get("is_superuser"):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user