from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import settings
from sqlalchemy.ext.declarative import declarative_base

try:
  # create a database connection 
  engine = create_engine(
    f"mysql+mysqldb://{settings.MYSQL_USER}:{settings.MYSQL_PASS}@localhost/{settings.MYSQL_DB}"
    )
  print("Connection created succesfully")
except:
  print("connection has not been established")
  exit()

# create a session with the database
session = sessionmaker(bind=engine)

Base = declarative_base()

def get_db():
  # a dependency function for creatiing and closing db sessions
  db = session()
  try:
    yield db
  finally:
    db.close()


