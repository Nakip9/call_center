from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Company(models.Model):
    INDUSTRIES = [
        ('technology', 'Technology'),
        ('finance', 'Finance'),
        ('health', 'Health'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=50, choices=INDUSTRIES, default='other')
    size = models.PositiveIntegerField(default=0)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('active', 'Active'),
        ('unresponsive', 'Unresponsive'),
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='contacts')
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='contacts')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
