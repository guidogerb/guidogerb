"""Model Generator FastAPI app."""

from fastapi import FastAPI
from pydantic import BaseModel
from jinja2 import Template

app = FastAPI(title="Model Generator", version="0.1.0")

class FieldDefinition(BaseModel):
    name: str
    type: str
    nullable: bool = False

class ModelRequest(BaseModel):
    class_name: str
    fields: list[FieldDefinition]

PYDANTIC_TEMPLATE = """
from pydantic import BaseModel
from typing import Optional

class {{ class_name }}(BaseModel):
{% for field in fields %}
    {{ field.name }}: {% if field.nullable %}Optional[{{ field.type }}]{% else %}{{ field.type }}{% endif %}
{% endfor %}
"""

@app.post("/api/generate/pydantic")
async def generate_pydantic(request: ModelRequest):
    """Generate Pydantic model."""
    template = Template(PYDANTIC_TEMPLATE)
    code = template.render(class_name=request.class_name, fields=request.fields)
    return {"code": code}

@app.get("/")
async def root():
    return {"message": "Model Generator Service"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8086)
