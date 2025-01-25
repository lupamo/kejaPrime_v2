from pydantic import BaseModel
from typing import Optional

class PropertyPostBase(BaseModel):
    name: str
    location: str
    price: int
    description: str
    bedrooms: int