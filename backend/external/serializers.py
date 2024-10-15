from rest_framework import serializers
from .models import Trabajador, Profesion, Localidad, Archivo, Cv

class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = ['nombre']

class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = ['nombre']

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = ['idarchivo', 'archivolink']

class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cv
        fields = ['idcv', 'cvlink']

class JoinUsSerializer(serializers.ModelSerializer):
    # Relación con los archivos y CV
    archivo = ArchivoSerializer(required=False)  # Permitir que sea opcional
    cv = CVSerializer(required=False)  # Permitir que sea opcional

    class Meta:
        model = Trabajador
        fields = '__all__'

    def create(self, validated_data):
        # Extraer los datos de archivos y CV
        archivo_data = validated_data.pop('archivo', None)
        cv_data = validated_data.pop('cv', None)

        # Crear el trabajador
        trabajador = Trabajador.objects.create(**validated_data)

        # Crear los archivos relacionados si existen
        if archivo_data:
            Archivo.objects.create(trabajador=trabajador, **archivo_data)
        if cv_data:
            Cv.objects.create(trabajador=trabajador, **cv_data)

        return trabajador
