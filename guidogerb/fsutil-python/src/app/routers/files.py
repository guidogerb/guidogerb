"""
API routes for filesystem operations.
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Optional
from app.tasks.file_tasks import scan_and_index_directory, find_duplicates
from celery.result import AsyncResult

router = APIRouter()


class ScanRequest(BaseModel):
    """Request to scan a directory."""
    path: str = Field(..., description="Directory path to scan")
    linux_path: Optional[str] = Field(None, description="Equivalent Linux path")


class ScanResponse(BaseModel):
    """Response for scan request."""
    task_id: str
    message: str


class TaskStatusResponse(BaseModel):
    """Response for task status."""
    task_id: str
    status: str
    result: Optional[dict] = None


@router.post("/scan", response_model=ScanResponse)
async def scan_directory_endpoint(request: ScanRequest):
    """
    Start a directory scan task.
    
    - **path**: Directory to scan
    - **linux_path**: Optional Linux equivalent path
    """
    task = scan_and_index_directory.delay(request.path, request.linux_path or "")
    
    return ScanResponse(
        task_id=task.id,
        message=f"Scan started for {request.path}"
    )


@router.get("/task/{task_id}", response_model=TaskStatusResponse)
async def get_task_status(task_id: str):
    """
    Get the status of a scan task.
    
    - **task_id**: Task identifier
    """
    task = AsyncResult(task_id)
    
    return TaskStatusResponse(
        task_id=task_id,
        status=task.status,
        result=task.result if task.ready() else None
    )


@router.post("/duplicates")
async def find_duplicate_files():
    """Find duplicate files by SHA hash."""
    task = find_duplicates.delay()
    
    return {
        "task_id": task.id,
        "message": "Duplicate search started"
    }
