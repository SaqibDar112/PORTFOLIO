from datetime import datetime

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from ..database import get_db
from ..dependencies import get_current_user
from ..schemas import (
    ChangePassword,
    LoginRequest,
    RefreshRequest,
    TokenPair,
    UserCreate,
    UserRead,
    UserUpdate,
    public_user,
)
from ..security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)

router = APIRouter()


@router.post("/register", response_model=TokenPair, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    email = payload.email.lower()
    exists = await db.users.find_one({"email": email})
    if exists:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = {
        "name": payload.name.strip(),
        "email": email,
        "hashed_password": hash_password(payload.password),
        "title": None,
        "bio": None,
        "location": None,
        "is_active": True,
        "is_superuser": False,
        "created_at": datetime.utcnow(),
    }
    result = await db.users.insert_one(user)
    user["_id"] = result.inserted_id
    return await _tokens_for(db, user)


@router.post("/login", response_model=TokenPair)
async def login(payload: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await db.users.find_one({"email": payload.email.lower()})
    if user is None or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account is deactivated")

    await db.users.update_one(
        {"_id": user["_id"]}, {"$set": {"last_login": datetime.utcnow()}}
    )
    return await _tokens_for(db, user)


@router.post("/refresh", response_model=TokenPair)
async def refresh(payload: RefreshRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        data = decode_token(payload.refresh_token, "refresh")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    from bson import ObjectId

    try:
        user = await db.users.find_one({"_id": ObjectId(data["sub"])})
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    if user is None or not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="User not found or inactive")
    return await _tokens_for(db, user)


@router.get("/me", response_model=UserRead)
async def me(user: dict = Depends(get_current_user)):
    return public_user(user)


@router.put("/me", response_model=UserRead)
async def update_me(
    payload: UserUpdate,
    user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    updates: dict = {}
    if payload.name is not None:
        updates["name"] = payload.name.strip()
    if payload.title is not None:
        updates["title"] = payload.title.strip() or None
    if payload.bio is not None:
        updates["bio"] = payload.bio.strip() or None
    if payload.location is not None:
        updates["location"] = payload.location.strip() or None
    if updates:
        await db.users.update_one({"_id": user["_id"]}, {"$set": updates})
        user.update(updates)
    return public_user(user)


@router.post("/change-password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    payload: ChangePassword,
    user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    if not verify_password(payload.old_password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"hashed_password": hash_password(payload.new_password)}},
    )


async def _tokens_for(db: AsyncIOMotorDatabase, user: dict) -> TokenPair:
    return TokenPair(
        access_token=create_access_token(str(user["_id"])),
        refresh_token=create_refresh_token(str(user["_id"])),
        user=public_user(user),
    )