import resend
import settings
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

mail_config = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_USERNAME,  # Ensure MAIL_FROM is set
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS,
    TEMPLATE_FOLDER=Path(BASE_DIR, 'templates')
)

mail = FastMail(config=mail_config)

def create_message(recipient: list[str], subject: str, body: str):
  message = MessageSchema(
    recipients=recipient, subject=subject, body=body, subtype=MessageType.html
  )
  return message

async def send_mail(email: list[str], link):
  message = create_message(
    recipient=email,
    subject='Account succesfully created',
    body=f"""
    <html>
      <body>
        <h1>Verify your email</h1>
        <p>Please click this <a href="{link}">link</a> to verify your account</p>
      </body>
    </html>
    """
  )
  await mail.send_message(message)
  return {"message": "email sent succesfully"}

async def send_password_reset_mail(email: list[str], link):
  message = create_message(
    recipient=email,
    subject='Reset password',
    body=f"""
    <html>
      <body>
        <h1>Change account password</h1>
        <p>Please click this <a href="{link}">link</a> to change your password</p>
      </body>
    </html>
    """
  )
  await mail.send_message(message)
  return {"message": "email sent succesfully"}