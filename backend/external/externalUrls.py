from django.urls import path
from .externalView import JoinUs


urlpatterns =[
    path('', JoinUs.as_view(), name='joinus'),

]