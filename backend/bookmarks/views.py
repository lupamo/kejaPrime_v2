from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from . import models
from utils.auth import security
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from properties.models import Property
from utils.http_errors import HTTPErros

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
        raise HTTPErros.not_found_error('Property not found')
    user = decode_credentials(credentials, db)
    existing_bookmark = db.query(models.Bookmark).filter(
        models.Bookmark.user_id == user.id,
        models.Bookmark.property_id == property_id
        ).first()
    if existing_bookmark:
        raise HTTPErros.bad_request_error('Bookmark already exists')
    new_bookmark = models.Bookmark(
        user_id=user.id,
        property_id=property_id
    )
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark

@bookmark_router.delete('/delete/{bookmark_id}')
def delete_bookmark(
    bookmark_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Delete a bookmark from the database
    """
    user = decode_credentials(credentials, db)
    bookmark = db.query(models.Bookmark).filter(models.Bookmark.id == bookmark_id).first()
    if not bookmark:
        raise HTTPErros.not_found_error('Bookmark not found')
    if bookmark.user_id != user.id:
        raise HTTPErros.unauthorized_error('You are not authorized to delete this bookmark')
    db.delete(bookmark)
    db.commit()
    return {'message': 'Bookmark deleted successfully'}
