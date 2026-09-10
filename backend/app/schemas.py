from datetime import datetime
from typing import Any, Literal

from bson import ObjectId
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    title: str | None = Field(default=None, max_length=120)
    bio: str | None = Field(default=None, max_length=2000)
    location: str | None = Field(default=None, max_length=120)


class ChangePassword(BaseModel):
    old_password: str
    new_password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    title: str | None
    bio: str | None
    location: str | None
    is_superuser: bool
    created_at: datetime


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: Literal["bearer"] = "bearer"
    user: UserRead


class RefreshRequest(BaseModel):
    refresh_token: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=200)
    body: str = Field(min_length=2, max_length=5000)


class ContactRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    subject: str
    body: str
    created_at: datetime


def user_doc_to_read(doc: dict[str, Any]) -> UserRead:
    return UserRead(
        id=str(doc["_id"]),
        name=doc["name"],
        email=doc["email"],
        title=doc.get("title"),
        bio=doc.get("bio"),
        location=doc.get("location"),
        is_superuser=doc.get("is_superuser", False),
        created_at=doc.get("created_at"),
    )


def contact_doc_to_read(doc: dict[str, Any]) -> ContactRead:
    return ContactRead(
        id=str(doc["_id"]),
        name=doc["name"],
        email=doc["email"],
        subject=doc["subject"],
        body=doc["body"],
        created_at=doc.get("created_at"),
    )


def public_user(doc: dict[str, Any]) -> dict[str, Any]:
    user = user_doc_to_read(doc)
    return user.model_dump(mode="json")


def object_id(value: str) -> ObjectId:
    return ObjectId(value)