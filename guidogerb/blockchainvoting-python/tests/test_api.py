"""Tests for blockchain API endpoints."""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "Blockchain Voting System API" in response.json()["message"]


def test_health_endpoint():
    """Test health check."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_cast_vote():
    """Test voting endpoint."""
    vote_data = {
        "voter_id": "voter123",
        "candidate": "Candidate A",
        "election_id": "election2025"
    }
    
    response = client.post("/api/blockchain/vote", json=vote_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["success"] is True
    assert "block_hash" in data
    assert data["block_index"] > 0


def test_get_chain():
    """Test getting the blockchain."""
    response = client.get("/api/blockchain/chain")
    assert response.status_code == 200
    
    data = response.json()
    assert "length" in data
    assert "blocks" in data
    assert data["length"] > 0
    assert len(data["blocks"]) == data["length"]


def test_validate_chain():
    """Test chain validation endpoint."""
    response = client.get("/api/blockchain/chain/validate")
    assert response.status_code == 200
    
    data = response.json()
    assert "is_valid" in data
    assert data["is_valid"] is True


def test_get_stats():
    """Test statistics endpoint."""
    response = client.get("/api/blockchain/stats")
    assert response.status_code == 200
    
    data = response.json()
    assert "total_blocks" in data
    assert "difficulty" in data
    assert "is_valid" in data
    assert data["total_blocks"] > 0


def test_get_block_by_index():
    """Test getting block by index."""
    # First, ensure there's at least one block beyond genesis
    client.post("/api/blockchain/vote", json={
        "voter_id": "test",
        "candidate": "Test",
        "election_id": "test"
    })
    
    response = client.get("/api/blockchain/block/1")
    assert response.status_code == 200
    
    data = response.json()
    assert "block_hash" in data
    assert "contract" in data


def test_get_nonexistent_block():
    """Test getting non-existent block."""
    response = client.get("/api/blockchain/block/99999")
    assert response.status_code == 404
