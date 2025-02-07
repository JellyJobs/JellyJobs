# En 'app/utils.py'
import jwt
from datetime import timedelta, datetime
from django.conf import settings
from .models import Admins  # Cambia esto si usas otro modelo de usuario

def create_access_token(admin):
    # Define el tiempo de expiración (por ejemplo, 5 minutos)
    expiration_time = datetime.utcnow() + timedelta(minutes=5)
    
    # Crea el payload del token con la fecha de expiración
    payload = {
        'idadmin': admin.idadmin,
        'email': admin.email,
        'exp': expiration_time,  # Expiración del token
    }
    
    # Genera el token (asegurándote de que la clave secreta sea correcta)
    token = jwt.encode(payload, 'django-insecure-g_5as3h&^(qq58yo7c!1(yjg$&nwhf4)vf8bfk=^nh$e2odohe', algorithm='HS256')
    
    return token
