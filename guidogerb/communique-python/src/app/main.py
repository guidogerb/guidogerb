"""
OpenAI FastAPI service.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Communique", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import openai as openai_router
app.include_router(openai_router.router, prefix="/api", tags=["openai"])

@app.get("/")
async def root():
    return {"message": "Communique OpenAI Service"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8084)
