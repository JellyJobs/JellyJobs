from django.urls import path
from external.externalView import JoinUs


urlpatterns = [
    path('', JoinUs, name='joinus'), 
]