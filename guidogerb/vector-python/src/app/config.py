"""
Vector database service with ChromaDB.
"""

import chromadb
from chromadb.config import Settings
from pydantic_settings import BaseSettings
from functools import lru_cache


class Config(BaseSettings):
    """Application configuration."""
    
    # Service
    app_name: str = "Vector Database Service"
    app_version: str = "0.1.0"
    
    # ChromaDB
    chroma_host: str = "localhost"
    chroma_port: int = 8000
    chroma_collection: str = "documents"
    
    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-3.5-turbo"
    openai_embedding_model: str = "text-embedding-ada-002"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_config() -> Config:
    """Get cached configuration."""
    return Config()


def get_chroma_client():
    """Get ChromaDB client."""
    config = get_config()
    
    client = chromadb.HttpClient(
        host=config.chroma_host,
        port=config.chroma_port,
        settings=Settings(
            anonymized_telemetry=False
        )
    )
    
    return client


def get_collection():
    """Get or create ChromaDB collection."""
    client = get_chroma_client()
    config = get_config()
    
    collection = client.get_or_create_collection(
        name=config.chroma_collection,
        metadata={"description": "Document embeddings"}
    )
    
    return collection
