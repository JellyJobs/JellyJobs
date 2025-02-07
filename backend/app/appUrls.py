from django.urls import path
from app.views import AdminLoginView, CrearTrabajadorPendienteAPIView, ActualizarEstadoContratoView,ProfesionAPIView,TrabajadorDetailView,TrabajadorCardView,OptionView,LocalidadListView, SolicitudAPIView, InteraccionAPIView, eliminar_solicitud,VerifyTokenView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('crear-trabajador/', CrearTrabajadorPendienteAPIView.as_view(), name='crear-trabajador'),
    path('validarToken/',VerifyTokenView.as_view(),name='validarToken/'),
    path('actualizar-estado/<int:pk>/', ActualizarEstadoContratoView.as_view(), name='actualizar-estado'),
    path('profesionlista/', ProfesionAPIView.as_view(),name='profesionlista'),
    path('trabajador/<int:pk>/', TrabajadorDetailView.as_view(), name='trabajador-detail'),
    path('trabajador-card/', TrabajadorCardView.as_view(),name='trabajador-card'),
    path('get-trabajadores/', OptionView.as_view(), name='get-trabajadores'),
    path('update-trabajador/<int:idtrabajador>/', OptionView.as_view(),name='update-trabajador'),
    path('localidad/',LocalidadListView.as_view(),name='localidad'),
    path('solicitudes/', SolicitudAPIView.as_view(), name='listar_solicitudes'),  # 🔹 SOLO ADMIN
    path('interaccion/', InteraccionAPIView.as_view(), name='interaccion'),  # 🔹 INTERACCIÓN EXTERNA
    path("solicitudes/<int:idsolicitud>/", eliminar_solicitud, name="eliminar_solicitud"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
