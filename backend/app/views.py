from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny
from app.serializers import LoginSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Cv, Archivo , Trabajador, Profesion
from .serializers import CvSerializer,ArchivoSerializer, TrabajadorSerializer,ProfesionSerializer,TrabajadorCardSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


#Login
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({"message": "Login Exitoso"}, status=200)
        return Response(serializer.errors, status=401)



class CvViewSet(viewsets.ModelViewSet):
    queryset = Cv.objects.all()
    serializer_class = CvSerializer

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer

#Crear trabajador desde formulario, despues se tiene que aceptar por admin
@method_decorator(csrf_exempt, name='dispatch')
class CrearTrabajadorPendienteView(APIView):
    def post(self, request,*args, **kwargs): 
        data = request.data.copy()
        archivo_data = {'archivolink': request.FILES.get('archivo')}
        archivo_serializer = ArchivoSerializer(data=archivo_data)
        if archivo_serializer.is_valid():
            archivo_obj = archivo_serializer.save()
            data['idarchivo'] = archivo_obj.idarchivo
        else:
            return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Crear el CV
        cv_data = {'cvlink': request.FILES.get('cv')}
        cv_serializer = CvSerializer(data=cv_data)
        if cv_serializer.is_valid():
            cv_obj = cv_serializer.save()
            data['idcv'] = cv_obj.idcv
        else:
            return Response(cv_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Crear el trabajador
        trabajador_serializer = TrabajadorSerializer(data=data)
        if trabajador_serializer.is_valid():
            trabajador_serializer.save()
            return Response({'message': 'Trabajador creado, esperando aprobación'}, status=status.HTTP_201_CREATED)

        return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = TrabajadorSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Trabajador creado, esperando aprobación'}, status=status.HTTP_201_CREATED)
        
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
        return Response(serializer.data)

