"""
Blockchain implementation for voting system.
"""

import json
from typing import List, Optional
from app.models.block import Block


class Blockchain:
    """
    Blockchain for secure voting records.
    """
    
    def __init__(self, difficulty: int = 4):
        """
        Initialize blockchain with genesis block.
        
        Args:
            difficulty: Proof-of-work difficulty (number of leading zeros)
        """
        self.chain: List[Block] = []
        self.difficulty = difficulty
        self._create_genesis_block()
    
    def _create_genesis_block(self) -> None:
        """Create the first block in the chain."""
        genesis_block = Block(
            contract="Genesis Block",
            previous_block_hash="0",
            validation_weight=self.difficulty
        )
        genesis_block.validate_block()
        self.chain.append(genesis_block)
    
    def get_latest_block(self) -> Block:
        """Get the most recent block in the chain."""
        return self.chain[-1]
    
    def add_block(self, contract: str) -> Block:
        """
        Add a new block to the chain.
        
        Args:
            contract: The data to store in the block (e.g., vote record)
            
        Returns:
            The newly created and validated block
        """
        previous_block = self.get_latest_block()
        new_block = Block(
            contract=contract,
            previous_block_hash=previous_block.block_hash,
            validation_weight=self.difficulty
        )
        new_block.validate_block()
        self.chain.append(new_block)
        return new_block
    
    def is_chain_valid(self) -> bool:
        """
        Validate the entire blockchain.
        
        Returns:
            True if chain is valid, False otherwise
        """
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            
            # Check if current block hash is valid
            if current_block.block_hash != current_block.calculate_block_hash():
                return False
            
            # Check if current block has valid proof-of-work
            if not current_block.is_valid():
                return False
            
            # Check if previous hash matches
            if current_block.previous_block_hash != previous_block.block_hash:
                return False
        
        return True
    
    def get_chain_length(self) -> int:
        """Get the number of blocks in the chain."""
        return len(self.chain)
    
    def to_dict(self) -> dict:
        """Convert blockchain to dictionary for JSON serialization."""
        return {
            "chain": [block.to_dict() for block in self.chain],
            "difficulty": self.difficulty,
            "length": len(self.chain)
        }
    
    def to_json(self) -> str:
        """Convert blockchain to JSON string."""
        return json.dumps(self.to_dict(), indent=2)
    
    @classmethod
    def from_dict(cls, data: dict) -> "Blockchain":
        """Create blockchain from dictionary."""
        blockchain = cls.__new__(cls)
        blockchain.difficulty = data.get("difficulty", 4)
        blockchain.chain = [Block.from_dict(block_data) for block_data in data["chain"]]
        return blockchain
    
    def get_block_by_hash(self, block_hash: str) -> Optional[Block]:
        """Find a block by its hash."""
        for block in self.chain:
            if block.block_hash == block_hash:
                return block
        return None
    
    def get_block_by_index(self, index: int) -> Optional[Block]:
        """Get block by index in the chain."""
        if 0 <= index < len(self.chain):
            return self.chain[index]
        return None
