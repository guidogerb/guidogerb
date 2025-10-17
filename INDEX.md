# 🚀 GuidoGerb Project - Complete Index

**Status**: ✅ All 8 Java services converted to Python

**� Documentation**: All project documentation has been reorganized into [`/docs`](./docs/)

👉 **[View Complete Documentation Index](./docs/README.md)**

---

## 📁 Quick Navigation

### 📚 Documentation (Organized in `/docs`)

#### Conversion Documentation
- [Conversion Complete Summary](./docs/conversion/CONVERSION_COMPLETE_SUMMARY.md)
- [Python Services README](./docs/conversion/PYTHON_SERVICES_README.md)
- [Java to Python Conversion Plan](./docs/conversion/JAVA_TO_PYTHON_CONVERSION_PLAN.md)
- [Implementation Summary](./docs/conversion/IMPLEMENTATION_SUMMARY.md)

#### Service Documentation
- **Python Services**: [`/docs/services/python/`](./docs/services/python/)
  - [Backend](./docs/services/python/backend.md)
  - [Blockchain Voting](./docs/services/python/blockchainvoting.md)
  - [Vector Database](./docs/services/python/vector.md)
  - [Filesystem Utility](./docs/services/python/fsutil.md)
  - [Communique](./docs/services/python/communique.md)
  - [Bridge Gateway](./docs/services/python/bridge-gapp.md)
  - [Model Generator](./docs/services/python/pojo-generator.md)
  - [IDS Framework](./docs/services/python/ids.md)

- **Java Services**: [`/docs/services/java/`](./docs/services/java/)
  - [Backend](./docs/services/java/backend.md)
  - [All Java service docs](./docs/services/java/)

#### Other Documentation
- **[Frontend](./docs/frontend/)** - React application and design system
- **[Research](./docs/research/)** - dbNF7 specification and research papers
- **[Infrastructure](./docs/infrastructure/)** - Docker, templates, deployment
- **[Third-Party](./docs/third-party/)** - External integrations

---

## 🎯 Quick Start

### Using Docker (Recommended)
```bash
# 1. Set up environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# 2. Start all services
docker-compose up -d

# 3. Check status
docker-compose ps

# 4. View logs
docker-compose logs -f [service-name]

# 5. Access services
# All services at http://localhost:808X/docs
```

### Using Local Python
```bash
# 1. Install Poetry (if not installed)
curl -sSL https://install.python-poetry.org | python3 -

# 2. Install dependencies for a service
cd guidogerb/[service-name]-python
poetry install

# 3. Run service
poetry run uvicorn app.main:app --reload --port [PORT]
```

---

## 🌐 Service URLs

| Service | Local URL | Docker Docs |
|---------|-----------|-------------|
| **Backend** | http://localhost:8080 | http://localhost:8080/docs |
| **Blockchain** | http://localhost:8081 | http://localhost:8081/docs |
| **Vector** | http://localhost:8082 | http://localhost:8082/docs |
| **Fsutil** | http://localhost:8083 | http://localhost:8083/docs |
| **Communique** | http://localhost:8084 | http://localhost:8084/docs |
| **Bridge** | http://localhost:8085 | http://localhost:8085/docs |
| **Generator** | http://localhost:8086 | http://localhost:8086/docs |
| **IDS** | http://localhost:8087 | http://localhost:8087/docs |
| **pgAdmin** | http://localhost:5050 | Database admin interface |

---

## 📚 Documentation Map

### Getting Started
1. **[PYTHON_SERVICES_README.md](./PYTHON_SERVICES_README.md)** - Start here!
   - Service overview
   - Quick start guide
   - Architecture details

2. **[CONVERSION_COMPLETE_SUMMARY.md](./CONVERSION_COMPLETE_SUMMARY.md)** - Conversion details
   - What was converted
   - Technology comparison
   - Code examples

### Planning & Technical
3. **[JAVA_TO_PYTHON_CONVERSION_PLAN.md](./JAVA_TO_PYTHON_CONVERSION_PLAN.md)** - Original plan
   - Framework mappings
   - Migration strategies
   - Timeline and phases

### Individual Services
Each service has its own README:
- `guidogerb/app/backend-python/README.md` - Auth service
- `guidogerb/blockchainvoting-python/README.md` - Blockchain
- `guidogerb/vector-python/README.md` - Vector DB
- `guidogerb/fsutil-python/README.md` - Filesystem utility
- `guidogerb/communique-python/README.md` - OpenAI service
- `guidogerb/bridge-gapp-python/README.md` - Bridge
- `guidogerb/pojo-generator-python/README.md` - Generator
- `guidogerb/ids-python/README.md` - IDS framework

---

## 🔧 Common Tasks

### Testing a Service
```bash
cd guidogerb/[service]-python
poetry run pytest
```

### Viewing Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Rebuilding a Service
```bash
# Rebuild and restart
docker-compose up -d --build [service-name]

# Rebuild all
docker-compose up -d --build
```

### Accessing Database
```bash
# Via pgAdmin: http://localhost:5050
# Login: admin@guidogerb.com / admin

# Via CLI
docker-compose exec postgres psql -U guidogerb -d guidogerb
```

---

## 🛠️ Development Workflow

