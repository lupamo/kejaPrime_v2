from passlib.context import CryptContext
from fastapi.security import HTTPBearer
from fastapi import HTTPException, Depends, status
import jwt
from jwt import PyJWTError
import settings
from datetime import datetime, timedelta
from itsdangerous.url_safe import URLSafeSerializer

security = HTTPBearer()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

serializer = URLSafeSerializer(settings.SECRET_KEY, salt='email-verification')

class AuthHandler:
    def verify_password(plain_passd, hashed_passd):
        """
        verify the password entered by the user
        """
        return pwd_context.verify(plain_passd, hashed_passd)
    
    def get_passd_hash(passd):
        """
        hash the password entered by the user
        """
        return pwd_context.hash(passd)
    

    def generate_token(data: dict):
        """
        generate token for user when thry login
        """
        try:
            expiry = datetime.utcnow() + timedelta(seconds=settings.EXPIRY)
            data.update({"exp": expiry})

            jwt_token = jwt.encode(data, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
            return jwt_token
        
        except PyJWTError as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        
    def decode_token(token: str):
        """
        decode the token and return the payload
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            return payload
        
        except PyJWTError as e:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token has expired")

    def create_url_safe_token(data: dict):
        """ generate a safe token for third party apps
        """
        token = serializer.dumps(data)
        return token

    def decode_url_safe_token(token: str) -> dict:
        try:
            token_data = serializer.loads(token)
            return token_data
        except Exception as e:
            return f'error {str(e)}'
            
        