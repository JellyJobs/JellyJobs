from rest_framework.decorators import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from app.serializers import LoginSerializer
from rest_framework.response import Response
from rest_framework import  status
from .models import Trabajador, Profesion,Localidad,Provincia, Solicitud
from .serializers import TrabajadorSerializer,ProfesionSerializer,TrabajadorCardSerializer, LoginSerializer,LocalidadListSerializer, SolicitudSerializer,TrabajadorDetallesSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import ValidationError
from .serializers import SolicitudSerializer, TrabajadorSerializer
from rest_framework.permissions import IsAuthenticated

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.validated_data['user']  # Usuario validado

            # Genera los tokens
            refresh = RefreshToken.for_user(admin)
            
            # Añadir idadmin y email al payload del token (opcional)
            refresh.payload['idadmin'] = admin.idadmin
            refresh.payload['email'] = admin.email

            access_token = str(refresh.access_token)
            refresh_token = str(refresh)  # Obtén el refresh_token

            return Response({
                "message": "Login Exitoso",
                "idadmin": admin.idadmin,
                "email": admin.email,
                "access_token": access_token,
                "refresh_token": refresh_token  # Devolver también el refresh_token
            }, status=200)
        
        return Response(serializer.errors, status=401)





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
