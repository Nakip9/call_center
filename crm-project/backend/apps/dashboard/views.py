from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.contacts.models import Contact
from apps.deals.models import Deal, Activity


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        recent_activities = Activity.objects.select_related('owner').order_by('-updated_at')[:10]
        deals = Deal.objects.all()
        contacts = Contact.objects.all()
        data = {
            'recent_activities': [
                {
                    'type': activity.type,
                    'description': activity.description,
                    'owner': getattr(activity.owner, 'username', None),
                    'updated_at': activity.updated_at,
                }
                for activity in recent_activities
            ],
            'stats': {
                'total_contacts': contacts.count(),
                'open_deals': deals.exclude(stage='won').count(),
                'won_deals': deals.filter(stage='won').count(),
            },
        }
        return Response(data)


class ActivityCalendarView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        start = request.query_params.get('start')
        end = request.query_params.get('end')
        qs = Activity.objects.all()
        if start:
            qs = qs.filter(due_date__gte=start)
        if end:
            qs = qs.filter(due_date__lte=end)
        payload = [
            {
                'type': activity.type,
                'description': activity.description,
                'due_date': activity.due_date,
                'completed': activity.completed,
            }
            for activity in qs
        ]
        return Response(payload)
