from django.apps import AppConfig
from django.core.management import call_command

class AppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app"  # Ajusta al nombre correcto de tu aplicación

    def ready(self):
        """Ejecuta la actualización de estados al iniciar el servidor."""
        from django.conf import settings
        if settings.DEBUG:  # Solo en desarrollo para evitar problemas en producción
            try:
                call_command("actualizar_estados")
            except Exception as e:
                print(f"⚠ Error al ejecutar actualizar_estados: {e}")


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
