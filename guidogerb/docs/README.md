# 📚 Documentation Index

Welcome to the GuidoGerb project documentation. All documentation is organized into logical categories for easy navigation.

## 📂 Documentation Structure

### 🔄 [Conversion Documentation](./conversion/)
Documentation related to the Java-to-Python conversion project.

- **[Conversion Complete Summary](./conversion/CONVERSION_COMPLETE_SUMMARY.md)** - Comprehensive summary of the entire conversion
- **[Java Cleanup Summary](./conversion/JAVA_CLEANUP_SUMMARY.md)** - Summary of Java code removal after migration
- **[Conversion Complete](./conversion/CONVERSION_COMPLETE.md)** - Quick conversion completion reference
- **[Implementation Summary](./conversion/IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[Java to Python Conversion Plan](./conversion/JAVA_TO_PYTHON_CONVERSION_PLAN.md)** - Original conversion planning document
- **[Python Services README](./conversion/PYTHON_SERVICES_README.md)** - Overview of all Python services

### 🐍 [Python Services](./services/python/)
Documentation for all Python (FastAPI) microservices.

- **[Backend](./services/python/backend.md)** - Main authentication and user management service (Port 8080)
- **[Backend Migration](./services/python/backend-migration.md)** - Migration guide for backend service
- **[Blockchain Voting](./services/python/blockchainvoting.md)** - Blockchain voting system (Port 8081)
- **[Vector Database](./services/python/vector.md)** - Vector database and RAG service (Port 8082)
- **[Filesystem Utility](./services/python/fsutil.md)** - File indexer and scanner (Port 8083)
- **[Communique](./services/python/communique.md)** - OpenAI chat service (Port 8084)
- **[Bridge Gateway](./services/python/bridge-gapp.md)** - Multi-database bridge (Port 8085)
- **[Model Generator](./services/python/pojo-generator.md)** - Pydantic/SQLAlchemy generator (Port 8086)
- **[IDS Framework](./services/python/ids.md)** - Database normalization framework (Port 8087)

### ☕ [Java Services](./services/java/)
Documentation for original Java (Spring Boot) services.

- **[Backend](./services/java/backend.md)** - Spring Boot backend service
- **[Blockchain Voting](./services/java/blockchainvoting.md)** - Java blockchain implementation
- **[Vector Database](./services/java/vector.md)** - Spring AI vector service
- **[Filesystem Utility](./services/java/fsutil.md)** - Spring Batch file utility
- **[Communique](./services/java/communique.md)** - Spring WebFlux communication service
- **[Communique Help](./services/java/communique-help.md)** - Additional help documentation
- **[Bridge Gateway](./services/java/bridge-gapp.md)** - JDBC bridge application
- **[Model Generator](./services/java/pojo-generator.md)** - POJO generator
- **[IDS Framework](./services/java/ids.md)** - Identity/Database normalization system
- **[IDS Implementation](./services/java/ids-implementation.md)** - IDS implementation details

### 🔍 [Services Overview](./services/)
- **[GuidoGerb Services Overview](./services/guidogerb-services-overview.md)** - Complete overview of all services

### 🎨 [Frontend Documentation](./frontend/)
Documentation for the React frontend application.

- **[Frontend](./frontend/frontend.md)** - Main frontend application
- **[Design System](./frontend/design-system.md)** - Design system documentation
- **[Design System Artifacts](./frontend/design-system-artifacts.md)** - Design system components
- **[Design System Header](./frontend/design-system-header.md)** - Header components
- **[Design System Header Artifacts](./frontend/design-system-header-artifacts.md)** - Header component artifacts

### 🔬 [Research Documentation](./research/)
Research papers and specifications.

- **[dbNF7 Specification](./research/dbNF7-specification.md)** - Database Normal Form 7 research proposal

### 🏗️ [Infrastructure Documentation](./infrastructure/)
Infrastructure, deployment, and template documentation.

- **[Docker](./infrastructure/docker.md)** - Docker configuration and setup
- **[CDN Conversion](./infrastructure/cdn-conversion.md)** - CDN setup and conversion notes
- **[React Client Template](./infrastructure/template-react-client.md)** - React client project template
- **[Spring Boot Template](./infrastructure/template-spring-boot-ws.md)** - Spring Boot web service template

### 🔗 [Third-Party Integration](./third-party/)
Documentation for third-party repositories and integrations.

- **[Repositories](./third-party/repositories.md)** - Third-party repository information
- **[AI Models](./third-party/ai-models.md)** - AI models integration

### 📋 Project Management
- **[Tasks](./tasks.md)** - Project tasks and todo items

---

## 🚀 Quick Start Guides

### For Developers
1. Start with [Python Services README](./conversion/PYTHON_SERVICES_README.md)
2. Check individual service docs in [services/python/](./services/python/)
3. Review [Conversion Complete Summary](./conversion/CONVERSION_COMPLETE_SUMMARY.md) for architecture details

### For DevOps
1. Review [Docker Documentation](./infrastructure/docker.md)
2. Check service deployment in [Python Services](./services/python/)
3. See infrastructure templates in [infrastructure/](./infrastructure/)

### For Researchers
1. Read [dbNF7 Specification](./research/dbNF7-specification.md)
2. Check [IDS Framework documentation](./services/python/ids.md)

---

## 📊 Service Architecture

```
GuidoGerb Microservices
│
├── Backend (8080)           - Auth, Users, JWT
├── Blockchain (8081)        - Voting, Chain validation
├── Vector (8082)            - Embeddings, Search, RAG
├── Fsutil (8083)            - File scanning, Hashing
├── Communique (8084)        - OpenAI Chat
├── Bridge (8085)            - Multi-DB queries
├── Generator (8086)         - Model generation
└── IDS (8087)               - DB Normalization
```

---

## 🔍 Finding Documentation

### By Topic
- **Authentication/Security**: [Backend](./services/python/backend.md)
- **Blockchain**: [Blockchain Voting](./services/python/blockchainvoting.md)
- **AI/ML**: [Vector Database](./services/python/vector.md), [Communique](./services/python/communique.md)
- **File Processing**: [Filesystem Utility](./services/python/fsutil.md)
- **Code Generation**: [Model Generator](./services/python/pojo-generator.md)
- **Database**: [IDS Framework](./services/python/ids.md), [Bridge Gateway](./services/python/bridge-gapp.md)

### By Technology
- **FastAPI**: All [Python Services](./services/python/)
- **Spring Boot**: All [Java Services](./services/java/)
- **React**: [Frontend Documentation](./frontend/)
- **Docker**: [Infrastructure](./infrastructure/)
- **OpenAI**: [Vector](./services/python/vector.md), [Communique](./services/python/communique.md)

---

## 📝 Documentation Standards

All service documentation follows this structure:
1. **Overview** - What the service does
2. **Features** - Key capabilities
3. **Quick Start** - How to run it
4. **API Endpoints** - Available endpoints
5. **Configuration** - Environment variables and settings
6. **Examples** - Usage examples

---

## 🆘 Need Help?

- For service-specific questions, check the relevant service README
- For conversion questions, see [Conversion Documentation](./conversion/)
- For deployment issues, check [Infrastructure Documentation](./infrastructure/)
- For API usage, visit `http://localhost:PORT/docs` for each service

---

**Last Updated**: October 17, 2025
