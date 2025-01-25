from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from database.connection import get_db
from users import models, schemas
from utils.auth import AuthHandler

user_router = APIRouter(prefix='/users', tags=['users'])

@user_router.post('/login')
def login(
    user: schemas.UserLoginBase, db: Session = Depends(get_db)
    ):
    """
    login a user
    """
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not existing_user:
        return {'message': 'User not found'}
    if not AuthHandler.verify_password(user.password, existing_user.hashed_passd):
        return {'message': 'WROng password'}
    
    token = AuthHandler.generate_token({'sub': existing_user.email})
    return {'access_token': token, 'token_type': 'bearer'}


@user_router.get('/')
def get_users(db: Session = Depends(get_db)):
    """
    Gets all the users form database
    """
    users = db.query(models.User).all()
    return users

@user_router.get('/{user_id}')
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get a single user from the database
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user

@user_router.post('/register')
async def register_user(
    user: schemas.UserPostBase, db: Session = Depends(get_db)
    ):
    """
    Register a new user in the database
    """
    user_hashed_passd = AuthHandler.get_passd_hash(user.hashed_passd)
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_passd=user_hashed_passd,
        contact=user.contact
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

