from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import Admins

class AdminEmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            # Buscar al admin por email
            admin = Admins.objects.get(email=email)
            # Verificar la contraseña
            if check_password(password, admin.contrasena):
                return admin
        except Admins.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Admins.objects.get(idadmin=user_id)
        except Admins.DoesNotExist:
            return None