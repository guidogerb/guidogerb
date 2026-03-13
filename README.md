# GuidoGerb Project

A comprehensive suite of Python microservices for various business and technical applications, built with FastAPI.

> **✨ Migration Complete**: All Java services have been successfully converted to Python and the original Java code has been removed. The Java documentation is preserved in [`/docs/services/java/`](./docs/services/java/) for historical reference.

## 📚 Documentation

**All project documentation has been organized in the [`/docs`](./docs/) directory.**

👉 **[Start Here: Documentation Index](./docs/README.md)**

### Quick Links
- **[Python Services](./docs/services/python/)** - FastAPI microservices documentation
- **[Java Services (Historical)](./docs/services/java/)** - Original Spring Boot documentation (code removed)
- **[Conversion Documentation](./docs/conversion/)** - Java-to-Python conversion details
- **[Frontend Documentation](./docs/frontend/)** - React frontend application
- **[Infrastructure Documentation](./docs/infrastructure/)** - Docker, deployment, templates
- **[Research Papers](./docs/research/)** - Database normalization and research

## 🎯 Project Overview

GuidoGerb is a microservices architecture that includes:
- **Backend** (Port 8080) - User authentication and management
- **Blockchain Voting** (Port 8081) - Blockchain-based voting system
- **Vector Database** (Port 8082) - Vector database and RAG capabilities
- **Filesystem Utility** (Port 8083) - Filesystem optimization and indexing
- **Communique** (Port 8084) - AI-powered communication services
- **Bridge Gateway** (Port 8085) - Database bridging tools
- **Model Generator** (Port 8086) - Code generation utility
- **IDS Framework** (Port 8087) - Database normalization framework

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Copy environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access services
# Each service has interactive docs at http://localhost:808X/docs
```

### Using Local Python
```bash
# Install dependencies for a service
cd guidogerb/[service-name]-python
poetry install

# Run service
poetry run uvicorn app.main:app --reload --port [PORT]
```

## 📦 Repository Structure

```
guidogerb/
├── docs/                           # 📚 All documentation (organized)
│   ├── conversion/                 # Java-to-Python conversion docs
│   ├── services/                   # Service-specific documentation
│   │   ├── python/                 # Python (FastAPI) services
│   │   └── java/                   # Java (Spring Boot) services
│   ├── frontend/                   # Frontend documentation
│   ├── research/                   # Research papers and specs
│   ├── infrastructure/             # Docker, templates, deployment
│   └── third-party/                # Third-party integrations
├── guidogerb/                      # Main services directory
│   ├── app/                        # Main application
│   │   ├── backend-python/         # Python backend service ✅
│   │   └── frontend/               # React frontend
│   ├── blockchainvoting-python/    # Python blockchain service ✅
│   ├── vector-python/              # Python vector DB service ✅
│   ├── fsutil-python/              # Python filesystem utility ✅
│   ├── communique-python/          # Python OpenAI service ✅
│   ├── bridge-gapp-python/         # Python database bridge ✅
│   ├── pojo-generator-python/      # Python model generator ✅
│   └── ids-python/                 # Python IDS framework ✅
├── docker-compose.yml              # Unified service orchestration
├── start-all-services.sh           # Local development script
└── .env.example                    # Environment template
```

## 🛠️ Technology Stack

### Python Services
- **Framework**: FastAPI 0.104+
- **Language**: Python 3.11+
- **Database**: PostgreSQL with SQLAlchemy 2.0 (async)
- **Task Queue**: Celery + Redis
- **Vector DB**: ChromaDB
- **Package Manager**: Poetry

### Legacy Java Services (Removed)
- **Status**: ✅ All Java code migrated to Python and removed
- **Documentation**: Historical Java documentation preserved in [`/docs/services/java/`](./docs/services/java/)
- **Original Framework**: Spring Boot 2.5.4 - 3.4.0
- **Language**: Java 8 & 17
- **Build**: Maven
- **Database**: JPA/Hibernate, JDBC

### Frontend
- **Framework**: React with Vite
- **Language**: TypeScript/JavaScript

## 🔗 Service Endpoints

| Service | Port | Documentation | Interactive API |
|---------|------|---------------|-----------------|
| Backend | 8080 | [Docs](./docs/services/python/backend.md) | http://localhost:8080/docs |
| Blockchain | 8081 | [Docs](./docs/services/python/blockchainvoting.md) | http://localhost:8081/docs |
| Vector | 8082 | [Docs](./docs/services/python/vector.md) | http://localhost:8082/docs |
| Fsutil | 8083 | [Docs](./docs/services/python/fsutil.md) | http://localhost:8083/docs |
| Communique | 8084 | [Docs](./docs/services/python/communique.md) | http://localhost:8084/docs |
| Bridge | 8085 | [Docs](./docs/services/python/bridge-gapp.md) | http://localhost:8085/docs |
| Generator | 8086 | [Docs](./docs/services/python/pojo-generator.md) | http://localhost:8086/docs |
| IDS | 8087 | [Docs](./docs/services/python/ids.md) | http://localhost:8087/docs |

## 📖 Additional Resources

### For Developers
- [Getting Started Guide](./docs/conversion/PYTHON_SERVICES_README.md)
- [Conversion Summary](./docs/conversion/CONVERSION_COMPLETE_SUMMARY.md)
- [Migration Details](./docs/services/python/backend-migration.md)

### For DevOps
- [Docker Setup](./docs/infrastructure/docker.md)
- [Infrastructure Templates](./docs/infrastructure/)

### For Researchers
- [dbNF7 Specification](./docs/research/dbNF7-specification.md)

## 🤝 Contributing

1. Read the relevant service documentation in [`/docs/services`](./docs/services/)
2. Follow the Python coding standards (PEP 8, FastAPI best practices)
3. Test your changes locally
4. Submit a pull request with clear description

## 📄 License

See LICENSE file for details.

---

## 🔧 Git Repository Setup

<details>
<summary>Click to expand Git initialization steps</summary>

```shell
# add submodules and remote
git clone git@github.com:guidogerb/guidogerb.git

