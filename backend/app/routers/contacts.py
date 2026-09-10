from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from ..database import get_db
from ..dependencies import get_current_user, require_superuser
from ..schemas import ContactCreate, ContactRead, contact_doc_to_read

router = APIRouter()


@router.post(
    "/messages", response_model=ContactRead, status_code=status.HTTP_201_CREATED
)
async def create_message(
    payload: ContactCreate,
    user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    doc: dict[str, Any] = {
        "user_id": str(user["_id"]),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "subject": payload.subject.strip(),
        "body": payload.body.strip(),
        "created_at": datetime.utcnow(),
    }
    result = await db.contact_messages.insert_one(doc)
    doc["_id"] = result.inserted_id
    return contact_doc_to_read(doc)


@router.get("/messages", response_model=list[ContactRead])
async def list_messages(
    admin: dict = Depends(require_superuser),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    cursor = db.contact_messages.find().sort("created_at", -1).limit(100)
    return [contact_doc_to_read(doc) async for doc in cursor]