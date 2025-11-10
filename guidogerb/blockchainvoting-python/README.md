# Blockchain Voting Service (Python/FastAPI)

**Port:** 8081  
**Status:** ✅ Functional Core / 🚧 Missing Features  
**Converted from:** Java Spring Boot Application

## 📋 Overview

The Blockchain Voting service implements a secure, tamper-proof voting system using blockchain technology. Each vote is recorded as a block in an immutable chain, ensuring transparency and preventing fraud.

## 🎯 Features

### Implemented ✅
- **Blockchain Core**
  - Proof-of-Work (PoW) consensus mechanism
  - SHA-256 block hashing
  - Chain validation and integrity checking
  - Configurable mining difficulty
  - Genesis block initialization

- **Voting System**
  - Cast votes stored as blockchain blocks
  - Unique voter ID validation
  - Election ID support for multiple elections
  - Vote immutability and auditability

- **API Endpoints**
  - POST /api/blockchain/vote - Cast a vote
  - GET /api/blockchain/chain - View entire blockchain
  - GET /api/blockchain/chain/validate - Validate chain integrity
  - GET /api/blockchain/block/{index} - Get block by index
  - GET /api/blockchain/block/hash/{hash} - Get block by hash

- **Testing**
  - Unit tests for blockchain operations
  - Integration tests for API endpoints

### Missing / In Development 🚧
- **Critical Missing Features:**
  - Database persistence (currently in-memory only)
  - Vote anonymization/encryption
  - Voter authentication and authorization
  - Duplicate vote prevention per voter per election
  - Vote counting and results aggregation
  - Multi-node consensus (decentralization)
  - Network peer-to-peer communication

- **Important Missing Features:**
  - Election management (create, start, end, configure)
  - Voter registration system
  - Admin dashboard for election monitoring
  - Real-time vote counting
  - Result verification and audit trails
  - Vote receipt generation for voters

## 🏗️ Architecture

```
blockchainvoting-python/
├── src/app/
│   ├── main.py                   # FastAPI application
│   ├── models/
│   │   ├── block.py              # Block implementation
│   │   └── blockchain.py         # Blockchain implementation
│   ├── schemas/
│   │   └── blockchain.py         # Pydantic request/response schemas
│   └── routers/
│       └── blockchain.py         # API endpoints
├── tests/
│   ├── test_blockchain.py        # Unit tests
│   └── test_api.py               # Integration tests
├── pyproject.toml                # Dependencies
└── Dockerfile                    # Container configuration
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Docker (optional)

### Installation

#### Using Docker
```bash
cd guidogerb/blockchainvoting-python
docker build -t blockchainvoting .
docker run -p 8081:8081 blockchainvoting
```

#### Using Poetry
```bash
cd guidogerb/blockchainvoting-python
poetry install
poetry run uvicorn app.main:app --reload --port 8081
```

### Environment Variables

Currently minimal configuration needed:
```env
PORT=8081
DIFFICULTY=4  # Mining difficulty (number of leading zeros)
```

## 📚 API Usage Examples

### Cast a Vote
```bash
curl -X POST "http://localhost:8081/api/blockchain/vote" \
  -H "Content-Type: application/json" \
  -d '{
    "voter_id": "voter123",
    "candidate": "Alice",
    "election_id": "election2025"
  }'
```

### Get Blockchain
```bash
curl "http://localhost:8081/api/blockchain/chain"
```

### Validate Chain Integrity
```bash
curl "http://localhost:8081/api/blockchain/chain/validate"
```

### Get Specific Block
```bash
curl "http://localhost:8081/api/blockchain/block/1"
```

## 🔐 How It Works

### Block Structure
Each vote creates a new block with:
- **Contract:** Vote data (voter_id, candidate, election_id)
- **Previous Hash:** Hash of the previous block (links blocks together)
- **Timestamp:** When the vote was cast
- **Nonce:** Number used in proof-of-work mining
- **Block Hash:** SHA-256 hash of block contents
- **Validation Weight:** Mining difficulty

### Proof-of-Work
The system uses proof-of-work to prevent tampering:
1. When a vote is cast, a new block is created
2. The system tries different nonce values until the block hash starts with N zeros (difficulty)
3. This computational work makes it expensive to tamper with the chain
4. Any change to a block invalidates all subsequent blocks

### Chain Validation
The blockchain validates by checking:
- Each block's hash matches its calculated hash
- Each block's previous_hash matches the previous block's hash
- Each block meets the proof-of-work difficulty requirement

## 🧪 Testing

```bash
# Run all tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=app --cov-report=html

# Run specific test file
poetry run pytest tests/test_blockchain.py
```

## ⚠️ Limitations & Warnings

### **NOT PRODUCTION READY**
This implementation is a proof-of-concept with significant limitations:

1. **No Persistence:** Blockchain is stored in-memory and lost on restart
2. **Single Node:** No network distribution or consensus among multiple nodes
3. **No Authentication:** Anyone can cast votes, no voter verification
4. **No Anonymity:** Votes are not encrypted or anonymized
5. **No Duplicate Prevention:** Same voter can vote multiple times
6. **No Election Management:** Cannot create, configure, or close elections
7. **Performance:** Proof-of-work slows down vote casting (intentional but may need tuning)

## 📊 Performance

- **Vote Processing:** 1-5 seconds per vote (depends on difficulty)
- **Chain Validation:** O(n) complexity, fast for reasonable chain lengths
- **Memory Usage:** ~1KB per block (grows with votes)

**Difficulty Impact:**
- Difficulty 4 (0000): ~1-2 seconds per block
- Difficulty 5 (00000): ~10-30 seconds per block
- Difficulty 6 (000000): ~2-5 minutes per block

## 🐛 Known Issues

See `tasks.md` for detailed list of required implementations and improvements.

## 🔒 Security Considerations

**Current Security Features:**
- Tamper-proof chain via cryptographic hashing
- Proof-of-work makes tampering computationally expensive
- Chain validation detects any modifications

**Security Gaps (Must Address for Production):**
- No voter authentication
- No vote encryption/anonymization
- No protection against double voting
- Centralized single-node architecture
- No secure key management

## 🤝 Contributing

1. Address critical missing features first (see tasks.md)
2. Add tests for new features
3. Update this README with new functionality
4. Run linters: `ruff check .` and `black .`

## 📝 Conversion Notes

Converted from Java Spring Boot:
- Block.java → block.py (dataclass)
- Blockchain.java → blockchain.py
- Spring Controllers → FastAPI routers
- In-memory storage retained (needs database implementation)

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java Blockchain (Historical)](../../../docs/services/java/blockchainvoting.md)
- [Blockchain Research Papers](../../../docs/research/)
