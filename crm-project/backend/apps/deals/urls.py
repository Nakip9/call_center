from rest_framework.routers import DefaultRouter
from .views import DealViewSet, ActivityViewSet

router = DefaultRouter()
router.register('activities', ActivityViewSet)
router.register('', DealViewSet)

urlpatterns = router.urls
