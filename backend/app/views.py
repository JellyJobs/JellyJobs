from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import  status
from .models import Trabajador, Profesion,Localidad, Solicitud,Admins
from .serializers import TrabajadorSerializer,ProfesionSerializer,TrabajadorCardSerializer,LocalidadListSerializer, SolicitudSerializer,TrabajadorDetallesSerializer,AdminSerializer,AdminEmailSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import SolicitudSerializer, TrabajadorSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from .utils import create_access_token
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
import jwt
from rest_framework import exceptions
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import random
import string
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password

class CambiarContrasenaView(APIView):
    def post(self, request):
        email = request.data.get("email")
        contrasena_actual = request.data.get("contrasena_actual")
        nueva_contrasena = request.data.get("nueva_contrasena")
        confirmar_contrasena = request.data.get("confirmar_contrasena")

        if not email or not contrasena_actual or not nueva_contrasena or not confirmar_contrasena:
            return Response({"error": "Todos los campos son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            admin = Admins.objects.get(email=email)

            # Verificar la contraseña actual
            if not check_password(contrasena_actual, admin.contrasena):
                return Response({"error": "La contraseña actual es incorrecta."}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar que la nueva contraseña y la confirmación coincidan
            if nueva_contrasena != confirmar_contrasena:
                return Response({"error": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

            # Guardar la nueva contraseña con el serializer
            nueva_contrasena_encriptada = make_password(nueva_contrasena)
            serializer = AdminSerializer(admin, data={"contrasena": nueva_contrasena_encriptada}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Admins.DoesNotExist:
            return Response({"error": "El usuario no existe."}, status=status.HTTP_400_BAD_REQUEST)

class CambiarEmailView(APIView):
    def post(self, request):
        email_actual = request.data.get("email_actual")
        nuevo_email = request.data.get("nuevo_email")

        if not email_actual or not nuevo_email:
            return Response({"error": "Ambos campos 'email_actual' y 'nuevo_email' son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            admin = Admins.objects.get(email=email_actual)

            # Usamos el serializer para actualizar el email
            serializer = AdminEmailSerializer(admin, data={"email": nuevo_email,})

            if serializer.is_valid():
                # Guarda el admin con el nuevo email
                serializer.save()

                # Generar el nuevo token JWT usando tu función personalizada
                access_token = create_access_token(admin)

                # Devolver el nuevo token en la respuesta
                return Response({
                    "message": "El correo electrónico se ha actualizado con éxito.",
                    "access_token": access_token  # Devuelves el nuevo token generado
                }, status=status.HTTP_200_OK)

            return Response({"error": "Error al actualizar el correo electrónico."}, status=status.HTTP_400_BAD_REQUEST)

        except Admins.DoesNotExist:
            return Response({"error": "El correo actual no corresponde a un administrador."}, status=status.HTTP_400_BAD_REQUEST)

class RecuperarContrasenaView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "El campo 'email' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            admin = Admins.objects.get(email=email)  # Busca el admin con ese email

            # Generar nueva contraseña aleatoria
            nueva_contrasena = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
            nueva_contrasena_encriptada = make_password(nueva_contrasena)

            admin_data = {"email": admin.email, "contrasena": nueva_contrasena_encriptada}
            serializer = AdminSerializer(admin, data=admin_data)
            if serializer.is_valid():
                serializer.save()  # Esto guarda la nueva contraseña (encriptada)
                
                # Enviar el correo con la nueva contraseña
                send_mail(
                    subject="Recuperación de Contraseña",
                    message=f"Tu nueva contraseña es: {nueva_contrasena}",
                    from_email="valenxity@gmail.com",
                    recipient_list=[email],
                    fail_silently=False,
                )

                return Response({"message": "Se ha enviado un correo con la nueva contraseña."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Error al actualizar la contraseña."}, status=status.HTTP_400_BAD_REQUEST)

        except Admins.DoesNotExist:
            return Response({"error": "El correo ingresado no pertenece a un administrador."}, status=status.HTTP_400_BAD_REQUEST)

class AdminInfoView(APIView):
    def get(self, request):
        # Obtén la ID del admin desde el encabezado o la sesión
        idadmin = request.headers.get('Id-Admin')  # O 'Authorization' si usas JWT
        
        if not idadmin:
            return Response({"error": "Administrador no autenticado"}, status=401)
        
        try:
            # Busca el admin en la base de datos por su ID
            admin = Admins.objects.get(idadmin=idadmin)
            return Response({
                "email": admin.email,
                "idadmin": admin.idadmin
            })
        except Admins.DoesNotExist:
            return Response({"error": "Administrador no encontrado"}, status=404)
#Login


class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]  # Aseguramos que el usuario esté autenticado
    
    def post(self, request):
        try:
            # Obtener el token desde la cookie 'token'
            token = request.COOKIES.get('token')

            if not token:
                raise AuthenticationFailed("Token no proporcionado")

            # Decodifica y verifica el token usando la clave secreta
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])  # Usando la clave secreta configurada en settings

            # Si el token es válido, devolvemos la respuesta afirmativa
            return Response({"isValid": True})

        except jwt.ExpiredSignatureError:
            # Si el token ha expirado
            return Response({"isValid": False, "error": "Token expirado"})
        except jwt.InvalidTokenError:
            # Si el token es inválido
            return Response({"isValid": False, "error": "Token inválido"})
        except AuthenticationFailed as e:
            # En caso de que no haya token o sea inválido
            return Response({"isValid": False, "error": str(e)})

class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        # Extrae el email y la contraseña del cuerpo de la solicitud
        email = request.data.get('email')
        password = request.data.get('contrasena')

        # Busca al administrador por el email
        admin = get_object_or_404(Admins, email=email)

        # Verifica la contraseña usando check_password de Django
        if check_password(password, admin.contrasena):  # admin.contrasena debe estar guardada como un hash
            # Si la contraseña es correcta, puedes proceder a generar el token
            token = create_access_token(admin)
            return Response({'access': token})
        else:
            # Si la contraseña es incorrecta, lanzar un error
            raise exceptions.AuthenticationFailed('Credenciales incorrectas')

class CrearTrabajadorPendienteAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TrabajadorSerializer(data=request.data)
        if serializer.is_valid():
            trabajador = serializer.save()
            return Response({"message": "Trabajador creado con éxito", "id": trabajador.idtrabajador}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





#AGREGE ESTOS DECORADORES PARA PODER TESTEARLO CON POSTMAN SINO NO ME DEJABA, ESTE ENDPOINT DE ACTUALIZAR ES PARA QUE EL ADMIN 
#RECHAZE O ACEPTE UN TRABAJADOR QUE SE REGISTRO POR EL FORMULARIO
@method_decorator(csrf_exempt, name='dispatch')
class ActualizarEstadoContratoView(APIView):
    def post(self, request, pk):
        try:
            trabajador = Trabajador.objects.get(pk=pk)
        except Trabajador.DoesNotExist:
            return Response({'error': 'Trabajador no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        nuevo_estado = request.data.get('estadoContrato')
        if nuevo_estado not in ['aceptado', 'rechazado']:
            return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)

        trabajador.estadocontrato = nuevo_estado
        trabajador.save()
        return Response({'message': f'Trabajador {nuevo_estado} exitosamente'}, status=status.HTTP_200_OK)

#listado  de profesiones
class ProfesionAPIView(APIView):
    def get(self, request):
        """Retorna la lista de todas las profesiones"""
        profesiones = Profesion.objects.all()
        serializer = ProfesionSerializer(profesiones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
#Editar datos trabajador GET para los datos actuales, PUT para actualizar algun campo como email o nombre, delete para cambiar el estado a inactivo (Borrado logico)
class TrabajadorDetailView(APIView):
    def get_object(self, pk):
        try:
            return Trabajador.objects.get(pk=pk)
        except Trabajador.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        trabajador = self.get_object(pk)
        if trabajador is None:
            return Response({"error": "Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TrabajadorDetallesSerializer(trabajador)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        trabajador = self.get_object(pk)
        if trabajador is None:
            return Response({"error": "Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TrabajadorSerializer(trabajador, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        trabajador = self.get_object(pk)
        if trabajador is None:
            return Response({"error": "Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        trabajador.estado_contrato = 'inactivo'
        trabajador.save()
        return Response({"message": "Trabajador marcado como inactivo"}, status=status.HTTP_200_OK)
    
    def patch(self, request, pk, format=None):
        try:
            trabajador = Trabajador.objects.get(pk=pk)
        except Trabajador.DoesNotExist:
            return Response({'error': 'Trabajador no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        # Creamos el serializador y pasamos los datos que recibimos en la solicitud
        serializer = TrabajadorSerializer(trabajador, data=request.data, partial=True)  # `partial=True` permite actualizar solo algunos campos
        
        # Verificamos si el serializador es válido
        if serializer.is_valid():
            serializer.save()  # Guardamos los cambios en el trabajador
            return Response(serializer.data, status=status.HTTP_200_OK)  # Devolvemos los datos actualizados
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrabajadorCardView(APIView):
    def get(self, request):
        trabajadores = Trabajador.objects.all()
        serializer = TrabajadorCardSerializer(trabajadores, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class OptionView(APIView):
    def patch(self, request, *args, **kwargs):
        # Obtener el trabajador por idtrabajador
        trabajador_id = kwargs.get('idtrabajador')
        try:
            trabajador = Trabajador.objects.get(idtrabajador=trabajador_id)
        except Trabajador.DoesNotExist:
            return Response({'detail': 'Trabajador no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Serializar los datos de la solicitud para actualizar el trabajador
        serializer = TrabajadorCardSerializer(trabajador, data=request.data, partial=True)  # Usamos partial=True para permitir solo la actualización del campo necesario
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en el trabajador
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocalidadListView(APIView):
    def get(self,request):
        localidad=Localidad.objects.all()
        serializer = LocalidadListSerializer(localidad,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# 🔹 Vista para que el ADMIN vea todas las solicitudes
class SolicitudAPIView(APIView):
    def get(self, request):
        """Lista todas las solicitudes que han llegado al sistema."""
        solicitudes = Solicitud.objects.all()
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 🔹 Vista para INTERACCIÓN EXTERNA (obtener trabajadores disponibles y crear solicitudes)
class InteraccionAPIView(APIView):
    def get(self, request):
        """Lista los trabajadores disponibles para una nueva solicitud."""
        trabajadores = Trabajador.objects.filter(estadotrabajo="disponible")
        serializer = TrabajadorSerializer(trabajadores, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Crea una nueva solicitud verificando que los trabajadores estén disponibles."""
        trabajadores_ids = request.data.get("idtrabajadores", [])

        # Verificar si los trabajadores seleccionados están disponibles
        trabajadores_disponibles = Trabajador.objects.filter(idtrabajador__in=trabajadores_ids, estadotrabajo="disponible")

        if trabajadores_disponibles.count() != len(trabajadores_ids):
            return Response(
                {"error": "Uno o más trabajadores seleccionados no están disponibles."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = SolicitudSerializer(data=request.data)
        
        if serializer.is_valid():
            solicitud = serializer.save()
            
            # Marcar trabajadores como "ocupados"
            trabajadores_disponibles.update(estadotrabajo="ocupado")

            return Response({
                "message": "Solicitud creada exitosamente",
                "solicitud": SolicitudSerializer(solicitud).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["DELETE"])
def eliminar_solicitud(request, idsolicitud):
    try:
        solicitud = Solicitud.objects.get(idsolicitud=idsolicitud)
        solicitud.delete()
        return Response({"mensaje": "Solicitud eliminada"}, status=status.HTTP_204_NO_CONTENT)
    except Solicitud.DoesNotExist:
        return Response({"error": "Solicitud no encontrada"}, status=status.HTTP_404_NOT_FOUND)