git submodule add git@github.com:guidogerb/ollama.git .\third-party-repos\ollama
git submodule add git@github.com:guidogerb/Prompt-Engineering-Guide.git .\third-party-repos\prompt-engineering-guide

git submodule update --init --recursive
git submodule status

git remote add guidogerb/app git@github.com:guidogerb/app.git
git remote add guidogerb/blockchainvoting git@github.com:guidogerb/blockchainvoting.git
git remote add guidogerb/bridge-gapp git@github.com:guidogerb/bridge-gapp.git
git remote add guidogerb/communique git@github.com:guidogerb/communique.git
git remote add guidogerb/fsutil git@github.com:guidogerb/fsutil.git
git remote add guidogerb/ids git@github.com:guidogerb/ids.git
git remote add guidogerb/pojo-gernerator git@github.com:guidogerb/pojo-gernerator.git
git remote add guidogerb/vector git@github.com:guidogerb/vector.git

git subtree add --prefix guidogerb/app git@github.com:guidogerb/app.git main
git subtree add --prefix guidogerb/blockchainvoting git@github.com:guidogerb/blockchainvoting.git main
git subtree add --prefix guidogerb/bridge-gapp git@github.com:guidogerb/bridge-gapp.git main
git subtree add --prefix guidogerb/communique git@github.com:guidogerb/communique.git main
git subtree add --prefix guidogerb/fsutil git@github.com:guidogerb/fsutil.git main
git subtree add --prefix guidogerb/ids git@github.com:guidogerb/ids.git main
git subtree add --prefix guidogerb/pojo-gernerator git@github.com:guidogerb/pojo-gernerator.git main
git subtree add --prefix guidogerb/vector git@github.com:guidogerb/vector.git main

