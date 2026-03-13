# GuidoGerb Backend - Python (FastAPI)

This is the Python/FastAPI version of the GuidoGerb backend service, converted from Spring Boot.

## Prerequisites

- Python 3.11 or higher
- Poetry (for dependency management)
- PostgreSQL 15+
- Redis (optional, for caching and background tasks)

## Setup

### 1. Install Poetry

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### 2. Install Dependencies

```bash
poetry install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
# Application
APP_NAME=guidogerb-backend
APP_VERSION=0.1.0
DEBUG=True
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/guidogerb
DATABASE_POOL_SIZE=5
DATABASE_MAX_OVERFLOW=10

# Security
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:8080"]

# Redis (optional)
REDIS_URL=redis://localhost:6379/0
```

### 4. Run Database Migrations

```bash
poetry run alembic upgrade head
```

### 5. Run the Application

**Development mode with auto-reload:**
```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

**Or using the convenience script:**
```bash
poetry run python -m app.main
```

## Development

### Run Tests

```bash
# Run all tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=app --cov-report=html

# Run specific test file
poetry run pytest tests/unit/test_auth.py
```

### Code Formatting

```bash
# Format code with Black
poetry run black .

# Lint with Ruff
poetry run ruff check .

# Type check with mypy
poetry run mypy src/
```

### Database Migrations

```bash
# Create a new migration
poetry run alembic revision --autogenerate -m "description"

# Apply migrations
poetry run alembic upgrade head

# Rollback migration
poetry run alembic downgrade -1
```

## API Documentation

Once the application is running, visit:

- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc
- **OpenAPI JSON**: http://localhost:8080/openapi.json

## Project Structure

```
backend-python/
├── src/
│   └── app/
│       ├── __init__.py
│       ├── main.py              # Application entry point
│       ├── config.py            # Configuration settings
│       ├── database.py          # Database setup
│       ├── models/              # SQLAlchemy models
│       │   ├── __init__.py
│       │   └── user.py
│       ├── schemas/             # Pydantic schemas
│       │   ├── __init__.py
│       │   └── user.py
│       ├── routers/             # API routes
│       │   ├── __init__.py
│       │   ├── auth.py
│       │   └── users.py
│       ├── services/            # Business logic
│       │   ├── __init__.py
│       │   └── auth_service.py
│       ├── repositories/        # Data access layer
│       │   ├── __init__.py
│       │   └── user_repository.py
│       ├── core/                # Core utilities
│       │   ├── __init__.py
│       │   ├── security.py
│       │   └── dependencies.py
│       └── utils/               # Helper functions
│           ├── __init__.py
│           └── helpers.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   └── integration/
├── alembic/                     # Database migrations
│   ├── versions/
│   └── env.py
├── alembic.ini
├── pyproject.toml
├── .env.example
└── README.md
```

## Docker

### Build and Run

```bash
# Build image
docker build -t guidogerb-backend:latest .

# Run container
docker run -p 8080:8080 --env-file .env guidogerb-backend:latest

# Or use docker-compose
docker-compose up
```

## Migration from Spring Boot

This service has been converted from Spring Boot to FastAPI. Key changes:

- **Spring Boot** → **FastAPI**
- **Maven** → **Poetry**
- **Spring Data JPA** → **SQLAlchemy**
- **Spring Security** → **FastAPI Security + JWT**
- **application.properties** → **.env + Pydantic Settings**
- **JUnit** → **pytest**

See `MIGRATION.md` for detailed conversion notes.

## License

Copyright 2024 Gary Gerber

Licensed under the Apache License, Version 2.0
