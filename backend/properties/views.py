from fastapi import Depends, APIRouter, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database.connection import get_db, session
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
def get_property(property_id: str, db: Session = Depends(get_db)):
    """
    Get a single property from the database
    """
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not property:
        raise HTTPErros.not_found_error('Property not found')
    property.image_urls = [img.image_url for img in db.query(models.PropertyImage)
                               .filter(models.PropertyImage.property_id == property.id).all()]
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
def upload_images(
    bg_tasks: BackgroundTasks,
    property_id: str,
    files: List[UploadFile] = File(...),
):
    """Schedules image uploads in the background"""
    files_data = []

    for file in files:
        file_content = file.file.read()  # Read file content
        files_data.append({
            "filename": file.filename,
            "content": file_content,
            "content_type": file.content_type
        })

    bg_tasks.add_task(process_images_upload, property_id, files_data)

    return {"message": "Image upload scheduled in the background."}


def process_images_upload(property_id: str, files_data: List[dict]):
    """Uploads multiple property images asynchronously"""
    db = session()  # Create a new session manually

    try:
        uploaded_image_urls = []

        for file_data in files_data:
            file_name = file_data["filename"]
            file_content = file_data["content"]
            content_type = file_data["content_type"]

            # Check allowed file types
            if content_type not in settings.ALLOWED_MIME_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type: {content_type}. Allowed: {settings.ALLOWED_MIME_TYPES}"
                )

            # Upload file to Supabase
            response = supabase.storage.from_("property_images").upload(
                path=file_name,
                file=file_content,
                file_options={"content-type": content_type}
            )

            # Get the public URL for the uploaded image
            file_url = supabase.storage.from_("property_images").get_public_url(file_name)
            uploaded_image_urls.append(file_url)

            # Save to database
            property_image = models.PropertyImage(property_id=property_id, image_url=file_url)
            db.add(property_image)

        db.commit()
    except Exception as e:
        print(f"Error uploading images: {e}")
    finally:
        db.close()

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
        