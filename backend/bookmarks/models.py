from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from database.models import BaseModel

class Bookmark(BaseModel):
    """ Bookmark model
    """
    __tablename__ = 'bookmarks'

    user_id = Column(String(256), ForeignKey('users.id'))
    property_id = Column(String(256), ForeignKey('properties.id'))

    user = relationship('User', back_populates='bookmarks')
    property = relationship('Property', back_populates='bookmarks')