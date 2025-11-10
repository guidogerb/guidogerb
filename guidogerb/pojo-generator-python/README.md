# POJO/Model Generator Service (Python/FastAPI)

**Port:** 8086  
**Status:** ✅ Basic Implementation / 🚧 Needs Enhancement  
**Converted from:** Java Spring Boot Application

## 📋 Overview

The Model Generator service provides code generation utilities for creating data models (Pydantic, SQLAlchemy, TypeScript interfaces, etc.) from specifications or existing schemas.

## 🎯 Features

### Implemented ✅
- **Pydantic Model Generation**
  - Generate Pydantic models from field specifications
  - Support for basic Python types
  - Optional field handling
  - Jinja2 template-based generation

- **API Endpoints**
  - POST /api/generate/pydantic - Generate Pydantic model

### Missing Features 🚧
- SQLAlchemy model generation
- TypeScript interface generation
- JSON Schema generation
- Database schema to model generation
- OpenAPI schema to model generation
- Model generation from examples
- Relationship handling (ForeignKey, OneToMany, etc.)
- Validation rules generation
- Multiple language support (Java, Go, Rust)
- Custom templates support
- Bulk generation

## 🏗️ Architecture

```
pojo-generator-python/
├── src/app/
│   ├── main.py       # FastAPI app with basic generator
│   └── __init__.py
└── pyproject.toml
```

## 🚀 Getting Started

```bash
cd guidogerb/pojo-generator-python
poetry install
poetry run uvicorn app.main:app --reload --port 8086
```

## 📚 API Usage

### Generate Pydantic Model
```bash
curl -X POST http://localhost:8086/api/generate/pydantic \
  -H "Content-Type: application/json" \
  -d '{
    "class_name": "User",
    "fields": [
      {"name": "id", "type": "int", "nullable": false},
      {"name": "username", "type": "str", "nullable": false},
      {"name": "email", "type": "str", "nullable": true}
    ]
  }'
```

**Response:**
```python
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    username: str
    email: Optional[str]
```

## 🐛 Known Issues

See `tasks.md` for detailed improvements.

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java POJO Generator (Historical)](../../../docs/services/java/pojo-generator.md)
