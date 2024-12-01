# GuidoGerb

git clone git@github.com:guidogerb/guidogerb.git

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