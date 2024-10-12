from django.urls import path
from login.loginView import AdminLoginView

urlpatterns = [
    path('', AdminLoginView.as_view(), name='admin-login'),
]
