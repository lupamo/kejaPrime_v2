from users import models
from .auth import AuthHandler
from database.connection import get_db
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .http_errors import HTTPErros

def decode_credentials(credentials, db: Session):
    """
    Decodes a token from credentials, retrieves the associated user, 
    and ensures the user exists in the database.

    Args:
        credentials: The token credentials from an `Authorization` header.
        db (Session): The database session for querying.

    Returns:
        models.User: The user object corresponding to the decoded token.

    Raises:
        HTTPException: For invalid tokens or if the user is not found.
    """
    try:
        # Extract token from credentials
        token = credentials.credentials
        
        # Decode the token using AuthHandler
        payload = AuthHandler.decode_token(token)
        
        # Extract email from the token payload
        email = payload.get('sub')
        if not email:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

        # Query the user by email
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise HTTPErros.not_found('User not found')
        return user

    except Exception as e:
        raise HTTPErros.unauthorized(f'Invalid token')
