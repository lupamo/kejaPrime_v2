from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from . import models, schemas
from users.models import User
from utils.auth import security, AuthHandler
from fastapi.security import HTTPBasicCredentials
from utils.supabase import supabase
from fastapi import File, UploadFile
from utils.credentials import decode_credentials
import settings


property_router = APIRouter(prefix='/properties', tags=['properties'])

@property_router.get('/')
def get_properties(db: Session = Depends(get_db)):
    """
    Get all the properties from the database
    """
    properties = db.query(models.Property).all()
    return properties

@property_router.get('/{property_id}')
def get_property(property_id: int, db: Session = Depends(get_db)):
    """
    Get a single property from the database
    """
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    return property

@property_router.post('/add')
def add_property(
    property: schemas.PropertyPostBase,
    credentials: HTTPBasicCredentials = Depends(security),
    db: Session = Depends(get_db)
    ):
    """add a property to the database
    """
    user = decode_credentials(credentials, db)
    
    new_property = models.Property(
        name=property.name,
        location=property.location,
        price=property.price,
        description=property.description,
        agent=user.id,
        bedrooms=property.bedrooms
    )
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property


@property_router.post('/upload')
async def upload_image(
    property_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    ):
    """
    Upload a property image to the database
    """
    print('content-type', file.content_type)
    print('filename', file.filename)
    try:
        if file.content_type not in settings.ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.content_type}. Allowed types are {settings.ALLOWED_MIME_TYPES}"
            )
        # try reading the file content
        file_content = await file.read()
        response = supabase.storage.from_('property_images').upload(
            path=f'{file.filename}',
            file=file_content,
            file_options={
                "cache-control": "3600",
                "upsert": False,
                "content-type": file.content_type
            },
        )
        print(response)
        
        file_url = supabase.storage.from_('property_images').get_public_url(f'{file.filename}')
        print(file_url)
        property_image = models.PropertyImage(
            property_id=property_id,
            image_url=file_url
        )
        db.add(property_image)
        db.commit()
        db.refresh(property_image)

        return {'message': 'Image uploaded successfully', 'data': response}
    except Exception as e:
        return {'message': 'An error occured', 'error': str(e)}
        