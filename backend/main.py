from fastapi import FastAPI
from database.connection import Base, engine
from users.views import user_router
from properties.views import property_router
from bookmarks.views import bookmark_router
from comments.views import comment_router
from admin.views import admin_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os
from utils.http_errors import HTTPErros

app = FastAPI()


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

@app.get("/documentation", response_class=HTMLResponse)
async def get_html_docs():
    file_path = "documentation/index.html"
    if not os.path.exists(file_path):
        raise HTTPErros.not_found_error("Documentation not found")
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

# Run server only when executed directly (not when imported)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)

