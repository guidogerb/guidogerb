# Initialized GuidoGerb Steps

```shell
# add submodules and remote
git clone git@github.com:guidogerb/guidogerb.git

git submodule add git@github.com:guidogerb/ollama.git .\third-party-repos\ollama
git submodule add git@github.com:guidogerb/Prompt-Engineering-Guide.git .\third-party-repos\prompt-engineering-guide
git submodule add git@github.com:guidogerb/spring-ai.git .\third-party-repos\spring-ai
git submodule add git@github.com:guidogerb/spring-boot.git .\third-party-repos\spring-boot
git submodule add git@github.com:guidogerb/spring-data-relational.git .\third-party-repos\spring-data-relational
git submodule add git@github.com:guidogerb/spring-framework.git .\third-party-repos\spring-framework

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
1. Combine multiple technologies (Java, Node.js, Python, Rust) in a single repository.
2. Vet and manage open-source dependencies with local builds.
3. Use Spring Boot as the primary backend, Vite+React as the frontend, and PostgreSQL as the database.
4. Ensure reproducibility with Python virtual environments and Java module builds.
5. Provide local and containerized development environments.

# Getting Started - Development Environment
This section provides a basic guide to set up a development environment using the above structure.

1. Clone the repository: git clone <your_repo_url>
2. Navigate to the backend directory: cd project-root/backend
3. Install dependencies (backend): mvn clean install
4. Navigate to the frontend directory: cd ../frontend
5. Install dependencies (frontend): npm install
6. Start the frontend: npm run start (You may need to configure .env files first)
7. Start the backend (adjust port as needed): mvn spring-boot:run
8. Verify the setup Navigate to http://localhost:3000 in your web browser. You should see your React application making requests to your Spring Boot backend.
9. (Optional) Use Docker: After building your frontend and backend using their respective Dockerfiles, run docker-compose up to run both services in their own containers, using Docker Compose.

This guide offers a solid starting point; you will need to refine the steps and settings based on your specific project requirements. Remember to consult the documentation for each technology (Spring Boot, React, Python, Docker, and Git LFS) for more detailed information.

## 1. Directory Structure

The project uses a modular directory structure to separate concerns:
Use code with caution.


## 2. Spring Boot Backend Setup

**Directory:** `backend/`

**Steps:**

1. Create a Maven project using your IDE or the command line (e.g., `mvn archetype:generate`).  Include the `spring-boot-starter-web` and other necessary Spring Boot starters as dependencies in `pom.xml`.

2. Build any required Java libraries as JARs and place them in the `lib/` directory. Use the Maven `install` plugin to build these libraries.

3.  Use a `CommandLineRunner` bean for system-level operations (e.g., executing Git commands):

```java
@Bean
CommandLineRunner commandLineRunner() {
    return args -> {
        // Execute system commands
        Runtime.getRuntime().exec("git status"); 
    };
}
```
For testing, integrate embedded PostgreSQL using the Testcontainers library.

## 3. Vite+React Frontend

**Directory:** `frontend/`

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
1.Create Dockerfile-backend for the backend:
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY backend/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
``` 
2. Create Dockerfile-frontend for the frontend:

```dockerfile 
FROM node:20-alpine
 WORKDIR /app
 COPY frontend/ .
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
        -   name: Set up JDK
            uses: actions/setup-java@v3
            with:
                java-version: '17'
        -   name: Build Backend
             run: mvn install -f backend/pom.xml
```

This structure provides a scalable, maintainable foundation for combining your technologies effectively. Let me know where you need further clarification or enhancements!

Provide step by step series of examples and explanations about how to get a development environment running.


// Java example of the usage

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