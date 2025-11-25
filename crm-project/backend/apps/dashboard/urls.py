from django.urls import path
from .views import DashboardView, ActivityCalendarView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('calendar/', ActivityCalendarView.as_view(), name='activity_calendar'),
]
