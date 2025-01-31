from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import settings
from sqlalchemy.ext.declarative import declarative_base

# Create an async database connection
try:
    engine = create_engine(settings.DATABASE_URL, echo=True)
except Exception as e:
    print("An error occurred while connecting to the database:", str(e))

# Create an async session
session = sessionmaker(bind=engine)

Base = declarative_base()

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

