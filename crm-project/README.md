# CRM Project Backend

This project provides a Django 4.2 CRM backend with JWT authentication, DRF APIs, Celery workers, Redis-backed WebSockets (Channels), SQLite by default (switchable to PostgreSQL), and S3-ready file storage. It is designed to pair with a React/Vue frontend via REST and WebSocket endpoints.

## Prerequisites
- Python 3.10+
- Node 18+ (for the optional frontend stub)
- Docker & Docker Compose (recommended for local setup)
- Redis (only needed if you run services without Docker). PostgreSQL is optional if you prefer it over SQLite.

## Quick start with Docker Compose
1. Copy the example environment settings and adjust values:
   ```bash
   cp backend/.env.example backend/.env  # create your env file
   # Edit backend/.env to set DB credentials, SECRET_KEY, and AWS keys
   ```
2. Build and start the stack (backend, frontend, Redis, Celery worker, and Channels) using SQLite for storage by default:
   ```bash
   cd docker
   docker compose up --build
   ```
3. Run initial migrations and create a superuser inside the backend container:
   ```bash
   docker compose exec backend python manage.py migrate
   docker compose exec backend python manage.py createsuperuser
   ```
4. Access services:
   - API: http://localhost:8000/api/
   - Swagger docs: http://localhost:8000/api/schema/swagger-ui/
   - WebSocket endpoint: ws://localhost:8000/ws/notifications/
   - Frontend stub (Vite dev server): http://localhost:5173/

## Manual backend setup (without Docker)
1. Create and activate a virtual environment, then install dependencies:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
2. Create `backend/.env` with required settings. Minimum variables:
   ```ini
   SECRET_KEY=change-me
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DJANGO_DB_ENGINE=sqlite
   # Optional: switch to Postgres by setting DJANGO_DB_ENGINE=postgres and filling these values
   POSTGRES_DB=crm
   POSTGRES_USER=crm
   POSTGRES_PASSWORD=crm
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   REDIS_URL=redis://localhost:6379/0
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   AWS_STORAGE_BUCKET_NAME=your-bucket
   AWS_ACCESS_KEY_ID=your-key
   AWS_SECRET_ACCESS_KEY=your-secret
   ```
   (If you do not use S3 in development, set `DEFAULT_FILE_STORAGE=django.core.files.storage.FileSystemStorage`.)
3. Apply migrations and create a superuser:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
4. Start supporting services (Redis and Celery worker/beat). SQLite needs no extra services:
   ```bash
   # In separate terminals
   celery -A crm worker -l info
   celery -A crm beat -l info
   daphne -b 0.0.0.0 -p 8001 crm.asgi:application  # Channels ASGI server
   python manage.py runserver 0.0.0.0:8000
   ```
   (Alternatively, run `python manage.py runserver` for development without Channels.)

## Frontend stub (optional)
A minimal Vite + JS stub lives in `frontend/`. To run it locally:
```bash
cd frontend
npm install
npm run dev
```

## Testing
Run Django tests from the `backend` directory:
```bash
cd backend
python manage.py test
```

## Common issues
- If migrations fail, ensure your `.env` matches the database engine you intend to use (SQLite requires no additional settings; Postgres needs the connection values above).
- CORS errors typically mean `CORS_ALLOWED_ORIGINS` does not include your frontend URL.
- For WebSockets, ensure Redis is reachable and the ASGI server (`daphne` or `uvicorn`) is running.
