from sqlalchemy import Column, String, Integer, DateTime, func
from .connection import Base
from uuid import uuid4

class BaseModel(Base):
  """ Base class of the database that other classes
  will inherit
  """
  __abstract__ = True

  id = Column(String(256), primary_key=True, nullable=False, unique=True, default=lambda: str(uuid4()))
  created_at = Column(DateTime, default=func.now())
  updated_at = Column(DateTime, default=func.now(), onupdate=func.now())