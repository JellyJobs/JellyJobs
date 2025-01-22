from django.contrib import admin
from .models import Admins, Archivo, Cv, Localidad, Profesion, Provincia, Trabajador, Solicitud, Trabajadorxprofesion, Valoracion

@admin.register(Admins)
class AdminsAdmin(admin.ModelAdmin):
    list_display = ('idadmin', 'email')
    search_fields = ('email',)

@admin.register(Archivo)
class ArchivoAdmin(admin.ModelAdmin):
    list_display = ('idarchivo', 'archivolink')
    search_fields = ('archivolink',)

@admin.register(Cv)
class CvAdmin(admin.ModelAdmin):
    list_display = ('idcv', 'cvlink')
    search_fields = ('cvlink',)

@admin.register(Provincia)
class ProvinciaAdmin(admin.ModelAdmin):
    list_display = ('idprovincia', 'nombre',)
    search_fields = ('nombre',)
    
@admin.register(Localidad)
class LocalidadAdmin(admin.ModelAdmin):
    list_display = ('idlocalidad', 'nombre', 'idprovincia',)
    search_fields = ('nombre',)
    list_filter = ('idprovincia',)

@admin.register(Profesion)
class ProfesionAdmin(admin.ModelAdmin):
    list_display = ('idprofesion', 'nombre')
    search_fields = ('nombre',)

@admin.register(Trabajador)
class TrabajadorAdmin(admin.ModelAdmin):
    list_display = ('idtrabajador', 'nombre', 'apellido', 'dni', 'email', 'estadotrabajo', 'estadocontrato', 'idprofesion', 'idlocalidad')
    search_fields = ('nombre', 'apellido', 'dni', 'email')
    list_filter = ('estadotrabajo', 'estadocontrato', 'idlocalidad', 'idprofesion')
    raw_id_fields = ('idarchivo', 'idcv')  # para mejorar la selección de archivos y CV en el admin

@admin.register(Solicitud)
class SolicitudAdmin(admin.ModelAdmin):
    list_display = ('idsolicitud', 'empresa', 'fecha_inicio', 'fecha_fin')
    filter_horizontal = ('idtrabajadores',)  # para mejorar la interfaz de selección de trabajadores
    search_fields = ('empresa',)
    list_filter = ('fecha_inicio', 'fecha_fin')

@admin.register(Trabajadorxprofesion)
class TrabajadorxProfesionAdmin(admin.ModelAdmin):
    list_display = ('idtrabajador', 'idprofesion')
    search_fields = ('idtrabajador__nombre', 'idprofesion__nombre')

@admin.register(Valoracion)
class ValoracionAdmin(admin.ModelAdmin):
    list_display = ('idvaloracion', 'estrellas', 'opinion', 'idtrabajador')
    search_fields = ('opinion',)
    list_filter = ('estrellas',)

