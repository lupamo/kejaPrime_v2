from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import settings
from sqlalchemy.ext.declarative import declarative_base

# Create an async database connection
try:
    engine = create_async_engine(
        f'postgresql://{settings.DATABASE_USER}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOST}/{settings.DATABASE_NAME}', echo=True)  # Use async engine
    print("Connection created successfully")
except Exception as e:
    print("Connection has not been established:", str(e))
    exit()

# Create an async session
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_db():
    """ Dependency function for creating and closing async db sessions """
    async with SessionLocal() as db:
        yield db
