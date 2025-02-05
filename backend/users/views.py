from fastapi import Depends, APIRouter, File, UploadFile, status
from sqlalchemy.orm import Session
from database.connection import get_db
from users import models, schemas
from utils.auth import AuthHandler
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from utils.auth import security
from utils.supabase import supabase
from utils.http_errors import HTTPErros
from notifications.email import send_mail, send_password_reset_mail
import settings

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
    
    if existing_user.is_verified == False or existing_user.is_verified is None:
        raise HTTPErros.unauthorized("kindly verify account to login")
    
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

@user_router.get('/auth/verify/{token}')
def verify_email(token: str, db: Session = Depends(get_db)):
    """
    reset user password
    """
    token_data = AuthHandler.decode_url_safe_token(token)
    email = token_data.get("email")
    if not email:
        raise HTTPErros.bad_request("invalid verification token")
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
            raise HTTPErros.not_found("user not found")
    
    if user.is_verified:
        return {"message": "account already verified"}
    user.is_verified = True
    db.commit()
    db.refresh(user)
    return {"message": "account verified succesfully"}
        

@user_router.get('/auth/password-reset')
async def password_reset_request(email: str, db: Session = Depends(get_db)):
    """ send request to reset password to email
    """
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if not existing_user:
        raise HTTPErros.not_found("user not found")
    token = AuthHandler.create_url_safe_token({'email': email})
    token_url = f'http://{settings.DOMAIN}/users/auth/password-reset-confirm/{token}'
    await send_password_reset_mail([email], token_url) # send password reset email to the user
    return {"message": "check email for instructions to change password"}


@user_router.post('/auth/password-reset-confirm/{token}')
def reset_password(token: str, password: str, db: Session = Depends(get_db)):
    """
    reset password
    """
    token_data = AuthHandler.decode_url_safe_token(token)
    email = token_data.get("email")
    if not email:
        raise HTTPErros.bad_request("invalid password reset token")
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPErros.not_found("user not found")
    
    passwd_hash = AuthHandler.get_passd_hash(password)
    user.hashed_passd = passwd_hash
    db.commit()
    db.refresh(user)
    return {"message": "password changed succesfully"}

    
@user_router.get('/', response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    """
    Gets all the users form database
    """
    users = db.query(models.User).all()
    return users

@user_router.get('/{user_id}', response_model=schemas.UserResponse)
def get_user(user_id: str, db: Session = Depends(get_db)):
    """
    Get a single user from the database
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPErros.not_found_error('User not found')
    return user

@user_router.post('/register', status_code=status.HTTP_201_CREATED)
async def register_user(
    user: schemas.UserPostBase, db: Session = Depends(get_db)
    ):
    """
    Register a new user in the database
    """
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user is not None:
        raise HTTPErros.bad_request("user already exists")
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
    token = AuthHandler.create_url_safe_token({'email': new_user.email})
    token_url = f'http://{settings.DOMAIN}/users/auth/verify/{token}'
    await send_mail([new_user.email], token_url) # send welcome email to the user
    return {"message": "Account created successfully! check email to verify"}

@user_router.put('/{user_id}', response_model=schemas.UserResponse)
def update_user(
    user_id: str, user: schemas.UserPutBase, db: Session = Depends(get_db)
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
def delete_user(user_id: str, db: Session = Depends(get_db)):
    """
    Delete a user from the database
    """
    user_to_delete = db.query(models.User).filter(models.User.id == user_id).first()
    if not user_to_delete:
        raise HTTPErros.not_found("user not found")
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