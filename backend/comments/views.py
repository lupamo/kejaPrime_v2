from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from . import models
from utils.auth import security
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from properties.models import Property


comment_router = APIRouter(prefix='/comments', tags=['comments'])

@comment_router.post('/add')
def add_comment(
    property_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Add a comment to the database
    """
    user = decode_credentials(credentials, db)
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Property not found'
        )
    
    new_comment = models.Comment(
        user_id=user.id,
        property_id=property_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@comment_router.delete('/delete/{comment_id}')
def delete_comment(
    comment_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Delete a comment from the database
    """
    user = decode_credentials(credentials, db)
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Comment not found'
        )
    if comment.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='You are not authorized to delete this comment'
        )
    db.delete(comment)
    db.commit()
    return {'message': 'Comment deleted successfully'}
    