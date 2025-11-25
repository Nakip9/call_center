from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ContactViewSet

router = DefaultRouter()
router.register('companies', CompanyViewSet)
router.register('', ContactViewSet)

urlpatterns = router.urls
