"""
Vector Database FastAPI application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_config

config = get_config()

app = FastAPI(
    title=config.app_name,
    version=config.app_version,
    description="RAG and vector search service with ChromaDB"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from app.routers import vector
app.include_router(vector.router, prefix="/api/vector", tags=["vector"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": config.app_name,
        "version": config.app_version,
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8082)
