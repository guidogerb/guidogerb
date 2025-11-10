# Communique Service (Python/FastAPI)

**Port:** 8084  
**Status:** ✅ Basic Implementation / 🚧 Needs Enhancement  
**Converted from:** Java Spring Boot Application

## 📋 Overview

Communique is an AI-powered communication service that provides a proxy/wrapper around OpenAI's API with added features for chat completions, model management, and conversational AI.

## 🎯 Features

### Implemented ✅
- **OpenAI Integration**
  - Chat completions endpoint (proxy to OpenAI)
  - Model listing
  - Configurable model and temperature
  - Message history support

- **API Endpoints**
  - POST /api/chat/completions - Chat with GPT models
  - GET /api/models - List available OpenAI models

### Missing Features 🚧
- Conversation persistence (chat history)
- User authentication and API key management
- Usage tracking and rate limiting
- Streaming responses
- Function calling support
- Prompt templates and management
- Cost tracking and budgets
- Multi-provider support (Anthropic, Cohere, etc.)
- Response caching
- Content moderation
- Embeddings endpoint

## 🏗️ Architecture

```
communique-python/
├── src/app/
│   ├── main.py                   # FastAPI application
│   └── routers/
│       └── openai.py             # OpenAI proxy endpoints
├── pyproject.toml                # Dependencies
└── Dockerfile
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- OpenAI API key

### Installation

```bash
cd guidogerb/communique-python
poetry install
export OPENAI_API_KEY=your-key-here
poetry run uvicorn app.main:app --reload --port 8084
```

### Environment Variables

```env
OPENAI_API_KEY=sk-...
```

## 📚 API Usage

### Chat Completion
```bash
curl -X POST http://localhost:8084/api/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "model": "gpt-3.5-turbo",
    "temperature": 0.7
  }'
```

### List Models
```bash
curl http://localhost:8084/api/models
```

## 🐛 Known Issues

See `tasks.md` for detailed improvements needed.

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java Communique (Historical)](../../../docs/services/java/communique.md)
