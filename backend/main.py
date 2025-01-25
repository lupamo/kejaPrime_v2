from fastapi import FastAPI
from database.connection import Base, engine
from users.views import user_router
from properties.views import property_router
from bookmarks.views import bookmark_router
from comments.views import comment_router

app = FastAPI()

try:
    Base.metadata.create_all(engine)
    print("created all the tables")
except Exception as e:
    print('could not create the tables', str(e))

app.include_router(user_router)
app.include_router(property_router)
app.include_router(bookmark_router)
app.include_router(comment_router)

@app.get('/')
def home():
    return {'message': 'this is home'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)