### 1. Making Changes
```bash
# Edit code in guidogerb/[service]-python/src/
# Changes auto-reload in development mode
```

### 2. Testing Changes
```bash
cd guidogerb/[service]-python
poetry run pytest
```

### 3. Deploying
```bash
# Local Docker
docker-compose up -d --build [service-name]

# Production (future)
# Will use Kubernetes manifests
```

---

## 📊 Service Details

### Backend (8080) - Main Application
- **Tech**: FastAPI, SQLAlchemy, JWT
- **Database**: PostgreSQL
- **Features**: User auth, password hashing, token management
- **Directory**: `guidogerb/app/backend-python/`

### Blockchain Voting (8081)
- **Tech**: FastAPI, Python dataclasses, hashlib
- **Database**: In-memory (can persist to PostgreSQL)
- **Features**: Proof-of-work, vote recording, chain validation
- **Directory**: `guidogerb/blockchainvoting-python/`

### Vector Database (8082)
- **Tech**: FastAPI, LangChain, ChromaDB, OpenAI
- **Database**: ChromaDB
- **Features**: Document embeddings, semantic search, RAG
- **Directory**: `guidogerb/vector-python/`
- **Requires**: `OPENAI_API_KEY` environment variable

### Filesystem Utility (8083)
- **Tech**: FastAPI, Celery, SQLAlchemy
- **Database**: PostgreSQL
- **Task Queue**: Redis + Celery
- **Features**: File scanning, SHA hashing, duplicate detection
- **Directory**: `guidogerb/fsutil-python/`

### Communique (8084) - OpenAI Service
- **Tech**: FastAPI, OpenAI SDK
- **Features**: Chat completions, model management
- **Directory**: `guidogerb/communique-python/`
- **Requires**: `OPENAI_API_KEY` environment variable

### Bridge Gateway (8085)
- **Tech**: FastAPI, SQLAlchemy
- **Features**: Multi-database connections, query execution
- **Directory**: `guidogerb/bridge-gapp-python/`

### Model Generator (8086)
- **Tech**: FastAPI, Jinja2
- **Features**: Pydantic/SQLAlchemy code generation
- **Directory**: `guidogerb/pojo-generator-python/`

### IDS Framework (8087)
- **Tech**: FastAPI, NumPy, bitarray
- **Features**: Database normalization, BitArray operations
- **Directory**: `guidogerb/ids-python/`

---

## 🔐 Security & Configuration

### Required Environment Variables
```bash
# .env file
OPENAI_API_KEY=sk-...            # For vector and communique services
SECRET_KEY=your-secret-key       # For backend JWT signing
DATABASE_URL=postgresql://...    # If not using docker-compose
```

### Default Credentials
**PostgreSQL** (Docker)
- User: `guidogerb`
- Password: `guidogerb_password`
- Database: `guidogerb`

**pgAdmin** (Docker)
- Email: `admin@guidogerb.com`
- Password: `admin`

⚠️ **Change these in production!**

---

## 🚨 Troubleshooting

### Import Errors
```bash
# Solution: Install dependencies
cd guidogerb/[service]-python
poetry install
```

### Port Already in Use
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 [PID]
```

### Docker Build Fails
```bash
# Clean and rebuild
docker-compose down
docker-compose up -d --build
```

### Cannot Connect to Database
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres
```

---

## 📈 Metrics & Monitoring

### Health Checks
Each service has a `/health` endpoint:
```bash
curl http://localhost:8080/health
```

### API Documentation
Each service has auto-generated docs at `/docs`:
```bash
open http://localhost:8080/docs
```

---

## 🎓 Learning Resources

### FastAPI
- Official Docs: https://fastapi.tiangolo.com/
- Tutorial: https://fastapi.tiangolo.com/tutorial/

### SQLAlchemy 2.0
- Docs: https://docs.sqlalchemy.org/en/20/
- Async: https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html

### Poetry
- Docs: https://python-poetry.org/docs/
- Commands: https://python-poetry.org/docs/cli/

---

## 🎯 Next Steps

### Phase 1: Testing ✅
- [x] Convert all services
- [ ] Run integration tests
- [ ] Test docker-compose deployment

### Phase 2: Enhancement
- [ ] Add comprehensive logging
- [ ] Implement distributed tracing
- [ ] Add Prometheus metrics
- [ ] Set up health monitoring

### Phase 3: Production
- [ ] Create Kubernetes manifests
- [ ] Set up CI/CD pipelines
- [ ] Configure production databases
- [ ] Implement API gateway

---

## 💡 Tips

1. **Use Docker Compose** for development - it's the easiest way to run all services
2. **Check `/docs` endpoints** - they provide interactive API testing
3. **Use pgAdmin** for database inspection - already configured at port 5050
4. **Run tests** before committing - each service has a test suite
5. **Check logs** if something fails - `docker-compose logs -f [service]`

---

## 📞 Support

- Check individual service READMEs for service-specific help
- Review `CONVERSION_COMPLETE_SUMMARY.md` for technical details
- Consult `JAVA_TO_PYTHON_CONVERSION_PLAN.md` for architecture decisions

---

**🎉 Happy coding with Python microservices!**

Last Updated: $(date)
