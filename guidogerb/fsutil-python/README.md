# Filesystem Utility Service (Python/FastAPI)

**Port:** 8083  
**Status:** ✅ Functional Core / 🚧 Needs Enhancement  
**Converted from:** Java Spring Boot Application

## 📋 Overview

FSUtil is a filesystem indexing and optimization utility that scans directories, tracks file metadata, detects duplicates, and provides file organization tools. It uses Celery for async background processing of large directory scans.

## 🎯 Features

### Implemented ✅
- **Directory Scanning**
  - Async directory scanning with Celery
  - File metadata extraction (size, hash, timestamps)
  - Recursive directory traversal
  - Task status tracking

- **Duplicate Detection**
  - SHA-256 hash-based duplicate finding
  - Background processing for large filesystems

- **File Information Storage**
  - FileInfo model with database persistence
  - Path normalization (Windows/Linux)

- **API Endpoints**
  - POST /api/files/scan - Start directory scan
  - GET /api/files/task/{id} - Get scan status
  - POST /api/files/duplicates - Find duplicates

### Missing Features 🚧
- File organization/moving capabilities
- Smart tagging and categorization
- Search functionality (by name, size, date, content)
- File compression recommendations
- Storage optimization suggestions
- Disk usage analytics and visualization
- Scheduled scans
- File watching (real-time monitoring)
- Cloud storage integration
- File preview generation

## 🏗️ Architecture

```
fsutil-python/
├── src/app/
│   ├── main.py                   # FastAPI application
│   ├── config.py                 # Configuration
│   ├── models/
│   │   └── file_info.py          # FileInfo model
│   ├── routers/
│   │   └── files.py              # API endpoints
│   ├── tasks/
│   │   └── file_tasks.py         # Celery tasks
│   └── utils/
│       └── file_utils.py         # File utilities
├── pyproject.toml
├── docker-compose.yml            # Redis + app
└── Dockerfile
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Redis (for Celery)
- PostgreSQL (optional, for persistence)

### Installation

#### Using Docker
```bash
cd guidogerb/fsutil-python
docker-compose up -d
```

#### Using Poetry
```bash
cd guidogerb/fsutil-python
poetry install

# Start Redis
redis-server

# Start Celery worker
poetry run celery -A app.tasks.file_tasks worker --loglevel=info

# Start API server
poetry run uvicorn app.main:app --reload --port 8083
```

## 📚 API Usage

### Scan Directory
```bash
curl -X POST http://localhost:8083/api/files/scan \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/path/to/scan",
    "linux_path": "/mnt/path"
  }'
```

### Check Scan Status
```bash
curl http://localhost:8083/api/files/task/{task_id}
```

### Find Duplicates
```bash
curl -X POST http://localhost:8083/api/files/duplicates
```

## 🧪 Testing

```bash
poetry run pytest
```

## 🐛 Known Issues

See `tasks.md` for detailed improvements.

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java FSUtil (Historical)](../../../docs/services/java/fsutil.md)
