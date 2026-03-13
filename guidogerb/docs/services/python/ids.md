# IDS - Identity and Database Normalization

Database Normal Form 7 (dbNF7) research implementation.

## Features

- ✅ Custom normalization algorithms
- ✅ BitArray operations
- ✅ B-Tree indexing
- ✅ Hash utilities
- ✅ Research framework

## Quick Start

```bash
poetry install
poetry run uvicorn app.main:app --reload --port 8087
```

## API

- `POST /api/normalize` - Normalize database schema
- `GET /api/analyze` - Analyze normalization level
