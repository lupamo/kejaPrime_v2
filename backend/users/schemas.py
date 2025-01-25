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