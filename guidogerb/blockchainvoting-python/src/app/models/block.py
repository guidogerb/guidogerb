"""
Blockchain Block implementation.
Converted from Java Block.java
"""

import hashlib
import time
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Block:
    """
    Represents a block in the blockchain.
    
    Attributes:
        contract: The data/content stored in this block
        previous_block_hash: Hash of the previous block
        timestamp: When the block was created
        nonce: Number used in proof-of-work mining
        block_hash: Hash of this block
        validation_weight: Difficulty of proof-of-work (number of leading zeros)
    """
    
    contract: str
    previous_block_hash: str
    timestamp: float = field(default_factory=time.time)
    nonce: int = 0
    block_hash: str = ""
    validation_weight: int = 4
    
    def __post_init__(self):
        """Calculate initial block hash after initialization."""
        if not self.block_hash:
            self.block_hash = self.calculate_block_hash()
    
    def calculate_block_hash(self) -> str:
        """
        Calculate the SHA-256 hash of the block.
        
        Returns:
            Hexadecimal string representation of the block hash
        """
        block_data = f"{self.contract}{self.previous_block_hash}{self.timestamp}{self.nonce}"
        sha256 = hashlib.sha256()
        sha256.update(block_data.encode('utf-8'))
        return sha256.hexdigest()
    
    def validate_block(self) -> str:
        """
        Mine the block by finding a valid hash (proof-of-work).
        Keeps incrementing nonce until hash starts with required number of zeros.
        
        Returns:
            The valid block hash
        """
        required_prefix = '0' * self.validation_weight
        
        while not self.block_hash.startswith(required_prefix):
            self.nonce += 1
            self.block_hash = self.calculate_block_hash()
        
        return self.block_hash
    
    def is_valid(self) -> bool:
        """Check if block hash is valid (has required leading zeros)."""
        required_prefix = '0' * self.validation_weight
        return self.block_hash.startswith(required_prefix)
    
    def to_dict(self) -> dict:
        """Convert block to dictionary for JSON serialization."""
        return {
            "contract": self.contract,
            "previous_block_hash": self.previous_block_hash,
            "timestamp": self.timestamp,
            "nonce": self.nonce,
            "block_hash": self.block_hash,
            "validation_weight": self.validation_weight
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> "Block":
        """Create block from dictionary."""
        return cls(
            contract=data["contract"],
            previous_block_hash=data["previous_block_hash"],
            timestamp=data.get("timestamp", time.time()),
            nonce=data.get("nonce", 0),
            block_hash=data.get("block_hash", ""),
            validation_weight=data.get("validation_weight", 4)
        )
    
    def __repr__(self) -> str:
        return f"Block(hash={self.block_hash[:16]}..., nonce={self.nonce})"
