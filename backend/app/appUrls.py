from django.urls import path
from app.views import AdminLoginView, CrearTrabajadorPendienteView, ActualizarEstadoContratoView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('crear-trabajador/', CrearTrabajadorPendienteView.as_view(), name='crear-trabajador'),
    path('actualizar-estado/<int:pk>/', ActualizarEstadoContratoView.as_view(), name='actualizar-estado'),
]
