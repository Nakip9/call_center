from celery import shared_task
from django.utils import timezone


@shared_task
def send_daily_summary():
    # Placeholder for summary task
    return f"Summary generated at {timezone.now()}"
