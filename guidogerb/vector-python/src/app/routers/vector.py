"""
Vector database API routes.
"""

from fastapi import APIRouter, HTTPException, File, UploadFile
from app.services.vector_service import VectorService
from app.schemas.vector import (
    DocumentRequest,
    DocumentResponse,
    SearchRequest,
    SearchResponse,
    SearchResult,
    CollectionStats,
    DeleteRequest,
    SuccessResponse
)
import PyPDF2
import io

router = APIRouter()


@router.post("/documents", response_model=DocumentResponse)
async def add_document(request: DocumentRequest):
    """
    Add a document to the vector store.
    
    - **text**: Document text content
    - **metadata**: Optional metadata (key-value pairs)
    """
    service = VectorService()
    
    try:
        ids = await service.add_document(
            text=request.text,
            metadata=request.metadata
        )
        
        return DocumentResponse(
            ids=ids,
            message=f"Added {len(ids)} chunks to vector store"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/documents/pdf", response_model=DocumentResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    metadata: str = None
):
    """
    Upload and process a PDF document.
    
    - **file**: PDF file
    - **metadata**: Optional JSON metadata
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Read PDF
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        
        # Extract text
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        # Parse metadata if provided
        import json
        meta = json.loads(metadata) if metadata else {}
        meta["filename"] = file.filename
        meta["type"] = "pdf"
        
        # Add to vector store
        service = VectorService()
        ids = await service.add_document(text=text, metadata=meta)
        
        return DocumentResponse(
            ids=ids,
            message=f"Processed PDF with {len(pdf_reader.pages)} pages into {len(ids)} chunks"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search", response_model=SearchResponse)
async def search_documents(request: SearchRequest):
    """
    Search for similar documents.
    
    - **query**: Search query text
    - **n_results**: Number of results (1-50)
    - **where**: Optional metadata filter
    """
    service = VectorService()
    
    try:
        results = await service.search(
            query=request.query,
            n_results=request.n_results,
            where=request.where
        )
        
        search_results = [
            SearchResult(
                id=results["ids"][i],
                document=results["documents"][i],
                metadata=results["metadatas"][i],
                distance=results["distances"][i]
            )
            for i in range(len(results["ids"]))
        ]
        
        return SearchResponse(
            results=search_results,
            query=request.query
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/documents", response_model=SuccessResponse)
async def delete_documents(request: DeleteRequest):
    """
    Delete documents by IDs.
    
    - **ids**: List of document IDs to delete
    """
    service = VectorService()
    
    success = await service.delete_document(request.ids)
    
    if success:
        return SuccessResponse(
            success=True,
            message=f"Deleted {len(request.ids)} documents"
        )
    else:
        raise HTTPException(status_code=500, detail="Failed to delete documents")


@router.get("/stats", response_model=CollectionStats)
async def get_stats():
    """Get collection statistics."""
    service = VectorService()
    
    stats = await service.get_collection_stats()
    
    return CollectionStats(**stats)


@router.delete("/clear", response_model=SuccessResponse)
async def clear_collection():
    """Clear all documents from the collection."""
    service = VectorService()
    
    success = await service.clear_collection()
    
    if success:
        return SuccessResponse(
            success=True,
            message="Collection cleared successfully"
        )
    else:
        raise HTTPException(status_code=500, detail="Failed to clear collection")
