"""
Document embedding and storage service.
"""

from typing import List, Optional
import uuid
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from app.config import get_collection, get_config


class VectorService:
    """Service for managing document embeddings."""
    
    def __init__(self):
        self.collection = get_collection()
        self.config = get_config()
        self.embeddings = OpenAIEmbeddings(
            api_key=self.config.openai_api_key,
            model=self.config.openai_embedding_model
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
    
    async def add_document(
        self,
        text: str,
        metadata: Optional[dict] = None
    ) -> List[str]:
        """
        Add a document to the vector store.
        
        Args:
            text: Document text
            metadata: Optional metadata
            
        Returns:
            List of chunk IDs
        """
        # Split text into chunks
        chunks = self.text_splitter.split_text(text)
        
        # Generate embeddings
        embeddings = self.embeddings.embed_documents(chunks)
        
        # Generate IDs
        ids = [str(uuid.uuid4()) for _ in chunks]
        
        # Prepare metadata
        metadatas = [
            {**(metadata or {}), "chunk_index": i}
            for i in range(len(chunks))
        ]
        
        # Add to collection
        self.collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas
        )
        
        return ids
    
    async def search(
        self,
        query: str,
        n_results: int = 5,
        where: Optional[dict] = None
    ) -> dict:
        """
        Search for similar documents.
        
        Args:
            query: Search query
            n_results: Number of results to return
            where: Optional metadata filter
            
        Returns:
            Search results
        """
        # Generate query embedding
        query_embedding = self.embeddings.embed_query(query)
        
        # Search
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where=where
        )
        
        return {
            "ids": results["ids"][0],
            "documents": results["documents"][0],
            "metadatas": results["metadatas"][0],
            "distances": results["distances"][0]
        }
    
    async def delete_document(self, doc_ids: List[str]) -> bool:
        """Delete documents by IDs."""
        try:
            self.collection.delete(ids=doc_ids)
            return True
        except Exception:
            return False
    
    async def get_collection_stats(self) -> dict:
        """Get collection statistics."""
        count = self.collection.count()
        
        return {
            "name": self.collection.name,
            "count": count,
            "metadata": self.collection.metadata
        }
    
    async def clear_collection(self) -> bool:
        """Clear all documents from collection."""
        try:
            # Get all IDs
            results = self.collection.get()
            if results["ids"]:
                self.collection.delete(ids=results["ids"])
            return True
        except Exception:
            return False
