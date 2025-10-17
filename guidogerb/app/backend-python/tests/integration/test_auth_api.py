"""
Integration tests for authentication API.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register_endpoint(client: AsyncClient):
    """Test user registration endpoint."""
    response = await client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "full_name": "New User"
        }
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "newuser"
    assert data["email"] == "newuser@example.com"
    assert "hashed_password" not in data


@pytest.mark.asyncio
async def test_login_endpoint(client: AsyncClient, test_user):
    """Test login endpoint."""
    response = await client.post(
        "/api/auth/login",
        json={
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient, test_user):
    """Test login with wrong password."""
    response = await client.post(
        "/api/auth/login",
        json={
            "username": "testuser",
            "password": "wrongpassword"
        }
    )
    
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_current_user(client: AsyncClient, auth_headers):
    """Test get current user endpoint."""
    response = await client.get("/api/auth/me", headers=auth_headers)
    
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_get_current_user_unauthorized(client: AsyncClient):
    """Test get current user without auth."""
    response = await client.get("/api/auth/me")
    
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_logout_endpoint(client: AsyncClient, auth_headers):
    """Test logout endpoint."""
    response = await client.post("/api/auth/logout", headers=auth_headers)
    
    assert response.status_code == 200
    assert "message" in response.json()
