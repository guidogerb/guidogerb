# Blockchain Voting System

Python implementation of a blockchain-based voting system, converted from Spring Boot.

## Features

- ✅ Proof-of-work blockchain implementation
- ✅ Secure vote recording
- ✅ Blockchain validation
- ✅ RESTful API
- ✅ FastAPI with automatic documentation

## Quick Start

```bash
# Install dependencies
poetry install

# Run the application
poetry run uvicorn app.main:app --reload --port 8081

# Access API docs
open http://localhost:8081/docs
```

## API Endpoints

- `POST /api/blockchain/vote` - Cast a vote
- `GET /api/blockchain/chain` - Get entire blockchain
- `GET /api/blockchain/validate` - Validate blockchain
- `GET /api/blockchain/block/{index}` - Get block by index
- `GET /api/blockchain/stats` - Get blockchain statistics

## Docker

```bash
docker build -t blockchainvoting:latest .
docker run -p 8081:8081 blockchainvoting:latest
```

## Example Usage

```python
import requests

# Cast a vote
response = requests.post("http://localhost:8081/api/blockchain/vote", json={
    "voter_id": "voter123",
    "candidate": "Candidate A",
    "election_id": "election2025"
})

# Get blockchain
chain = requests.get("http://localhost:8081/api/blockchain/chain")
print(chain.json())
```
