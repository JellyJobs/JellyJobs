from rest_framework import serializers
from models import Trabajador, Profesion, Localidad, Archivo, Cv

class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = ['nombre']

class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = ['nombre']

class ArchivoSerializer(serializers.ModelSerializer):
    archivolink = serializers.FileField()  # Archivo real

    class Meta:
        model = Archivo
        fields = ['idarchivo', 'archivolink']

class CVSerializer(serializers.ModelSerializer):
    cvlink = serializers.FileField()  # Archivo real

    class Meta:
        model = Cv
        fields = ['idcv', 'cvlink']

class JoinUsSerializer(serializers.ModelSerializer):
    archivo = ArchivoSerializer(required=False)
    cv = CVSerializer(required=False)

    class Meta:
        model = Trabajador
        fields = '__all__'

    def create(self, validated_data):
        archivo_data = validated_data.pop('archivo', None)
        cv_data = validated_data.pop('cv', None)

        trabajador = Trabajador.objects.create(**validated_data)

        if archivo_data:
            Archivo.objects.create(trabajador=trabajador, **archivo_data)
        if cv_data:
            Cv.objects.create(trabajador=trabajador, **cv_data)

        return trabajador
