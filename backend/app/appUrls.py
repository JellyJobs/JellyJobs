from django.urls import path
from app.views import AdminLoginView, CrearTrabajadorPendienteView, ActualizarEstadoContratoView,ProfesionAPIView,TrabajadorDetailView,TrabajadorCardView, CvView,ArchivoView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('crear-trabajador/', CrearTrabajadorPendienteView.as_view(), name='crear-trabajador'),
    path('actualizar-estado/<int:pk>/', ActualizarEstadoContratoView.as_view(), name='actualizar-estado'),
    path('profesionlista/', ProfesionAPIView.as_view(),name='profesionlista'),
    path('trabajador/<int:pk>/', TrabajadorDetailView.as_view(), name='trabajador-detail'),
    path('trabajador-card/', TrabajadorCardView.as_view(),name='trabajador-card'),
    path('prueba/',CvView.as_view(),name='prueba'),
]
