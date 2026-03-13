"""
Pytest configuration and fixtures.
"""

import pytest
import pytest_asyncio
from typing import AsyncGenerator
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from testcontainers.postgres import PostgresContainer
from app.main import app
from app.database import Base, get_db
from app.models.user import User, Role
from app.core.security import get_password_hash


@pytest.fixture(scope="session")
def postgres_container():
    """Start PostgreSQL test container."""
    with PostgresContainer("postgres:15-alpine") as postgres:
        yield postgres


@pytest.fixture(scope="session")
def test_database_url(postgres_container):
    """Get test database URL from container."""
    return postgres_container.get_connection_url().replace(
        "psycopg2", "asyncpg"
    )


@pytest_asyncio.fixture(scope="function")
async def test_db_engine(test_database_url):
    """Create test database engine."""
    engine = create_async_engine(test_database_url, echo=False)
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    # Drop tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    await engine.dispose()


@pytest_asyncio.fixture(scope="function")
async def db_session(test_db_engine) -> AsyncGenerator[AsyncSession, None]:
    """Create test database session."""
    async_session = async_sessionmaker(
        test_db_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    
    async with async_session() as session:
        yield session
        await session.rollback()


@pytest_asyncio.fixture(scope="function")
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """Create test HTTP client."""
    
    async def override_get_db():
        yield db_session
    
    app.dependency_overrides[get_db] = override_get_db
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
    
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def test_user(db_session: AsyncSession) -> User:
    """Create a test user."""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=get_password_hash("testpassword123"),
        full_name="Test User",
        role=Role.USER,
        is_active=True,
        is_verified=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def test_admin(db_session: AsyncSession) -> User:
    """Create a test admin user."""
    admin = User(
        username="admin",
        email="admin@example.com",
        hashed_password=get_password_hash("adminpassword123"),
        full_name="Admin User",
        role=Role.ADMIN,
        is_active=True,
        is_verified=True,
    )
    db_session.add(admin)
    await db_session.commit()
    await db_session.refresh(admin)
    return admin


@pytest_asyncio.fixture
async def auth_headers(client: AsyncClient, test_user: User) -> dict:
    """Get authentication headers for test user."""
    response = await client.post(
        "/api/auth/login",
        json={
            "username": test_user.username,
            "password": "testpassword123"
        }
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def admin_auth_headers(client: AsyncClient, test_admin: User) -> dict:
    """Get authentication headers for admin user."""
    response = await client.post(
        "/api/auth/login",
        json={
            "username": test_admin.username,
            "password": "adminpassword123"
        }
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
