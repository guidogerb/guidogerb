"""
Pydantic schemas for blockchain voting API.
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class VoteRequest(BaseModel):
    """Schema for submitting a vote."""
    voter_id: str = Field(..., description="Unique identifier for voter")
    candidate: str = Field(..., description="Candidate name or ID")
    election_id: str = Field(..., description="Election identifier")
    

class VoteResponse(BaseModel):
    """Schema for vote confirmation."""
    success: bool
    block_hash: str
    block_index: int
    message: str


class BlockResponse(BaseModel):
    """Schema for block information."""
    contract: str
    previous_block_hash: str
    timestamp: float
    nonce: int
    block_hash: str
    validation_weight: int


class ChainResponse(BaseModel):
    """Schema for blockchain information."""
    length: int
    difficulty: int
    is_valid: bool
    blocks: List[BlockResponse]


class ChainValidationResponse(BaseModel):
    """Schema for chain validation result."""
    is_valid: bool
    message: str
