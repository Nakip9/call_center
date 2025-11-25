from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        MANAGER = 'manager', 'Manager'
        AGENT = 'agent', 'Agent'
        VIEWER = 'viewer', 'Viewer'

    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.VIEWER)
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.URLField(blank=True)
    department = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
