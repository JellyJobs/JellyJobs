from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Cv, Archivo , Trabajador,Profesion
from django.core.exceptions import ObjectDoesNotExist
from .models import Admins

#Login
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            # Buscar el administrador en la tabla Admins
            admin = Admins.objects.get(email=email)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas. Usuario no encontrado.")

        # Comparar la contraseña
        if admin.contrasena != password:
            raise serializers.ValidationError("Credenciales inválidas. Contraseña incorrecta.")

        # Adjuntar el admin validado a los datos validados
        attrs['user'] = admin
        return attrs

#fotos ----------------------------------------------------

class CvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cv
        fields = ['idcv','cvlink']  

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Archivo
        fields = ['idcv','archivolink']



#Home---------------------------------------------------------

#profesion
class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = ['idprofesion', 'nombre']

#Trabajadores

class TrabajadorSerializer(serializers.ModelSerializer):
    localidad=serializers.CharField(source='idlocalidad.nombre',read_only=True)
    profesion = serializers.CharField(source='idprofesion.nombre', read_only=True)
    cv=serializers.FileField(source='idcv.cvlink',read_only=True)
    archivo=serializers.ImageField(source='idarchivo.archivolink',read_only=True)
    class Meta:
        model = Trabajador
        fields = ['nombre','apellido','dni','email','numtel','localidad','edad','profesion','descripcion','cv','archivo']

class ListaTrabajadoresSerializer(serializers.ModelSerializer):  # Nuevo nombre
    archivo_url = serializers.SerializerMethodField()

    class Meta:
        model = Trabajador
        fields = ['id', 'nombre', 'profesion', 'estadocontrato', 'archivo_url']

    def get_archivo_url(self, obj):
        archivo = Archivo.objects.filter(trabajador=obj).first()
        if archivo:
            return archivo.archivo.url  # Suponiendo que `archivo` es un FileField
        return None

    
class TrabajadorCardSerializer(serializers.ModelSerializer):
    profesion = serializers.CharField(source='idprofesion.nombre', read_only=True)  # Accede al nombre de la profesión
    class Meta:
        model = Trabajador
        fields = ['nombre', 'apellido', 'estadotrabajo', 'profesion']