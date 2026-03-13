# Vector Database Service (Python/FastAPI)

**Port:** 8082  
**Status:** ✅ Functional Core / 🚧 Enhancement Needed  
**Converted from:** Java Spring Boot Application

## 📋 Overview

The Vector service provides RAG (Retrieval-Augmented Generation) capabilities using ChromaDB for vector storage and OpenAI embeddings. It enables semantic search over documents, PDFs, and text content.

## 🎯 Features

### Implemented ✅
- **Document Management**
  - Add text documents to vector store
  - Upload and process PDF files
  - Automatic text chunking (RecursiveCharacterTextSplitter)
  - Metadata support for documents

- **Semantic Search**
  - Query-based similarity search
  - Configurable number of results
  - Metadata filtering
  - Distance-based ranking

- **Vector Operations**
  - OpenAI embeddings (text-embedding-ada-002)
  - ChromaDB persistent storage
  - Collection management
  - Document deletion

- **API Endpoints**
  - POST /api/vector/documents - Add document
  - POST /api/vector/documents/pdf - Upload PDF
  - POST /api/vector/search - Semantic search
  - GET /api/vector/collections/stats - Collection statistics
  - DELETE /api/vector/documents - Delete documents

### Missing Features 🚧
- RAG integration with LLM (e.g., OpenAI GPT)
- Document update capability
- Batch operations for large document sets
- Advanced chunking strategies (semantic, paragraph-based)
- Vector index optimization
- Multiple collection management
- Document versioning
- Access control and multi-tenancy

## 🏗️ Architecture

```
vector-python/
├── src/app/
│   ├── main.py                   # FastAPI application
│   ├── config.py                 # Configuration and ChromaDB setup
│   ├── services/
│   │   └── vector_service.py     # Vector operations and embeddings
│   ├── routers/
│   │   └── vector.py             # API endpoints
│   └── schemas/
│       └── vector.py             # Request/response models
├── pyproject.toml                # Dependencies
├── docker-compose.yml            # Local development
└── Dockerfile                    # Container
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- OpenAI API key
- Docker (optional)

### Installation

#### Using Docker
```bash
cd guidogerb/vector-python
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
docker-compose up -d
```

#### Using Poetry
```bash
cd guidogerb/vector-python
poetry install
export OPENAI_API_KEY=your-key-here
poetry run uvicorn app.main:app --reload --port 8082
```

### Environment Variables

```env
OPENAI_API_KEY=sk-...
OPENAI_EMBEDDING_MODEL=text-embedding-ada-002
CHROMA_PERSIST_DIRECTORY=./chroma_db
CHROMA_COLLECTION_NAME=documents
```

## 📚 API Usage

### Add Document
```bash
curl -X POST http://localhost:8082/api/vector/documents \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your document text here...",
    "metadata": {"source": "manual", "category": "docs"}
  }'
```

### Upload PDF
```bash
curl -X POST http://localhost:8082/api/vector/documents/pdf \
  -F "file=@document.pdf" \
  -F 'metadata={"source":"upload","author":"John"}'
```

### Search Documents
```bash
curl -X POST http://localhost:8082/api/vector/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is machine learning?",
    "n_results": 5,
    "where": {"source": "manual"}
  }'
```

## 🔧 Technology Stack

- **FastAPI** - Web framework
- **ChromaDB** - Vector database
- **LangChain** - Document processing and embeddings
- **OpenAI** - Text embeddings (text-embedding-ada-002)
- **PyPDF2** - PDF parsing

## 📊 Performance

- **Embedding Speed:** ~1-2 seconds per document chunk (depends on OpenAI API)
- **Search Speed:** <100ms for typical queries
- **Storage:** ~1KB per chunk (text + embedding)

## 🧪 Testing

```bash
poetry run pytest
poetry run pytest --cov=app
```

## 🐛 Known Issues

See `tasks.md` for improvements and missing features.

## 📖 Related Documentation

- [Python Services Overview](../../../docs/services/python/)
- [Java Vector (Historical)](../../../docs/services/java/vector.md)
