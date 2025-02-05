from dotenv import load_dotenv
from os import getenv

# load environment variables from dotenv file
load_dotenv()

# MYSQL_USER = getenv("MYSQL_USER")
# MYSQL_PASS = getenv("MYSQL_PASS")
# MYSQL_DB = getenv("MYSQL_DB")

# supabase database configuration
DATABASE_URL = getenv("DATABASE_URL")

DATABASE_USER = getenv("DATABASE_USER")
DATABASE_PASSWORD = getenv("DATABASE_PASSWORD")
DATABASE_HOST = getenv("DATABASE_HOST")
DATABASE_PORT = getenv("DATABASE_PORT")
DATABASE_NAME = getenv("DATABASE_NAME")

# resend api key
RESEND_API_KEY = getenv("RESEND_API_KEY")

# DOMAIN
DOMAIN = getenv("DOMAIN")
#fastapi mail config
MAIL_USERNAME = getenv("MAIL_USERNAME")
MAIL_PASSWORD = getenv("MAIL_PASSWORD")
MAIL_SERVER = getenv("MAIL_SERVER")
MAIL_PORT = getenv("MAIL_PORT")
MAIL_FROM = getenv("MAIL_FROM")
MAIL_FROM_NAME = getenv("MAIL_FROM_NAME")
MAIL_STARTTLS = True
MAIL_SSL_TLS = False
USE_CREDENTIALS = True
VALIDATE_CERTS = True

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
        conn = await asyncpg.connect(DATABASE_URL)
        print("Connected successfully!")
        await conn.close()
    except Exception as e:
        print("An error occurred:", str(e))

asyncio.run(test_connection())
