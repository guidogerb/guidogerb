# Vector Database Service

Python RAG (Retrieval Augmented Generation) service with ChromaDB and LangChain, converted from Spring AI.

## Features

- ✅ ChromaDB vector storage
- ✅ OpenAI embeddings
- ✅ PDF document processing
- ✅ Semantic search
- ✅ RESTful API
- ✅ Metadata filtering

## Quick Start

```bash
# Install dependencies
poetry install

# Set up environment
echo "OPENAI_API_KEY=your-key-here" > .env

# Start ChromaDB (in separate terminal)
docker run -p 8000:8000 chromadb/chroma:latest

# Run the application
poetry run uvicorn app.main:app --reload --port 8082

# Access API docs
open http://localhost:8082/docs
```

## API Endpoints

- `POST /api/vector/documents` - Add text document
- `POST /api/vector/documents/pdf` - Upload PDF
- `POST /api/vector/search` - Semantic search
- `DELETE /api/vector/documents` - Delete documents
- `GET /api/vector/stats` - Collection statistics
- `DELETE /api/vector/clear` - Clear collection

## Docker Compose

```bash
docker-compose up -d
```

## Example Usage

```python
import requests

# Add a document
response = requests.post("http://localhost:8082/api/vector/documents", json={
    "text": "Python is a high-level programming language.",
    "metadata": {"source": "wikipedia", "topic": "programming"}
})

# Search
results = requests.post("http://localhost:8082/api/vector/search", json={
    "query": "What is Python?",
    "n_results": 5
})

print(results.json())
```

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key (required)
- `CHROMA_HOST` - ChromaDB host (default: localhost)
- `CHROMA_PORT` - ChromaDB port (default: 8000)
