from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from users import models
from utils.auth import security
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials


admin_router = APIRouter(prefix='/admin', tags=['admin'])

@admin_router.get('/users')
def get_users(db: Session = Depends(get_db)):
    """
    Get all the users in the database
    """
    users = db.query(models.User).all()
    return users

@admin_router.delete('/delete/{user_id}')
def delete_user(user_id: str, db: Session = Depends(get_db)):
    """
    Delete a user from the database
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found'
        )
    db.delete(user)
    db.commit()
    return user

@admin_router.get('/comments')
def get_comments(db: Session = Depends(get_db)):
    """
    Get all the comments in the database
    """
    comments = db.query(models.Comment).all()
    return comments