```

</details>

````shell
# init all submodules
git submodule update --remote --recursive

git subtree update  --prefix guidogerb/app git@github.com:guidogerb/app.git main
git subtree update  --prefix guidogerb/blockchainvoting git@github.com:guidogerb/blockchainvoting.git main
git subtree update  --prefix guidogerb/bridge-gapp git@github.com:guidogerb/bridge-gapp.git main
git subtree update  --prefix guidogerb/communique git@github.com:guidogerb/communique.git main
git subtree update  --prefix guidogerb/fsutil git@github.com:guidogerb/fsutil.git main
git subtree update  --prefix guidogerb/ids git@github.com:guidogerb/ids.git main
git subtree update  --prefix guidogerb/pojo-gernerator git@github.com:guidogerb/pojo-gernerator.git main
git subtree update  --prefix guidogerb/vector git@github.com:guidogerb/vector.git main
````

```shell
# stash guidogerb subtrees
# cd "C:\path\to\your\project" # CHANGE THIS
cd "J:\Home\Projects\Development\Sources\guidogerb"
 
cd ./guidogerb/app
git stash
cd ../blockchainvoting
git stash
cd ../bridge-gapp
git stash
cd ../communique
git stash
cd ../fsutil
git stash
cd ../ids
git stash
cd ../pojo-generator
git stash
cd ..
```

```shell
# pull guidogerb subtrees

git subtree pull --prefix guidogerb/app git@github.com:guidogerb/app.git main
git subtree pull --prefix guidogerb/blockchainvoting git@github.com:guidogerb/blockchainvoting.git main
git subtree pull --prefix guidogerb/bridge-gapp git@github.com:guidogerb/bridge-gapp.git main
git subtree pull --prefix guidogerb/communique git@github.com:guidogerb/communique.git main
git subtree pull --prefix guidogerb/fsutil git@github.com:guidogerb/fsutil.git main
git subtree pull --prefix guidogerb/ids git@github.com:guidogerb/ids.git main
git subtree pull --prefix guidogerb/pojo-gernerator git@github.com:guidogerb/pojo-gernerator.git main
git subtree pull --prefix guidogerb/vector git@github.com:guidogerb/vector.git main

```

```shell
git remote -v

git fetch upstream
git merge --allow-unrelated-histories upstream/main
git push origin main
````

```shell
# push subtree repos
git subtree push --prefix guidogerb/app guidogerb/app main
git subtree push --prefix guidogerb/blockchainvoting guidogerb/blockchainvoting main
git subtree push --prefix guidogerb/bridge-gapp guidogerb/bridge-gapp main
git subtree push --prefix guidogerb/communique guidogerb/communique main
git subtree push --prefix guidogerb/fsutil guidogerb/fsutil main
git subtree push --prefix guidogerb/ids guidogerb/ids main
git subtree push --prefix guidogerb/pojo-gernerator guidogerb/pojo-generator main
git subtree push --prefix guidogerb/vector guidogerb/vector main
```

```shell
# To pull the latest changes from the submodule:
cd <path-to-submodule>
git pull origin <branch>
cd ..
git add <path-to-submodule>
git commit -m "Updated submodule"
```

## Description

Creating and managing a highly complex, multi-technology project as described:

### Project Goals
1. Combine multiple technologies (Python, Node.js, Rust) in a single repository.
2. Vet and manage open-source dependencies with local builds.
3. Use Python (FastAPI/Flask) as the primary backend, Vite+React as the frontend, and PostgreSQL as the database.
4. Ensure reproducibility with Python virtual environments and package managers.
5. Provide local and containerized development environments.

# Getting Started - Development Environment
This section provides a basic guide to set up a development environment using the above structure.

1. Clone the repository: git clone <your_repo_url>
2. Navigate to the backend directory: cd project-root/backend
3. Create virtual environment: python -m venv venv
4. Activate virtual environment: source venv/bin/activate (Linux/Mac) or venv\Scripts\activate (Windows)
5. Install dependencies (backend): pip install -r requirements.txt
6. Navigate to the frontend directory: cd ../frontend
7. Install dependencies (frontend): npm install
8. Start the frontend: npm run start (You may need to configure .env files first)
9. Start the backend (adjust port as needed): python main.py or uvicorn main:app --reload
10. Verify the setup Navigate to http://localhost:3000 in your web browser. You should see your React application making requests to your Python backend.
11. (Optional) Use Docker: After building your frontend and backend using their respective Dockerfiles, run docker-compose up to run both services in their own containers, using Docker Compose.

