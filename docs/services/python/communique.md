# Communique - OpenAI Service

Python OpenAI API service with request/response logging.

## Features

- ✅ OpenAI chat completions
- ✅ Request/response logging
- ✅ Model management
- ✅ Async FastAPI
- ✅ PostgreSQL persistence

## Quick Start

```bash
poetry install
echo "OPENAI_API_KEY=sk-..." > .env
poetry run uvicorn app.main:app --reload --port 8084
```

## API

- `POST /api/chat/completions` - Chat completion
- `GET /api/models` - List models
- `GET /api/history` - Request history

## Docker

```bash
docker-compose up -d
```
