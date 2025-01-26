from database.models import BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

class User(BaseModel):
  __tablename__ = 'users'
  
  username = Column(String(256))
  email = Column(String(256), nullable=False, unique=True)
  hashed_passd = Column(String(256), nullable=False, unique=True)
  contact = Column(String(256))
  profile_pic = Column(String(256))

  # relationships
  bookmarks = relationship('Bookmark', back_populates='user')
  comments = relationship('Comment', back_populates='user')

  

