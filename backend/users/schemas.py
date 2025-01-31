from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserPostBase(BaseModel):
    username: str
    email: str
    password: str
    contact: str
    profile_pic: Optional[str] = None

class UserLoginBase(BaseModel):
    email: str
    password: str

class UserPutBase(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    contact: Optional[str] = None
    profile_pic: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    contact: str
    profile_pic: Optional[str] = None
    created_at: datetime
    updated_at: datetime