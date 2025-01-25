from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny
from app.serializers import LoginSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Cv, Archivo , Trabajador, Profesion
from .serializers import CvSerializer,ArchivoSerializer, TrabajadorSerializer,ProfesionSerializer,TrabajadorCardSerializer, LoginSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser

#Login
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.validated_data['user']  # Usuario validado
            return Response({"message": "Login Exitoso", "idadmin": admin.idadmin}, status=200)
        return Response(serializer.errors, status=401)



class CvView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Para manejar archivos y datos del formulario

    def post(self, request, *args, **kwargs):
        serializer = CvSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"idcv": serializer.data.get('idcv')}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class ArchivoView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Para manejar archivos y datos del formulario

    def post(self, request, *args, **kwargs):
        serializer = ArchivoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"idarchivo": serializer.data.get('idarchivo')}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Crear trabajador desde formulario, despues se tiene que aceptar por admin
class CrearTrabajadorPendienteView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Para manejar archivos y datos del formulario

    def post(self, request, *args, **kwargs):
        # Procesar CV
        cv_file = request.FILES.get('cvlink', None)  # Aquí extrae solo el archivo con clave 'cvlink'
        archivo_file = request.FILES.get('archivolink', None)  # Aquí extrae solo el archivo con clave 'archivolink'
        
        cv_response = CvView().post(cv_file)  # Invocar CvView
        archivo_response = ArchivoView().post(archivo_file)  # Invocar ArchivoView

        # Obtener idcv y idarchivo de los responses
        cv_instance = cv_response.data if cv_response.status_code == status.HTTP_201_CREATED else None
        archivo_instance = archivo_response.data if archivo_response.status_code == status.HTTP_201_CREATED else None

        cv = cv_instance.get('idcv') if cv_instance else None
        archivo = archivo_instance.get('idarchivo') if archivo_instance else None

        # Datos del trabajador
        trabajador_data = {
            "nombre": request.data.get("nombre"),
            "apellido": request.data.get("apellido"),
            "dni": request.data.get("dni"),
            "email": request.data.get("email"),
            "descripcion": request.data.get("descripcion"),
            "numtel": request.data.get("numtel"),
            "edad": request.data.get("edad"),
        }

        # Crear Trabajador y asociar los modelos creados
        trabajador_serializer = TrabajadorSerializer(
            data={**trabajador_data, "idcv": cv, "idarchivo": archivo}
        )
        if trabajador_serializer.is_valid():
            trabajador_serializer.save()
            return Response(trabajador_serializer.data, status=status.HTTP_201_CREATED)

        return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
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
        serializer = TrabajadorSerializer(trabajador)
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