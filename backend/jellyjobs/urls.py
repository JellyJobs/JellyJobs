from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login.loginUrls')), #remplazar con url de login y agregar con el include
]
