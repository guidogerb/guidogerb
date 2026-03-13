"""
User repository for database operations.
Replaces Spring Data JPA Repository pattern.
"""

from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User


class UserRepository:
    """User repository for database operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID."""
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()
    
    async def get_by_username(self, username: str) -> Optional[User]:
        """Get user by username."""
        result = await self.db.execute(
            select(User).where(User.username == username)
        )
        return result.scalar_one_or_none()
    
    async def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    async def get_all(self, skip: int = 0, limit: int = 100) -> List[User]:
        """Get all users with pagination."""
        result = await self.db.execute(
            select(User).offset(skip).limit(limit)
        )
        return list(result.scalars().all())
    
    async def create(self, user: User) -> User:
        """Create a new user."""
        self.db.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return user
    
    async def update(self, user: User) -> User:
        """Update an existing user."""
        await self.db.flush()
        await self.db.refresh(user)
        return user
    
    async def delete(self, user: User) -> None:
        """Delete a user."""
        await self.db.delete(user)
        await self.db.flush()
    
    async def exists_by_username(self, username: str) -> bool:
        """Check if username exists."""
        result = await self.db.execute(
            select(User.id).where(User.username == username)
        )
        return result.scalar_one_or_none() is not None
    
    async def exists_by_email(self, email: str) -> bool:
        """Check if email exists."""
        result = await self.db.execute(
            select(User.id).where(User.email == email)
        )
        return result.scalar_one_or_none() is not None
