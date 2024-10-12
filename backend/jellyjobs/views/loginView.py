from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from serializers import LoginSerializer

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({"message": "Login Exitoso"}, status=200)
        return Response(serializer.errors, status=401)