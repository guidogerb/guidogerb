"""
Celery tasks for filesystem scanning.
"""

from celery import Celery
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.file_info import FileInfo, Exts
from app.utils.file_utils import (
    scan_directory,
    get_file_checksum,
    get_file_metadata,
    get_file_extension,
    convert_path_windows_to_linux
)
from app.config import get_config
import logging

logger = logging.getLogger(__name__)

config = get_config()

# Celery app
celery_app = Celery(
    "fsutil",
    broker=f"redis://{config.redis_host}:{config.redis_port}/0",
    backend=f"redis://{config.redis_host}:{config.redis_port}/0"
)


@celery_app.task
def scan_and_index_directory(base_path: str, base_linux_path: str = ""):
    """
    Scan directory and index all files.
    
    Args:
        base_path: Root directory to scan (Windows or Linux path)
        base_linux_path: Equivalent Linux path for cross-platform support
    """
    logger.info(f"Starting scan of {base_path}")
    
    # Create database session
    engine = create_engine(config.database_url)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Scan directory
        files = scan_directory(base_path)
        logger.info(f"Found {len(files)} files")
        
        indexed = 0
        errors = 0
        
        for file_path in files:
            try:
                # Get or create extension
                ext_name = get_file_extension(file_path)
                ext = session.query(Exts).filter_by(ext=ext_name).first()
                
                if not ext:
                    ext = Exts(ext=ext_name, description="")
                    session.add(ext)
                    session.flush()  # Get the ID
                
                # Get file metadata
                metadata = get_file_metadata(file_path)
                sha_hash = get_file_checksum(file_path)
                
                # Create FileInfo
                file_info = FileInfo(
                    file_name=file_path.name,
                    original_windows_file_location=str(file_path),
                    original_linux_file_location=(
                        convert_path_windows_to_linux(str(file_path), base_path, base_linux_path)
                        if base_linux_path else None
                    ),
                    sha_hash=sha_hash,
                    file_size=metadata["size"],
                    created=metadata["created"],
                    modified=metadata["modified"],
                    accessed=metadata["accessed"],
                    ext_id=ext.id
                )
                
                session.add(file_info)
                session.commit()
                
                indexed += 1
                
                if indexed % 100 == 0:
                    logger.info(f"Indexed {indexed} files...")
                
            except Exception as e:
                logger.error(f"Error processing {file_path}: {e}")
                errors += 1
                session.rollback()
        
        logger.info(f"Scan complete. Indexed: {indexed}, Errors: {errors}")
        
    finally:
        session.close()
    
    return {
        "indexed": indexed,
        "errors": errors,
        "total": len(files)
    }


@celery_app.task
def find_duplicates():
    """Find duplicate files by SHA hash."""
    engine = create_engine(get_config().database_url)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Query for duplicate hashes
        from sqlalchemy import func
        
        duplicates = session.query(
            FileInfo.sha_hash,
            func.count(FileInfo.id).label('count')
        ).group_by(
            FileInfo.sha_hash
        ).having(
            func.count(FileInfo.id) > 1
        ).all()
        
        result = []
        for sha_hash, count in duplicates:
            files = session.query(FileInfo).filter_by(sha_hash=sha_hash).all()
            result.append({
                "hash": sha_hash,
                "count": count,
                "files": [f.original_windows_file_location for f in files]
            })
        
        return result
        
    finally:
        session.close()
