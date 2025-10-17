"""Tests for blockchain functionality."""

import pytest
from app.models.block import Block
from app.models.blockchain import Blockchain


def test_block_creation():
    """Test creating a block."""
    block = Block(
        contract="Test vote",
        previous_block_hash="0000abc",
        validation_weight=4
    )
    
    assert block.contract == "Test vote"
    assert block.previous_block_hash == "0000abc"
    assert block.validation_weight == 4
    assert block.nonce == 0
    assert block.block_hash != ""


def test_block_hash_calculation():
    """Test block hash calculation."""
    block = Block(
        contract="Test",
        previous_block_hash="0",
        validation_weight=2
    )
    
    hash1 = block.calculate_block_hash()
    hash2 = block.calculate_block_hash()
    
    assert hash1 == hash2  # Hash should be deterministic


def test_block_validation():
    """Test proof-of-work validation."""
    block = Block(
        contract="Test vote",
        previous_block_hash="0",
        validation_weight=2  # Lower difficulty for faster test
    )
    
    block.validate_block()
    
    assert block.block_hash.startswith("00")
    assert block.is_valid()
    assert block.nonce > 0


def test_blockchain_initialization():
    """Test blockchain initialization with genesis block."""
    blockchain = Blockchain(difficulty=2)
    
    assert blockchain.get_chain_length() == 1
    assert blockchain.get_latest_block().contract == "Genesis Block"


def test_add_block_to_chain():
    """Test adding blocks to blockchain."""
    blockchain = Blockchain(difficulty=2)
    
    block1 = blockchain.add_block("Vote 1")
    assert blockchain.get_chain_length() == 2
    assert block1.contract == "Vote 1"
    
    block2 = blockchain.add_block("Vote 2")
    assert blockchain.get_chain_length() == 3
    assert block2.previous_block_hash == block1.block_hash


def test_blockchain_validation():
    """Test blockchain validation."""
    blockchain = Blockchain(difficulty=2)
    blockchain.add_block("Vote 1")
    blockchain.add_block("Vote 2")
    
    assert blockchain.is_chain_valid()


def test_blockchain_tampering_detection():
    """Test that tampering is detected."""
    blockchain = Blockchain(difficulty=2)
    blockchain.add_block("Vote 1")
    blockchain.add_block("Vote 2")
    
    # Tamper with a block
    blockchain.chain[1].contract = "Tampered vote"
    
    assert not blockchain.is_chain_valid()


def test_get_block_by_index():
    """Test getting block by index."""
    blockchain = Blockchain(difficulty=2)
    blockchain.add_block("Vote 1")
    
    block = blockchain.get_block_by_index(1)
    assert block is not None
    assert block.contract == "Vote 1"
    
    assert blockchain.get_block_by_index(999) is None


def test_get_block_by_hash():
    """Test getting block by hash."""
    blockchain = Blockchain(difficulty=2)
    block = blockchain.add_block("Vote 1")
    
    found_block = blockchain.get_block_by_hash(block.block_hash)
    assert found_block is not None
    assert found_block.contract == "Vote 1"
    
    assert blockchain.get_block_by_hash("nonexistent") is None


def test_blockchain_serialization():
    """Test blockchain to/from dict."""
    blockchain = Blockchain(difficulty=2)
    blockchain.add_block("Vote 1")
    blockchain.add_block("Vote 2")
    
    data = blockchain.to_dict()
    assert data["length"] == 3
    assert data["difficulty"] == 2
    assert len(data["chain"]) == 3
    
    # Test deserialization
    new_blockchain = Blockchain.from_dict(data)
    assert new_blockchain.get_chain_length() == 3
    assert new_blockchain.difficulty == 2
