from fastapi import FastAPI
from database.connection import Base, engine
from users.views import user_router
from properties.views import property_router
from bookmarks.views import bookmark_router
from comments.views import comment_router
from admin.views import admin_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Create tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("An error occurred while creating tables:", str(e))


# CORS Middleware Configuration (Allow frontend to access API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(property_router)
app.include_router(bookmark_router)
app.include_router(comment_router)

@app.get("/")
async def home():
    return {"message": "This is home"}

# Run server only when executed directly (not when imported)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)

