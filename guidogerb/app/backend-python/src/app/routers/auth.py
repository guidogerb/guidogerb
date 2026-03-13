"""
Authentication router.
Replaces Spring Boot AuthController.
"""

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.user import (
    User as UserSchema,
    RegisterRequest,
    LoginRequest,
    Token,
)
from app.services.auth_service import AuthService
from app.core.dependencies import get_current_active_user


router = APIRouter()


@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: RegisterRequest,
    db: Annotated[AsyncSession, Depends(get_db)]
):
    """
    Register a new user.
    
    - **username**: Unique username (3-50 characters)
    - **email**: Valid email address
    - **password**: Password (minimum 8 characters)
    - **full_name**: Optional full name
    """
    auth_service = AuthService(db)
    user = await auth_service.register(user_data)
    return user


@router.post("/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: Annotated[AsyncSession, Depends(get_db)]
):
    """
    Login and receive access token.
    
    - **username**: Username or email
    - **password**: User password
    
    Returns access_token and refresh_token for authentication.
    """
    auth_service = AuthService(db)
    return await auth_service.login(login_data)


@router.get("/me", response_model=UserSchema)
async def get_current_user_info(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    """
    Get current user information.
    
    Requires valid access token in Authorization header.
    """
    return current_user


@router.post("/logout")
async def logout(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    """
    Logout current user.
    
    In a production app, you would invalidate the token here
    (e.g., add to blacklist in Redis).
    """
    return {"message": "Successfully logged out"}
