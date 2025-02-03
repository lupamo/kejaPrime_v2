from fastapi import Depends, APIRouter, File, UploadFile
from sqlalchemy.orm import Session
from database.connection import get_db
from users import models, schemas
from utils.auth import AuthHandler
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from utils.auth import security
from utils.supabase import supabase
from utils.http_errors import HTTPErros

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
        raise HTTPErros.not_found_error('User not found')
    if not AuthHandler.verify_password(user.password, existing_user.hashed_passd):
        raise HTTPErros.unauthorized("wrong password")
    
    token = AuthHandler.generate_token({'sub': existing_user.email})
    return {'access_token': token, 'token_type': 'bearer'}

@user_router.get('/me', response_model=schemas.UserResponse)
def get_me(
    credentials: HTTPBasicCredentials = Depends(security),
    db: Session = Depends(get_db)
    ):
    """
    Get the user details
    """
    user = decode_credentials(credentials, db)
    return user


@user_router.get('/', response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    """
    Gets all the users form database
    """
    users = db.query(models.User).all()
    return users

@user_router.get('/{user_id}', response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get a single user from the database
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPErros.not_found_error('User not found')
    return user

@user_router.post('/register')
async def register_user(
    user: schemas.UserPostBase, db: Session = Depends(get_db)
    ):
    """
    Register a new user in the database
    """
    user_hashed_passd = AuthHandler.get_passd_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_passd=user_hashed_passd,
        contact=user.contact
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "data": {"email": new_user.email, "username": new_user.username}}

@user_router.put('/{user_id}', response_model=schemas.UserResponse)
def update_user(
    user_id: int, user: schemas.UserPutBase, db: Session = Depends(get_db)
    ):
    """
    Update a user in the database
    """
    user_to_update = db.query(models.User).filter(models.User.id == user_id).first()
    user_to_update.username = user.username
    user_to_update.email = user.email
    user_to_update.contact = user.contact
    db.commit()
    db.refresh(user_to_update)
    return user_to_update

@user_router.delete('/{user_id}')
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user from the database
    """
    user_to_delete = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(user_to_delete)
    db.commit()
    return {'message': 'User deleted successfully'}


@user_router.post('/avatar')
async def upload_profile_pic(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Upload a profile picture
    """
    try:
        user = decode_credentials(credentials, db)
        file_content = await file.read()

        # upload the file to supabase
        response = supabase.storage.from_('profile_pictures').upload(
            path=f'{file.filename}',
            file=file_content,
            file_options={
                "cache-control": "3600",
                "upsert": False,
                "content-type": file.content_type
            },
        )
        file_url = supabase.storage.from_('profile_pictures').get_public_url(file.filename)
        user.profile_pic = file_url
        db.commit()
        db.refresh(user)
        return {'message': 'Profile picture uploaded successfully', 'data': response}
    except Exception as e:
        return {'message': 'An error occurred', 'error': str(e)}