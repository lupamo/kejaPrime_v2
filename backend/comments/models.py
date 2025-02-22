from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.models import BaseModel

class Comment(BaseModel):
    """ Comment model
    """
    __tablename__ = 'comments'

    user_id = Column(String(256), ForeignKey('users.id'))
    content = Column(String, nullable=False) # Comment changes----------------------------
    property_id = Column(String(256), ForeignKey('properties.id'))
    username = Column(String(256), nullable=True)

    # relationships
    user = relationship('User', back_populates='comments')
    property = relationship('Property', back_populates='comments')
    replies = relationship('Reply', back_populates='comment', cascade='all, delete')


class Reply(BaseModel):
    __tablename__ = 'replies'

    comment_id = Column(String(256), ForeignKey('comments.id'))
    user_id = Column(String(256), ForeignKey('users.id'), nullable=False)
    content = Column(Text, nullable=False)
    username = Column(String(256), nullable=True)

    # relationships
    user = relationship('User', back_populates='replies')
    comment = relationship('Comment', back_populates='replies')