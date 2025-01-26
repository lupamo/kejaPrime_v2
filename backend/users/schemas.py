from pydantic import BaseModel
from typing import Optional

class UserPostBase(BaseModel):
    username: str
    email: str
    hashed_passd: str
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