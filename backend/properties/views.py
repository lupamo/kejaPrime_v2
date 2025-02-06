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
from utils.http_errors import HTTPErros
from typing import List

property_router = APIRouter(prefix='/properties', tags=['properties'])

@property_router.get('/')
def get_properties(db: Session = Depends(get_db)):
    """
    Get all the properties from the database
    """
    properties = db.query(models.Property).all()
    for property in properties:
        property.image_urls = [img.image_url for img in db.query(models.PropertyImage)
                               .filter(models.PropertyImage.property_id == property.id).all()]

    return properties

@property_router.get('/me')
def my_properties(
    credentials: HTTPBasicCredentials = Depends(security),
    db: Session = Depends(get_db)):
    """
    get properties of a certain agent
    """
    user = decode_credentials(credentials, db)

    properties = db.query(models.Property).filter(models.Property.agent == user.id).all()
    if not properties:
        raise HTTPErros.not_found("properties not found")
    for property in properties:
        property.image_urls = [img.image_url for img in db.query(models.PropertyImage)
                               .filter(models.PropertyImage.property_id == property.id).all()]

    return properties

@property_router.get('/{property_id}')
def get_property(property_id: int, db: Session = Depends(get_db)):
    """
    Get a single property from the database
    """
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not property:
        raise HTTPErros.not_found_error('Property not found')
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
async def upload_images(
    property_id: str,
    files: List[UploadFile] = File(...),  # Accept multiple files
    db: Session = Depends(get_db),
):
    """
    Upload multiple property images to the database
    """
    try:
        # List to hold URLs of the uploaded images
        uploaded_image_urls = []
        
        # Iterate through the files and upload them one by one
        for file in files:
            print('content-type', file.content_type)
            print('filename', file.filename)

            # Check if the file type is allowed
            if file.content_type not in settings.ALLOWED_MIME_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type: {file.content_type}. Allowed types are {settings.ALLOWED_MIME_TYPES}"
                )
            
            # Try reading the file content
            file_content = await file.read()
            
            # Upload file to storage
            response = supabase.storage.from_('property_images').upload(
                path=f'{file.filename}',
                file=file_content,
                file_options={
                    "cache-control": "3600",
                    "upsert": False,
                    "content-type": file.content_type
                },
            )
            
            # Get the public URL for the uploaded image
            file_url = supabase.storage.from_('property_images').get_public_url(f'{file.filename}')
            uploaded_image_urls.append(file_url)

            # Save the image info to the database
            property_image = models.PropertyImage(
                property_id=property_id,
                image_url=file_url
            )
            db.add(property_image)
            db.commit()
            db.refresh(property_image)

        return {'message': 'Images uploaded successfully', 'data': uploaded_image_urls}
    
    except Exception as e:
        return {'message': 'An error occurred', 'error': str(e)}

@property_router.post('/search')
def search(query: str, db: Session = Depends(get_db)):
    """
    Search properties based on a query string
    """
    properties = db.query(models.Property).filter(
        models.Property.name.ilike(f'%{query}%') |
        models.Property.location.ilike(f'%{query}%') |
        models.Property.description.ilike(f'%{query}%')
    ).all()
    return properties
        