"""
Unit tests for authentication service.
"""

import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, LoginRequest
from app.models.user import User
from fastapi import HTTPException


@pytest.mark.asyncio
async def test_register_user(db_session: AsyncSession):
    """Test user registration."""
    auth_service = AuthService(db_session)
    
    user_data = UserCreate(
        username="newuser",
        email="newuser@example.com",
        password="password123",
        full_name="New User"
    )
    
    user = await auth_service.register(user_data)
    
    assert user.username == "newuser"
    assert user.email == "newuser@example.com"
    assert user.full_name == "New User"
    assert user.hashed_password != "password123"  # Should be hashed


@pytest.mark.asyncio
async def test_register_duplicate_username(db_session: AsyncSession, test_user: User):
    """Test registration with duplicate username."""
    auth_service = AuthService(db_session)
    
    user_data = UserCreate(
        username=test_user.username,
        email="different@example.com",
        password="password123"
    )
    
    with pytest.raises(HTTPException) as exc_info:
        await auth_service.register(user_data)
    
    assert exc_info.value.status_code == 400
    assert "username already registered" in exc_info.value.detail.lower()


@pytest.mark.asyncio
async def test_register_duplicate_email(db_session: AsyncSession, test_user: User):
    """Test registration with duplicate email."""
    auth_service = AuthService(db_session)
    
    user_data = UserCreate(
        username="differentuser",
        email=test_user.email,
        password="password123"
    )
    
    with pytest.raises(HTTPException) as exc_info:
        await auth_service.register(user_data)
    
    assert exc_info.value.status_code == 400
    assert "email already registered" in exc_info.value.detail.lower()


@pytest.mark.asyncio
async def test_authenticate_success(db_session: AsyncSession, test_user: User):
    """Test successful authentication."""
    auth_service = AuthService(db_session)
    
    login_data = LoginRequest(
        username=test_user.username,
        password="testpassword123"
    )
    
    user = await auth_service.authenticate(login_data)
    
    assert user is not None
    assert user.id == test_user.id
    assert user.username == test_user.username


@pytest.mark.asyncio
async def test_authenticate_wrong_password(db_session: AsyncSession, test_user: User):
    """Test authentication with wrong password."""
    auth_service = AuthService(db_session)
    
    login_data = LoginRequest(
        username=test_user.username,
        password="wrongpassword"
    )
    
    user = await auth_service.authenticate(login_data)
    
    assert user is None


@pytest.mark.asyncio
async def test_authenticate_nonexistent_user(db_session: AsyncSession):
    """Test authentication with non-existent user."""
    auth_service = AuthService(db_session)
    
    login_data = LoginRequest(
        username="nonexistent",
        password="password123"
    )
    
    user = await auth_service.authenticate(login_data)
    
    assert user is None


@pytest.mark.asyncio
async def test_login_success(db_session: AsyncSession, test_user: User):
    """Test successful login and token generation."""
    auth_service = AuthService(db_session)
    
    login_data = LoginRequest(
        username=test_user.username,
        password="testpassword123"
    )
    
    token = await auth_service.login(login_data)
    
    assert token.access_token is not None
    assert token.refresh_token is not None
    assert token.token_type == "bearer"


@pytest.mark.asyncio
async def test_login_inactive_user(db_session: AsyncSession, test_user: User):
    """Test login with inactive user."""
    auth_service = AuthService(db_session)
    
    # Deactivate user
    test_user.is_active = False
    await db_session.commit()
    
    login_data = LoginRequest(
        username=test_user.username,
        password="testpassword123"
    )
    
    with pytest.raises(HTTPException) as exc_info:
        await auth_service.login(login_data)
    
    assert exc_info.value.status_code == 400
    assert "inactive user" in exc_info.value.detail.lower()
