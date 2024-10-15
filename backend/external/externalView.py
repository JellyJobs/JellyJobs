from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import JoinUsSerializer

@api_view(['POST'])
def JoinUs(request):
    if request.method == 'POST':
        archivo = request.FILES.get('archivo')
        cv = request.FILES.get('cv')

       
        data = request.data.copy()

        # Añadir los archivos si existen
        if archivo:
            data['archivo'] = {'archivolink': archivo}
        if cv:
            data['cv'] = {'cvlink': cv}
            
        serializer = JoinUsSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
