from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny
from app.serializers import LoginSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Cv, Archivo , Trabajador
from .serializers import CvSerializer,ArchivoSerializer, TrabajadorSerializer
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

#Crear trabajador desde formulario
@method_decorator(csrf_exempt, name='dispatch')
class CrearTrabajadorPendienteView(APIView):
    def post(self, request): 
        data = request.data.copy()
        data['estadocontrato'] = 'pendiente'
        serializer = TrabajadorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Trabajador creado, esperando aprobacion'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
