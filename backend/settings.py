from dotenv import load_dotenv
from os import getenv

# load environment variables from dotenv file
load_dotenv()

MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASS = getenv("MYSQL_PASS")
MYSQL_DB = getenv("MYSQL_DB")

# token configuration
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")
EXPIRY = int(getenv("EXPIRY"))

# supabase configuration
SUPABASE_URL = getenv("SUPABASE_URL")
SUPABASE_KEY = getenv("SUPABASE_KEY")

# file upload types
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"]