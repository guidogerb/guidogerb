"""Bridge Gateway FastAPI app."""

from fastapi import FastAPI

app = FastAPI(title="Bridge Gateway", version="0.1.0")

@app.get("/")
async def root():
    return {"message": "Database Bridge Gateway"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8085)
