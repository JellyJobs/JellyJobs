from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.appUrls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='home'),
    #re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='home'),
]