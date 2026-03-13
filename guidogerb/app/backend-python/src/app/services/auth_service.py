"""
Authentication service.
Replaces Spring Boot AuthService.
"""

from datetime import datetime
from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserCreate, Token, LoginRequest
from app.repositories.user_repository import UserRepository
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
)


class AuthService:
    """Authentication service."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
    
    async def register(self, user_data: UserCreate) -> User:
        """
        Register a new user.
        
        Args:
            user_data: User registration data
            
        Returns:
            Created user
            
        Raises:
            HTTPException: If username or email already exists
        """
        # Check if username exists
        if await self.user_repo.exists_by_username(user_data.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        # Check if email exists
        if await self.user_repo.exists_by_email(user_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create user
        user = User(
            username=user_data.username,
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=get_password_hash(user_data.password),
        )
        
        return await self.user_repo.create(user)
    
    async def authenticate(self, login_data: LoginRequest) -> Optional[User]:
        """
        Authenticate a user.
        
        Args:
            login_data: Login credentials
            
        Returns:
            User if authentication successful, None otherwise
        """
        # Try to find user by username or email
        user = await self.user_repo.get_by_username(login_data.username)
        if not user:
            user = await self.user_repo.get_by_email(login_data.username)
        
        if not user:
            return None
        
        # Verify password
        if not verify_password(login_data.password, user.hashed_password):
            return None
        
        # Update last login
        user.last_login = datetime.utcnow()
        await self.user_repo.update(user)
        
        return user
    
    async def login(self, login_data: LoginRequest) -> Token:
        """
        Login and generate tokens.
        
        Args:
            login_data: Login credentials
            
        Returns:
            Access and refresh tokens
            
        Raises:
            HTTPException: If authentication fails
        """
        user = await self.authenticate(login_data)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        # Create tokens
        access_token = create_access_token(data={"sub": user.id, "username": user.username})
        refresh_token = create_refresh_token(data={"sub": user.id})
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )
