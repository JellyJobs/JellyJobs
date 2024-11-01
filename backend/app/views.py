from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny
from app.serializers import LoginSerializer
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Cv, Archivo
from .serializers import CvSerializer,ArchivoSerializer

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