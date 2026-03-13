# GuidoGerb Services - Quick Reference

**Last Updated:** November 10, 2025

## 📦 All Services Overview

### ✅ Production Ready

| Service | Port | Status | Description | Docs |
|---------|------|--------|-------------|------|
| **Backend** | 8080 | ✅ 85% | User auth & management (FastAPI + PostgreSQL) | [README](app/backend-python/README.md) · [Tasks](app/backend-python/tasks.md) |
| **Vector** | 8082 | ✅ 75% | RAG & semantic search (ChromaDB + OpenAI) | [README](vector-python/README.md) · [Tasks](vector-python/tasks.md) |

### 🟡 Functional but Incomplete

| Service | Port | Status | Description | Docs |
|---------|------|--------|-------------|------|
| **Blockchain Voting** | 8081 | 🟡 60% | Proof-of-work voting system | [README](blockchainvoting-python/README.md) · [Tasks](blockchainvoting-python/tasks.md) |
| **FSUtil** | 8083 | 🟡 65% | Filesystem indexing & optimization | [README](fsutil-python/README.md) · [Tasks](fsutil-python/tasks.md) |
| **Communique** | 8084 | 🟡 40% | AI chat service (OpenAI proxy) | [README](communique-python/README.md) · [Tasks](communique-python/tasks.md) |
| **POJO Generator** | 8086 | 🟡 30% | Code generation utility | [README](pojo-generator-python/README.md) · [Tasks](pojo-generator-python/tasks.md) |
| **Frontend** | 5173 | 🟡 50% | React web app (design system complete) | [README](app/frontend/README.md) · [Tasks](app/frontend/tasks.md) |

### 🔴 Minimal Stub / Research

| Service | Port | Status | Description | Docs |
|---------|------|--------|-------------|------|
| **IDS** | 8087 | 🔴 2% | Database normalization research (dbNF7) | [README](ids-python/README.md) · [Tasks](ids-python/tasks.md) |
| **Bridge Gateway** | 8085 | 🔴 1% | Database ETL & migration tool | [README](bridge-gapp-python/README.md) · [Tasks](bridge-gapp-python/tasks.md) |

---

## 🚀 Quick Start

### Start All Services (Docker)
```bash
docker-compose up -d
```

### Start Individual Service
```bash
cd guidogerb/<service-name>-python
poetry install
poetry run uvicorn app.main:app --reload --port <PORT>
```

### Start Frontend
```bash
cd guidogerb/app/frontend
npm install
npm run dev
```

---

## 📊 Development Effort Summary

| Priority | Services | Total Tasks | Estimated Hours |
|----------|----------|-------------|-----------------|
| **Phase 1** | Backend, Vector, Frontend | 67 | 360-459h |
| **Phase 2** | Blockchain, FSUtil, Communique, POJO | 70 | 445-603h |
| **Phase 3** | IDS, Bridge Gateway | 45 | 700-920h |
| **TOTAL** | All 9 services | 182 | 1,505-2,082h |

---

## 🎯 Top Priority Tasks

### This Week
1. ✅ **Documentation complete** - All README.md and tasks.md created
2. 🔲 **Frontend API Integration** - Connect frontend to backend
3. 🔲 **Backend Email Verification** - Add email verification flow
4. 🔲 **Vector RAG** - Complete RAG LLM integration

### This Month  
5. 🔲 **Blockchain Persistence** - Add database storage
6. 🔲 **FSUtil Search** - Implement file search
7. 🔲 **Frontend Auth Flow** - Complete authentication UI
8. 🔲 **CI/CD Setup** - Automated testing and deployment

---

## 📖 Key Documentation

- **[CODE_REVIEW_SUMMARY.md](../CODE_REVIEW_SUMMARY.md)** - Complete code review findings
- **[Root README.md](../README.md)** - Project overview
- **[docs/](../docs/)** - Centralized documentation
- **Individual Service READMEs** - See links in tables above

---

## 🔑 Architecture Patterns

All Python services follow this structure:
```
service-python/
├── src/app/
│   ├── main.py           # FastAPI app
│   ├── config.py         # Configuration
│   ├── models/           # Database models (SQLAlchemy)
│   ├── schemas/          # API schemas (Pydantic)
│   ├── routers/          # API endpoints
│   ├── services/         # Business logic
│   ├── repositories/     # Database access
│   └── utils/            # Utilities
├── tests/                # Tests
├── pyproject.toml        # Poetry dependencies
├── Dockerfile            # Container
├── README.md             # Service documentation
└── tasks.md              # Development tasks
```

---

## 🛠️ Technology Stack

- **Backend:** Python 3.11, FastAPI, SQLAlchemy, PostgreSQL, Celery, Redis
- **Frontend:** React 18, Vite, React Router, Custom Design System
- **AI/ML:** OpenAI API, ChromaDB, LangChain
- **DevOps:** Docker, Docker Compose, Poetry

---

## 📞 Need Help?

Each service has:
1. **README.md** - Feature overview, setup, API usage
2. **tasks.md** - Prioritized development tasks with effort estimates

Refer to these documents for detailed information about each service.

---

**Project Status:** ~45% Complete  
**Documentation Status:** ✅ 100% Complete  
**Next Milestone:** Phase 1 Production Ready (3-4 months)
