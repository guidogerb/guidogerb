"""IDS Database Normalization FastAPI app."""

from fastapi import FastAPI

app = FastAPI(title="IDS - Database Normalization Framework", version="0.1.0")

@app.get("/")
async def root():
    return {
        "message": "IDS - Database Normal Form 7 Research Framework",
        "version": "0.1.0"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8087)
