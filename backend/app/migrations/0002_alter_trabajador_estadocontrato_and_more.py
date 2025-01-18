# Generated by Django 4.2.7 on 2025-01-18 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trabajador',
            name='estadocontrato',
            field=models.TextField(choices=[('pendiente', 'Pendiente'), ('aceptado', 'Aceptado'), ('rechazado', 'Rechazado')], db_column='estadoContrato', default='pendiente'),
        ),
        migrations.AlterField(
            model_name='trabajador',
            name='estadotrabajo',
            field=models.CharField(choices=[('disponible', 'Disponible'), ('ocupado', 'Ocupado'), ('inactivo', 'Inactivo')], db_column='estadoTrabajo', default='disponible', max_length=20),
        ),
    ]
