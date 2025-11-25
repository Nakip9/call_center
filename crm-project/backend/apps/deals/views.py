from django.db.models import Sum, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Deal, Activity
from .serializers import DealSerializer, ActivitySerializer


class DealViewSet(viewsets.ModelViewSet):
    queryset = Deal.objects.select_related('contact', 'owner').prefetch_related('contact__company')
    serializer_class = DealSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'contact__first_name', 'contact__last_name']
    ordering_fields = ['amount', 'expected_close', 'updated_at']
    filterset_fields = ['stage']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def pipeline(self, request):
        data = self.get_queryset().values('stage').annotate(total=Sum('amount'), count=Count('id'))
        return Response(data)

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        won = self.get_queryset().filter(stage='won').aggregate(total=Sum('amount'))['total'] or 0
        lost = self.get_queryset().filter(stage='lost').aggregate(total=Sum('amount'))['total'] or 0
        return Response({'won': won, 'lost': lost})


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.select_related('deal', 'contact', 'owner')
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description']
    ordering_fields = ['due_date', 'updated_at']
    filterset_fields = ['completed', 'type']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
