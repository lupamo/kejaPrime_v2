from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from . import models
from utils.auth import security
from utils.credentials import decode_credentials
from fastapi.security import HTTPBasicCredentials
from properties.models import Property
from utils.http_errors import HTTPErros


comment_router = APIRouter(prefix='/comments', tags=['comments'])

@comment_router.post('/add')
def add_comment(
    property_id: str,
    content: str,# Comment changes----------------------------
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    Add a comment to the database
    """
    user = decode_credentials(credentials, db)
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPErros.not_found('Property not found')
    
    new_comment = models.Comment(
        user_id=user.id,
        property_id=property_id,
        content=content# Comment changes----------------------------
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@comment_router.get('/')
def all_comments(
    property_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPErros.not_found('Property not found')
    comments = db.query(models.Comment).filter(models.Comment.property_id == property_id).all()
    return comments


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
        raise HTTPErros.not_found('Comment not found')
    if comment.user_id != user.id:
        raise HTTPErros.unauthorized('You are not authorized to delete this comment')
    db.delete(comment)
    db.commit()
    return {'message': 'Comment deleted successfully'}


@comment_router.post('/reply')
def post_reply(
    content: str,
    comment_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    post a reply to a comment made
    """
    user = decode_credentials(credentials, db)

    if not user:
        raise HTTPErros.not_found('user not found')
    
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not comment:
        raise HTTPErros('comment does not exist')
    
    reply = models.Reply(
        comment_id=comment_id,
        content=content,
        user_id=user.id
    )
    db.add(reply)
    db.commit()
    db.refresh(reply)

    return reply


@comment_router.get('/replies')
def all_replies(
    comment_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):
    """
    retrieve all replies of a comment
    """
    user = decode_credentials(credentials, db)
    if not user:
        raise HTTPErros.not_found("user not found")
    
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not comment:
        raise HTTPErros.not_found('comment does not exist')
    
    replies = db.query(models.Reply).filter(models.Reply.comment_id == comment_id).all()
    if not replies:
        raise HTTPErros.not_found("no replies found")
    
    return replies


@comment_router.delete('/reply/{reply_id}')
def delete_reply(
    reply_id: str,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(security)
    ):

    user = decode_credentials(credentials, db)
    if not user:
        raise HTTPErros.not_found("user not found")
    
    reply = db.query(models.Reply).filter(models.Reply.id == reply_id).first()
    if not reply:
        raise HTTPErros.not_found("reply not found")
    
    if user.id != reply.user_id:
        raise HTTPErros.unauthorized("you are not authorized to delete this reply")
    
    db.delete(reply)
    db.commit()

    return {"message": "reply deleted succesfully"}
    