This guide offers a solid starting point; you will need to refine the steps and settings based on your specific project requirements. Remember to consult the documentation for each technology (Python, React, Docker, and Git LFS) for more detailed information.

## 1. Directory Structure

The project uses a modular directory structure to separate concerns:
Use code with caution.


## 2. Python Backend Setup

**Directory:** `app/backend-python/`

**Steps:**

1. Create a Python project structure with virtual environment: `python -m venv venv`

2. Create `requirements.txt` with necessary dependencies (e.g., `fastapi`, `uvicorn`, `sqlalchemy`, `psycopg2-binary`).

3. Install dependencies: `pip install -r requirements.txt`

4. Use subprocess for system-level operations (e.g., executing Git commands):

```python
import subprocess

def run_git_status():
    result = subprocess.run(["git", "status"], capture_output=True, text=True)
    return result.stdout
```
For testing, integrate embedded PostgreSQL using the pytest and testcontainers-python library.

## 3. Vite+React Frontend

**Directory:** `app/frontend/`

**Steps:**

1. Use vite create to scaffold the project.
2. Add dependencies in package.json, then configure local builds using npm link or yarn link.
3. Add scripts for local development and deployment:

```node 
"scripts": {
  "start": "vite",
  "build": "vite build",
  "docker:build": "docker build -f ../docker/Dockerfile-frontend ."
}
```
Configure .env files for API endpoints.

## 4. Python Virtual Environments

**Directory:** `python-modules/venvs/`

** Steps:**
1. Use python -m venv venv1 to create isolated environments.
2. Track virtual environments in .gitignore but commit requirements.txt:
3. pip freeze > requirements.txt
4. Use scripts/ for Python utilities like API clients or integration.

## 5. Manage Third-Party Repositories

**Directory:** `third-party/`

**Steps:**
1. Clone repositories using git clone --recurse-submodules.
2. Configure .gitmodules for easy updates:
```java
[submodule "repo1"]
 path = third-party/repo1
 url = https://github.com/user/repo1.git
 Periodically pull updates with:
 git submodule update --remote
```
 
## 6. Docker Integration

**Directory:** `docker/`
**Steps:**
1. Create Dockerfile-backend for the backend:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY app/backend-python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/backend-python/ .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
``` 
2. Create Dockerfile-frontend for the frontend:

```dockerfile 
FROM node:20-alpine
 WORKDIR /app
 COPY app/frontend/ .
 RUN npm install && npm run build
 ENTRYPOINT ["npm", "start"]
```
3. Use docker-compose.yml to orchestrate:
```dockerfile
version: "3.5"
services:
    backend:
        build: ./docker/Dockerfile-backend
        ports:
            - "8080:8080"
    frontend:
        build: ./docker/Dockerfile-frontend
        ports:
            - "3000:3000"
```
## 7. Enable Git LFS for Large Files

**Steps:**

1. Install Git LFS:
2. git lfs install
3. Track file types:
4. git lfs track "*.jar"
5. Commit .gitattributes to the repository.

## 8. Testing and Automation

**Use CI/CD workflows (e.g., GitHub Actions) to automate builds:**
```node
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        -   name: Checkout code
            uses: actions/checkout@v3
        -   name: Set up Python
            uses: actions/setup-python@v4
            with:
                python-version: '3.11'
        -   name: Install dependencies
            run: |
                python -m pip install --upgrade pip
                pip install -r app/backend-python/requirements.txt
        -   name: Run tests
            run: pytest app/backend-python/tests/
```

This structure provides a scalable, maintainable foundation for combining your technologies effectively. Let me know where you need further clarification or enhancements!

Provide step by step series of examples and explanations about how to get a development environment running.


# Python example of the usage

## Contributing

We warmly welcome and appreciate contributions from the community! As the project matures, your participation is extremely valuable to us.

To contribute to our project, please follow these steps:

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a pull request

We are looking forward to reviewing your contributions. Thank you for your support!
## License
Copyright `2024 Gary Gerber`

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this file except in compliance with the License.   
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software   
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  
See the License for the specific language governing permissions and   
limitations under the License.