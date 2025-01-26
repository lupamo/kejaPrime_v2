from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.models import BaseModel

class Comment(BaseModel):
    """ Comment model
    """
    __tablename__ = 'comments'

    user_id = Column(String(256), ForeignKey('users.id'))
    property_id = Column(String(256), ForeignKey('properties.id'))

    # relationships
    user = relationship('User', back_populates='comments')
    property = relationship('Property', back_populates='comments')