from django.urls import path
from app.views import AdminLoginView

urlpatterns = [
    path('/login', AdminLoginView.as_view(), name='admin-login'),
]
