"""
Blockchain voting API routes.
"""

from fastapi import APIRouter, HTTPException, Depends
from app.models.blockchain import Blockchain
from app.schemas.blockchain import (
    VoteRequest,
    VoteResponse,
    BlockResponse,
    ChainResponse,
    ChainValidationResponse
)

router = APIRouter()

# In-memory blockchain (in production, this would be persisted)
_blockchain = Blockchain(difficulty=4)


def get_blockchain() -> Blockchain:
    """Dependency to get blockchain instance."""
    return _blockchain


@router.post("/vote", response_model=VoteResponse)
async def cast_vote(
    vote: VoteRequest,
    blockchain: Blockchain = Depends(get_blockchain)
):
    """
    Cast a vote and add it to the blockchain.
    
    - **voter_id**: Unique identifier for the voter
    - **candidate**: Candidate being voted for
    - **election_id**: Election identifier
    """
    # Create vote contract
    contract = f"Vote: {vote.voter_id} voted for {vote.candidate} in election {vote.election_id}"
    
    # Add block to chain
    block = blockchain.add_block(contract)
    
    return VoteResponse(
        success=True,
        block_hash=block.block_hash,
        block_index=blockchain.get_chain_length() - 1,
        message="Vote recorded successfully"
    )


@router.get("/chain", response_model=ChainResponse)
async def get_chain(blockchain: Blockchain = Depends(get_blockchain)):
    """
    Get the entire blockchain.
    """
    blocks = [
        BlockResponse(**block.to_dict())
        for block in blockchain.chain
    ]
    
    return ChainResponse(
        length=blockchain.get_chain_length(),
        difficulty=blockchain.difficulty,
        is_valid=blockchain.is_chain_valid(),
        blocks=blocks
    )


@router.get("/chain/validate", response_model=ChainValidationResponse)
async def validate_chain(blockchain: Blockchain = Depends(get_blockchain)):
    """
    Validate the integrity of the blockchain.
    """
    is_valid = blockchain.is_chain_valid()
    
    return ChainValidationResponse(
        is_valid=is_valid,
        message="Blockchain is valid" if is_valid else "Blockchain has been tampered with"
    )


@router.get("/block/{block_index}", response_model=BlockResponse)
async def get_block(
    block_index: int,
    blockchain: Blockchain = Depends(get_blockchain)
):
    """
    Get a specific block by index.
    """
    block = blockchain.get_block_by_index(block_index)
    
    if not block:
        raise HTTPException(status_code=404, detail="Block not found")
    
    return BlockResponse(**block.to_dict())


@router.get("/block/hash/{block_hash}", response_model=BlockResponse)
async def get_block_by_hash(
    block_hash: str,
    blockchain: Blockchain = Depends(get_blockchain)
):
    """
    Get a specific block by its hash.
    """
    block = blockchain.get_block_by_hash(block_hash)
    
    if not block:
        raise HTTPException(status_code=404, detail="Block not found")
    
    return BlockResponse(**block.to_dict())


@router.get("/stats")
async def get_stats(blockchain: Blockchain = Depends(get_blockchain)):
    """
    Get blockchain statistics.
    """
    return {
        "total_blocks": blockchain.get_chain_length(),
        "difficulty": blockchain.difficulty,
        "is_valid": blockchain.is_chain_valid(),
        "latest_block_hash": blockchain.get_latest_block().block_hash
    }
