from django.db import models


class Admin(models.Model):
    idadmin = models.AutoField(db_column='idAdmin', primary_key=True)  # Field name made lowercase.
    email = models.TextField()
    contrasena = models.TextField()

    class Meta:
        managed = True
        db_table = 'Admin'


class Archivo(models.Model):
    idarchivo = models.AutoField(db_column='idArchivo', primary_key=True)  # Field name made lowercase.
    archivolink = models.ImageField(upload_to='archivos/')

    class Meta:
        managed = True
        db_table = 'Archivo'


class Cv(models.Model):
    idcv = models.AutoField(db_column='idcv', primary_key=True)  # Field name made lowercase.
    cvlink = models.FileField(upload_to='cvs/')

    class Meta:
        managed = True
        db_table = 'Cv'


class Localidad(models.Model):
    idlocalidad = models.AutoField(db_column='idLocalidad', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()

    class Meta:
        managed = True
        db_table = 'Localidad'

    def __str__(self):
        return self.nombre

class Profesion(models.Model):
    idprofesion = models.AutoField(db_column='idProfesion', primary_key=True)  # Field name made lowercase.
    experiencia = models.IntegerField()
    nombre = models.TextField()

    class Meta:
        managed = True
        db_table = 'Profesion'

    def __str__(self):
        return self.nombre

class Provincia(models.Model):
    idprovincia = models.AutoField(db_column='idProvincia', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    idlocalidad = models.ForeignKey(Localidad, models.DO_NOTHING, db_column='idLocalidad')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'Provincia'

    def __str__(self):
        return self.nombre

class Solicitud(models.Model):
    idsolicitud = models.AutoField(db_column='idSolicitud', primary_key=True)  # Field name made lowercase.
    cantempleados = models.IntegerField(db_column='cantEmpleados')  # Field name made lowercase.
    idprofesion = models.ForeignKey(Profesion, models.DO_NOTHING, db_column='idProfesion')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'Solicitud'

    def __str__(self):
        return f"Solicitud {self.idsolicitud}"

class Trabajador(models.Model):
    idtrabajador = models.AutoField(db_column='idTrabajador', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    apellido = models.TextField()
    dni = models.IntegerField(db_column='DNI')  # Field name made lowercase.
    email = models.TextField()
    numtel = models.IntegerField(db_column='numTel')  # Field name made lowercase.
    edad = models.IntegerField()
    descripcion = models.TextField()
    estadotrabajo = models.TextField(db_column='estadoTrabajo')  # Field name made lowercase.
    estadocontrato = models.TextField(db_column='estadoContrato')  # Field name made lowercase.
    idprofesion = models.ForeignKey(Profesion, models.DO_NOTHING, db_column='idProfesion')  # Field name made lowercase.
    idlocalidad = models.ForeignKey(Localidad, models.DO_NOTHING, db_column='idLocalidad')  # Field name made lowercase.
    idarchivo = models.ForeignKey(Archivo, models.DO_NOTHING, db_column='idArchivo')  # Field name made lowercase.
    idcv = models.ForeignKey(Cv, models.DO_NOTHING, db_column='idcv')  # Field name made lowercase.
    
    class Meta:
        managed = True
        db_table = 'Trabajador'

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Trabajadorxprofesion(models.Model):
    idtrabajador = models.OneToOneField(Trabajador, models.DO_NOTHING, db_column='idTrabajador', primary_key=True, blank=True, null=True) # Field name made lowercase.
    idprofesion = models.ForeignKey(Profesion, models.DO_NOTHING, db_column='idProfesion', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'TrabajadorxProfesion'

    def __str__(self):
        return f"Trabajador {self.idtrabajador} - Profesion {self.idprofesion}"

class Valoracion(models.Model):
    idvaloracion = models.AutoField(db_column='idValoracion', primary_key=True)  # Field name made lowercase.
    estrellas = models.IntegerField()
    opinion = models.TextField(blank=True, null=True)
    idtrabajador = models.ForeignKey(Trabajador, models.DO_NOTHING, db_column='idTrabajador')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'Valoracion'

    def __str__(self):
        return f"Valorancion {self.idvaloracion} - {self.estrellas} estrellas"