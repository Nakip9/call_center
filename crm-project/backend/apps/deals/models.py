from django.conf import settings
from django.db import models
from apps.contacts.models import Contact

User = settings.AUTH_USER_MODEL


class Deal(models.Model):
    STAGES = [
        ('lead', 'Lead'),
        ('qualified', 'Qualified'),
        ('proposal', 'Proposal'),
        ('won', 'Won'),
        ('lost', 'Lost'),
    ]

    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    stage = models.CharField(max_length=50, choices=STAGES, default='lead')
    probability = models.PositiveIntegerField(default=0)
    expected_close = models.DateField(null=True, blank=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='deals')
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='deals')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title


class Activity(models.Model):
    TYPES = [
        ('call', 'Call'),
        ('email', 'Email'),
        ('meeting', 'Meeting'),
        ('task', 'Task'),
    ]

    type = models.CharField(max_length=50, choices=TYPES)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='activities', null=True, blank=True)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, related_name='activities', null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='activities')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.get_type_display()} - {self.description[:20]}"
