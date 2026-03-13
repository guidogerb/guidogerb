# Bridge Gateway Application

Multi-database bridge and gateway service.

## Features

- ✅ Multi-database connections (PostgreSQL, MySQL, SQL Server)
- ✅ Dynamic query execution
- ✅ Connection pooling
- ✅ RESTful API

## Quick Start

```bash
poetry install
poetry run uvicorn app.main:app --reload --port 8085
```

## API

- `POST /api/execute` - Execute query
- `GET /api/databases` - List databases
