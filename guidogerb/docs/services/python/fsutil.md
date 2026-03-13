# Filesystem Utility

Python filesystem indexer and optimizer, converted from Spring Boot + Spring Batch.

## Features

- ✅ Recursive directory scanning
- ✅ SHA-256 file hashing
- ✅ File metadata extraction
- ✅ Async task processing with Celery
- ✅ Duplicate file detection
- ✅ Cross-platform path support
- ✅ PostgreSQL storage

## Quick Start

```bash
# Install dependencies
poetry install

# Start Redis (for Celery)
docker run -d -p 6379:6379 redis:alpine

# Start Celery worker
poetry run celery -A app.tasks.file_tasks worker --loglevel=info

# Run the API
poetry run uvicorn app.main:app --reload --port 8083

# Access API docs
open http://localhost:8083/docs
```

## API Endpoints

- `POST /api/files/scan` - Start directory scan
- `GET /api/files/task/{task_id}` - Get scan task status
- `POST /api/files/duplicates` - Find duplicate files

## Docker Compose

```bash
docker-compose up -d
```

## Example Usage

```python
import requests

# Start a scan
response = requests.post("http://localhost:8083/api/files/scan", json={
    "path": "/home/user/documents",
    "linux_path": "/mnt/documents"
})

task_id = response.json()["task_id"]

# Check status
status = requests.get(f"http://localhost:8083/api/files/task/{task_id}")
print(status.json())

# Find duplicates
dups = requests.post("http://localhost:8083/api/files/duplicates")
```

## Configuration

Create `.env` file:

```env
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/fsutil
REDIS_HOST=localhost
REDIS_PORT=6379
DEFAULT_SCAN_PATH=/home/user/files
```
