from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from . import models
from utils.auth import security
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from properties.models import Property

bookmark_router = APIRouter(prefix='/bookmarks', tags=['bookmarks'])

@bookmark_router.get('/')
def get_bookmarks(
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Get all the bookmarks of the user
    """
    user = decode_credentials(credentials, db)
    bookmarks = db.query(models.Bookmark).filter(models.Bookmark.user_id == user.id).all()
    return bookmarks


@bookmark_router.post('/add')
def add_bookmark(
    property_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Add a bookmark to the database
    """
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Property not found'
        )
    user = decode_credentials(credentials, db)
    existing_bookmark = db.query(models.Bookmark).filter(
        models.Bookmark.user_id == user.id,
        models.Bookmark.property_id == property_id
        ).first()
    if existing_bookmark:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Bookmark already exists'
        )
    new_bookmark = models.Bookmark(
        user_id=user.id,
        property_id=property_id
    )
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark
