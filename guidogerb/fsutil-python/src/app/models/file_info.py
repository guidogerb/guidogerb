"""
SQLAlchemy models for filesystem indexer.
"""

from sqlalchemy import String, Integer, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from datetime import datetime
from typing import Optional


class Base(DeclarativeBase):
    pass


class Exts(Base):
    """File extension catalog."""
    
    __tablename__ = "exts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ext: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(500), default="")
    
    # Relationship
    files: Mapped[list["FileInfo"]] = relationship(back_populates="ext_obj")


class FileInfo(Base):
    """File metadata information."""
    
    __tablename__ = "file_info"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    file_name: Mapped[str] = mapped_column(String(500), nullable=False)
    moved_to_file_location: Mapped[Optional[str]] = mapped_column(String(1000), unique=True)
    original_linux_file_location: Mapped[Optional[str]] = mapped_column(String(1000), unique=True)
    original_windows_file_location: Mapped[Optional[str]] = mapped_column(String(1000), unique=True)
    sha_hash: Mapped[Optional[str]] = mapped_column(String(64))
    file_size: Mapped[Optional[int]] = mapped_column(BigInteger)
    created: Mapped[Optional[datetime]] = mapped_column(DateTime)
    modified: Mapped[Optional[datetime]] = mapped_column(DateTime)
    accessed: Mapped[Optional[datetime]] = mapped_column(DateTime)
    
    # Foreign key
    ext_id: Mapped[Optional[int]] = mapped_column(ForeignKey("exts.id"))
    
    # Relationship
    ext_obj: Mapped[Optional["Exts"]] = relationship(back_populates="files")
