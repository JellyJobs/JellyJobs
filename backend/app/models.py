from django.db import models

class Admin(models.Model):
    idadmin = models.AutoField(db_column='idAdmin', primary_key=True)
    email = models.TextField()
    contrasena = models.TextField()

    class Meta:
        db_table = 'Admin'


class Archivo(models.Model):
    idarchivo = models.AutoField(db_column='idArchivo', primary_key=True)
    archivolink = models.TextField(db_column='archivoLink', blank=True, null=True)

    class Meta:
        db_table = 'Archivo'


class Cv(models.Model):
    idcv = models.AutoField(primary_key=True)
    cvlink = models.TextField()

    class Meta:
        db_table = 'Cv'


class Localidad(models.Model):
    idlocalidad = models.AutoField(db_column='idLocalidad', primary_key=True)
    nombre = models.TextField()

    class Meta:
        db_table = 'Localidad'


class Profesion(models.Model):
    idprofesion = models.AutoField(db_column='idProfesion', primary_key=True)
    experiencia = models.IntegerField()
    nombre = models.TextField()

    class Meta:
        db_table = 'Profesion'


class Provincia(models.Model):
    idprovincia = models.AutoField(db_column='idProvincia', primary_key=True)
    nombre = models.TextField()
    idlocalidad = models.ForeignKey(Localidad,db_column='idLocalidad', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Provincia'


class Solicitud(models.Model):
    idsolicitud = models.AutoField(db_column='idSolicitud', primary_key=True)
    cantempleados = models.IntegerField(db_column='cantEmpleados')
    idprofesion = models.ForeignKey(Profesion, db_column='idProfesion', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Solicitud'


class Trabajador(models.Model):
    idtrabajador = models.AutoField(db_column='idTrabajador', primary_key=True)
    nombre = models.TextField()
    apellido = models.TextField()
    dni = models.IntegerField(db_column='DNI')
    email = models.TextField()
    numtel = models.IntegerField(db_column='numTel')
    edad = models.IntegerField()
    descripcion = models.TextField()
    estadotrabajo = models.TextField(db_column='estadoTrabajo')
    estadocontrato = models.TextField(db_column='estadoContrato')
    idprofesion = models.ForeignKey(Profesion,db_column='idProfesion', on_delete=models.CASCADE)
    idlocalidad = models.ForeignKey(Localidad,db_column='idLocalidad', on_delete=models.CASCADE)
    idarchivo = models.ForeignKey(Archivo,db_column='idArchivo', on_delete=models.CASCADE)
    idcv = models.ForeignKey(Cv,db_column='idcv', blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'Trabajador'


class Trabajadorxprofesion(models.Model):
    idtrabajador = models.ForeignKey(Trabajador,db_column='idTrabajador', on_delete=models.CASCADE)
    idprofesion = models.ForeignKey(Profesion,db_column='idProfesion', blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'TrabajadorxProfesion'


class Valoracion(models.Model):
    idvaloracion = models.AutoField(db_column='idValoracion', primary_key=True)
    estrellas = models.IntegerField()
    opinion = models.TextField(blank=True, null=True)
    idtrabajador = models.ForeignKey(Trabajador,db_column='idTrabajador', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Valoracion'
        
class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    first_name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    action_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'