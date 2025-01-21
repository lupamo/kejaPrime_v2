from dotenv import load_dotenv
from os import getenv

# load environment variables from dotenv file
load_dotenv()

MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASS = getenv("'MYSQL_PASS")
MYSQL_DB = getenv("MYSQL_DB")