from fastapi import FastAPI
from database.connection import Base, engine

app = FastAPI()

Base.metadata.create_all(engine)