from dotenv import load_dotenv
from os import getenv

# load environment variables from dotenv file
load_dotenv()

# MYSQL_USER = getenv("MYSQL_USER")
# MYSQL_PASS = getenv("MYSQL_PASS")
# MYSQL_DB = getenv("MYSQL_DB")

# supabase database configuration
#DATABASE_URL = getenv("DATABASE_URL")

DATABASE_USER = getenv("DATABASE_USER")
DATABASE_PASSWORD = getenv("DATABASE_PASSWORD")
DATABASE_HOST = getenv("DATABASE_HOST")
DATABASE_PORT = getenv("DATABASE_PORT")
DATABASE_NAME = getenv("DATABASE_NAME")


# print(isinstance(DATABASE_URL, str))
# token configuration
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")
EXPIRY = int(getenv("EXPIRY"))

# supabase configuration
SUPABASE_URL = getenv("SUPABASE_URL")
SUPABASE_KEY = getenv("SUPABASE_KEY")

# file upload types
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"]

import asyncpg
import asyncio

async def test_connection():
    try:
        conn = await asyncpg.connect(f'postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}')
        print("Connected successfully!")
        await conn.close()
    except Exception as e:
        print("An error occurred:", str(e))

asyncio.run(test_connection())
