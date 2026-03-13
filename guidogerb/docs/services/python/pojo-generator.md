# Model Generator

Generate Pydantic and SQLAlchemy models from schemas.

## Features

- ✅ Pydantic model generation
- ✅ SQLAlchemy model generation
- ✅ Template-based code generation
- ✅ REST API

## Quick Start

```bash
poetry install
poetry run uvicorn app.main:app --reload --port 8086
```

## API

- `POST /api/generate/pydantic` - Generate Pydantic model
- `POST /api/generate/sqlalchemy` - Generate SQLAlchemy model
