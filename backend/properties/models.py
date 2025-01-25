from database.models import BaseModel
from sqlalchemy import Column, String, Integer, ForeignKey


class Property(BaseModel):
    __tablename__ = 'properties'

    name = Column(String(256))
    location = Column(String(256))
    price = Column(Integer)
    description = Column(String(256))
    image = Column(String(256))
    agent = Column(ForeignKey('users.id'), nullable=False)
    type = Column(String(256))
    bedrooms = Column(Integer)

class PropertyImage(BaseModel):
    __tablename__ = 'property_images'

    property_id = Column(ForeignKey('properties.id'), nullable=False)
    image_url = Column(String(256))