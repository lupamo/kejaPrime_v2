from database.models import BaseModel
from sqlalchemy import Column, String, Integer

class User(BaseModel):
  username = Column(String(256))
  email = Column(String(256), nullable=False, unique=True)
  hashed_passd = Column(String(256), nullable=False, unique=True)
  contact = Column(String(256))
  profile_pic = Column(String(256))
  

user = User()
print(user)