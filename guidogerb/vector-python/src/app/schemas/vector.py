"""
Pydantic schemas for vector API.
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class DocumentRequest(BaseModel):
    """Schema for adding a document."""
    text: str = Field(..., description="Document text content")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Optional metadata")


class DocumentResponse(BaseModel):
    """Schema for document response."""
    ids: List[str]
    message: str


class SearchRequest(BaseModel):
    """Schema for search request."""
    query: str = Field(..., description="Search query")
    n_results: int = Field(5, ge=1, le=50, description="Number of results")
    where: Optional[Dict[str, Any]] = Field(None, description="Metadata filter")


class SearchResult(BaseModel):
    """Schema for a single search result."""
    id: str
    document: str
    metadata: Dict[str, Any]
    distance: float


class SearchResponse(BaseModel):
    """Schema for search results."""
    results: List[SearchResult]
    query: str


class CollectionStats(BaseModel):
    """Schema for collection statistics."""
    name: str
    count: int
    metadata: Dict[str, Any]


class DeleteRequest(BaseModel):
    """Schema for delete request."""
    ids: List[str] = Field(..., description="Document IDs to delete")


class SuccessResponse(BaseModel):
    """Generic success response."""
    success: bool
    message: str
