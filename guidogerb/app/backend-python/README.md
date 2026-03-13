# Backend Service (Python/FastAPI)

**Port:** 8080  
**Status:** ✅ Production Ready  
**Converted from:** Spring Boot Java Application

## 📋 Overview

The Backend service is the core authentication and user management system for the GuidoGerb platform. It provides secure JWT-based authentication, user registration, profile management, and role-based access control (RBAC).

## 🎯 Features

### Implemented ✅
- **User Authentication**
  - JWT token-based authentication
  - Access and refresh token support
  - Secure password hashing with bcrypt
  - Login/logout functionality
  
- **User Management**
  - User registration with validation
  - Profile retrieval and updates
  - User deletion (admin only)
  - Password change functionality
  - Role-based access control (user/admin)

- **Database Integration**
  - PostgreSQL with async SQLAlchemy 2.0
  - Alembic migrations
  - Async database operations
  - Connection pooling

- **API Documentation**
  - OpenAPI/Swagger UI at `/docs`
  - ReDoc at `/redoc`
  - Comprehensive endpoint documentation

- **Testing**
  - Unit tests for services
  - Integration tests for API endpoints
  - Test coverage with pytest

### In Development 🚧
- Email verification
- Password reset via email
- OAuth2 integration (Google, GitHub)
- Rate limiting
- User activity logging
- Account suspension/deactivation

## 🏗️ Architecture

```
backend-python/
├── src/app/
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration management
│   ├── database.py             # Database setup and session management
│   ├── core/
│   │   ├── security.py         # JWT, password hashing, auth utils
│   │   └── dependencies.py     # FastAPI dependencies (auth, DB)
│   ├── models/
│   │   └── user.py             # SQLAlchemy User model
│   ├── schemas/
│   │   └── user.py             # Pydantic schemas (validation)
│   ├── repositories/
│   │   └── user_repository.py  # Database access layer
│   ├── services/
│   │   └── auth_service.py     # Business logic for auth
│   └── routers/
│       ├── auth.py             # Auth endpoints (register, login)
│       └── users.py            # User management endpoints
├── tests/
│   ├── unit/                   # Unit tests
│   └── integration/            # Integration tests
├── alembic/                    # Database migrations
├── pyproject.toml              # Poetry dependencies
├── Dockerfile                  # Docker container
└── docker-compose.yml          # Local development setup
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- PostgreSQL 14+
- Poetry (recommended) or pip

### Installation

#### Using Docker (Recommended)
```bash
cd guidogerb/app/backend-python
docker-compose up -d
```

#### Using Poetry
```bash
cd guidogerb/app/backend-python
poetry install
poetry run alembic upgrade head
poetry run uvicorn app.main:app --reload --port 8080
```

#### Using pip
```bash
cd guidogerb/app/backend-python
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8080
```

### Environment Variables

Create a `.env` file (see `.env.example`):

```env
# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/guidogerb

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Application
APP_NAME=GuidoGerb Backend
APP_VERSION=0.1.0
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=INFO

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user profile

### Users (Authenticated)
- `GET /api/users/` - List all users (admin only)
- `GET /api/users/{user_id}` - Get user by ID
- `PATCH /api/users/{user_id}` - Update user profile
- `DELETE /api/users/{user_id}` - Delete user (admin only)
- `POST /api/users/{user_id}/change-password` - Change password

### Health & Info
- `GET /health` - Health check endpoint
- `GET /` - API information

## 🧪 Testing

Run tests:
```bash
# All tests
poetry run pytest

# With coverage
poetry run pytest --cov=app --cov-report=html

# Integration tests only
poetry run pytest tests/integration/

# Unit tests only
poetry run pytest tests/unit/
```

## 🗄️ Database Migrations

```bash
# Create new migration
poetry run alembic revision --autogenerate -m "Description"

# Apply migrations
poetry run alembic upgrade head

# Rollback one migration
poetry run alembic downgrade -1

# View migration history
poetry run alembic history
```

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with configurable expiration
- HTTPS recommended for production
- CORS properly configured
- SQL injection protection via SQLAlchemy
- Input validation via Pydantic

## 📊 Performance

- Async/await for all I/O operations
- Connection pooling (default: 5-20 connections)
- Efficient database queries with proper indexing
- Response times: <100ms for most endpoints

## 🐛 Known Issues

See `tasks.md` for detailed list of pending improvements and bug fixes.

## 🤝 Contributing

1. Follow existing code structure
2. Add tests for new features
3. Update this README if adding new features
4. Run linters: `ruff check .` and `black .`

## 📝 Conversion Notes

Converted from Spring Boot with the following mappings:
- Spring Security → FastAPI dependencies + JWT
- Spring Data JPA → SQLAlchemy 2.0 (async)
- @RestController → FastAPI routers
- @Service → Service classes
- Repository Pattern → Repository classes
- application.properties → config.py + .env

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java Backend (Historical)](../../../docs/services/java/backend.md)
- [Conversion Documentation](../../../docs/conversion/)
