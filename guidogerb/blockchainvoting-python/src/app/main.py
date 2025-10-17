"""
Blockchain Voting FastAPI application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Blockchain Voting System",
    version="0.1.0",
    description="Secure voting system using blockchain technology"
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
from app.routers import blockchain
app.include_router(blockchain.router, prefix="/api/blockchain", tags=["blockchain"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Blockchain Voting System API",
        "version": "0.1.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081)
