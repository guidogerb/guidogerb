"""
BitArray implementation for IDS system.
"""

from bitarray import bitarray
import numpy as np


class BitArray:
    """Custom BitArray implementation for database indexing."""
    
    def __init__(self, size: int = 0):
        self.bits = bitarray(size)
        self.bits.setall(0)
    
    def set(self, index: int, value: bool = True):
        """Set bit at index."""
        if index < len(self.bits):
            self.bits[index] = value
    
    def get(self, index: int) -> bool:
        """Get bit at index."""
        if index < len(self.bits):
            return self.bits[index]
        return False
    
    def count(self) -> int:
        """Count set bits."""
        return self.bits.count()
    
    def to_bytes(self) -> bytes:
        """Convert to bytes."""
        return self.bits.tobytes()
    
    @classmethod
    def from_bytes(cls, data: bytes) -> "BitArray":
        """Create from bytes."""
        ba = cls()
        ba.bits = bitarray()
        ba.bits.frombytes(data)
        return ba
