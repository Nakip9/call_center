# CRM Project Backend

This directory contains a production-ready Django CRM backend scaffold featuring JWT authentication, DRF APIs, Celery tasks, Redis-backed channels, and PostgreSQL configuration. It is intended to pair with a React/Vue frontend.

## Key features
- Django 4.2 with Django REST Framework and Simple JWT
- Custom user model with role-based access control
- Contacts, companies, deals, and activities with filtering and pagination
- Swagger docs powered by drf-spectacular
- WebSocket notifications using Django Channels and Redis
- Celery setup for background jobs
- AWS S3-ready file storage via `django-storages`
- Docker targets for backend, frontend, Redis, and PostgreSQL

## Getting started
1. Create a virtual environment and install `backend/requirements.txt`.
2. Set required environment variables (database credentials, AWS keys, CORS origins).
3. Run migrations: `python manage.py migrate`.
4. Start services (Redis, PostgreSQL) and run `python manage.py runserver` or use Docker Compose.
