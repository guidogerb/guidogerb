"""Application configuration."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Config(BaseSettings):
    """Application configuration."""
    
    # Service
    app_name: str = "Filesystem Utility"
    app_version: str = "0.1.0"
    
    # Database
    database_url: str = "postgresql+asyncpg://user:pass@localhost/fsutil"
    
    # Redis
    redis_host: str = "localhost"
    redis_port: int = 6379
    
    # Scanning defaults
    default_scan_path: str = "/home/user/files"
    default_linux_base: str = "/mnt/files"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_config() -> Config:
    """Get cached configuration."""
    return Config()
