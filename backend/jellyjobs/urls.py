from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # Ruta de administración de Django
    path('app/', include('app.appUrls')),  # Otras rutas de la aplicación
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='home'),  # Ruta de captura para index.html
]
