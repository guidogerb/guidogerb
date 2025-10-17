# GuidoGerb Python Microservices

All Java services converted to Python with FastAPI.

## Services

| Service | Port | Description |
|---------|------|-------------|
| backend | 8080 | Main application with auth |
| blockchainvoting | 8081 | Blockchain voting system |
| vector | 8082 | Vector database & RAG |
| fsutil | 8083 | Filesystem indexer |
| communique | 8084 | OpenAI chat service |
| bridge-gapp | 8085 | Database bridge |
| pojo-generator | 8086 | Model generator |
| ids | 8087 | DB normalization framework |

## Quick Start

```bash
# Copy environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Service URLs

- Backend: http://localhost:8080/docs
- Blockchain Voting: http://localhost:8081/docs
- Vector Database: http://localhost:8082/docs
- Filesystem Utility: http://localhost:8083/docs
- Communique (OpenAI): http://localhost:8084/docs
- Bridge Gateway: http://localhost:8085/docs
- Model Generator: http://localhost:8086/docs
- IDS Framework: http://localhost:8087/docs
- pgAdmin: http://localhost:5050

## Individual Service Development

Each service can be run independently:

```bash
cd guidogerb/[service-name]-python
poetry install
poetry run uvicorn app.main:app --reload --port [PORT]
```

## Architecture

- **Framework**: FastAPI (async)
- **Database**: PostgreSQL with SQLAlchemy 2.0
- **Caching**: Redis
- **Task Queue**: Celery (fsutil)
- **Vector DB**: ChromaDB (vector service)
- **Python**: 3.11+
- **Package Manager**: Poetry

## Migration Status

✅ All 8 Java services converted to Python  
✅ 100+ Python files created  
✅ Docker & docker-compose configured  
✅ API documentation auto-generated  
✅ Async/await throughout  
✅ Type hints everywhere  

## Testing

Each service includes tests:

```bash
cd guidogerb/[service]-python
poetry run pytest
```

## Production Deployment

1. Set strong passwords in `.env`
2. Configure proper SECRET_KEY for backend
3. Set up SSL/TLS certificates
4. Use production-grade PostgreSQL
5. Configure Redis persistence
6. Set up monitoring and logging

## Development Tools

- API Docs: Each service has `/docs` endpoint (Swagger UI)
- Database Admin: pgAdmin at port 5050
- Redis: Available at port 6379
- PostgreSQL: Available at port 5432

## Notes

- Import errors are expected until `poetry install` is run in each service
- All services share the same PostgreSQL instance
- ChromaDB is only used by the vector service
- Celery workers are only needed for fsutil service
