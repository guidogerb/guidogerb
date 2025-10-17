"""OpenAI API routes."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import openai
import os

router = APIRouter()
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7

@router.post("/chat/completions")
async def chat_completion(request: ChatRequest):
    """Chat completion endpoint."""
    response = openai.ChatCompletion.create(
        model=request.model,
        messages=[{"role": m.role, "content": m.content} for m in request.messages],
        temperature=request.temperature
    )
    return response

@router.get("/models")
async def list_models():
    """List available models."""
    models = openai.Model.list()
    return models
