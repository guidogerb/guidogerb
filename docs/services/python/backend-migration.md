# Java to Python Migration Guide

## Overview

This document describes the conversion of the GuidoGerb backend from Spring Boot (Java) to FastAPI (Python).

## Technology Stack Changes

### Core Framework
- **Before**: Spring Boot 3.4.0 (Java 17)
- **After**: FastAPI 0.104+ (Python 3.11+)

### Dependency Management
- **Before**: Maven (`pom.xml`)
- **After**: Poetry (`pyproject.toml`)

### Database ORM
- **Before**: Spring Data JPA + Hibernate
- **After**: SQLAlchemy 2.0 (async)

### Security
- **Before**: Spring Security
- **After**: FastAPI Security + python-jose (JWT)

### Testing
- **Before**: JUnit + Mockito
- **After**: pytest + pytest-asyncio

## Key Conversion Patterns

### 1. Application Entry Point

**Java (Spring Boot)**:
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**Python (FastAPI)**:
```python
from fastapi import FastAPI

app = FastAPI(title="GuidoGerb Backend")

@app.get("/")
async def root():
    return {"message": "Welcome"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

### 2. REST Controllers → Routers

**Java**:
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO dto) {
        User user = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

**Python**:
```python
from fastapi import APIRouter, Depends, status

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    user_data: RegisterRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    return await auth_service.register(user_data)
```

### 3. JPA Entities → SQLAlchemy Models

**Java**:
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // getters and setters
}
```

**Python**:
```python
from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
```

### 4. DTOs → Pydantic Schemas

**Java**:
```java
public class UserDTO {
    private String username;
    private String email;
    private String password;
    
    // getters, setters, validation
}
```

**Python**:
```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
```

### 5. Repositories

**Java**:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
```

**Python**:
```python
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_by_username(self, username: str):
        result = await self.db.execute(
            select(User).where(User.username == username)
        )
        return result.scalar_one_or_none()
```

### 6. Dependency Injection

**Java**:
```java
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
}
```

**Python**:
```python
from fastapi import Depends

async def get_auth_service(
    db: AsyncSession = Depends(get_db)
) -> AuthService:
    return AuthService(db)
```

### 7. Security & Authentication

**Java (Spring Security)**:
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
}
```

**Python (FastAPI)**:
```python
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    # Validate JWT token
    payload = decode_token(token)
    return await get_user_from_db(payload["sub"])
```

### 8. Configuration

**Java (`application.properties`)**:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/db
spring.datasource.username=user
spring.datasource.password=pass
server.port=8080
```

**Python (`.env` + Pydantic Settings)**:
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## Database Migrations

### Before: Flyway/Liquibase
```sql
-- V1__create_users.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

### After: Alembic
```bash
# Create migration
alembic revision --autogenerate -m "create users table"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Testing Changes

### Java (JUnit)
```java
@SpringBootTest
class AuthServiceTest {
    @Autowired
    private AuthService authService;
    
    @Test
    void testRegister() {
        User user = authService.register(dto);
        assertNotNull(user.getId());
    }
}
```

### Python (pytest)
```python
@pytest.mark.asyncio
async def test_register(db_session):
    auth_service = AuthService(db_session)
    user = await auth_service.register(user_data)
    assert user.id is not None
```

## Running the Application

### Development
```bash
# Install dependencies
poetry install

# Run migrations
poetry run alembic upgrade head

# Start server
poetry run uvicorn app.main:app --reload
```

### Docker
```bash
# Build and run
docker-compose up --build

# Access API docs
http://localhost:8080/docs
```

## API Documentation

FastAPI provides automatic interactive API documentation:
- **Swagger UI**: `http://localhost:8080/docs`
- **ReDoc**: `http://localhost:8080/redoc`

## Performance Considerations

1. **Async/Await**: Python uses async/await for I/O operations
2. **Connection Pooling**: Configured in SQLAlchemy engine
3. **Caching**: Use Redis for session/cache management
4. **Background Tasks**: Use Celery for async task processing

## Next Steps

1. Convert remaining controllers to routers
2. Migrate all JPA entities to SQLAlchemy models
3. Convert integration tests
4. Set up monitoring and logging
5. Deploy to production

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy 2.0 Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
