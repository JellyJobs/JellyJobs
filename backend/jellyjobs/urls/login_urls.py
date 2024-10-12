from rest_framework import routers
from jellyjobs.views.loginView import loginView

router = routers.DefaultRouter()
router.register('loginView/login', loginView, basename='login')

urlpatterns = router.urls
