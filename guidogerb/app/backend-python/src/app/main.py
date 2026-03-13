"""
Main FastAPI application entry point.
Converted from Spring Boot Application.java
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db, close_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events.
    Replaces Spring Boot @PostConstruct and @PreDestroy
    """
    # Startup
    print(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    await init_db()
    yield
    # Shutdown
    print("Shutting down...")
    await close_db()


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="GuidoGerb Backend API - Converted from Spring Boot to FastAPI",
    debug=settings.DEBUG,
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }


@app.get("/", tags=["root"])
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "redoc": "/redoc",
    }


# Import and include routers
from app.routers import auth, users

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8080,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
