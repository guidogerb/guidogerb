"""
Filesystem scanning and hashing utilities.
"""

import hashlib
from pathlib import Path
from typing import Optional, Dict
from datetime import datetime
import os


def get_file_checksum(file_path: Path) -> str:
    """
    Calculate SHA-256 hash of a file.
    
    Args:
        file_path: Path to the file
        
    Returns:
        Hexadecimal hash string
    """
    sha256 = hashlib.sha256()
    
    with open(file_path, 'rb') as f:
        # Read file in chunks to handle large files
        for chunk in iter(lambda: f.read(4096), b''):
            sha256.update(chunk)
    
    return sha256.hexdigest()


def get_file_metadata(file_path: Path) -> Dict:
    """
    Get file metadata including timestamps and size.
    
    Args:
        file_path: Path to the file
        
    Returns:
        Dictionary with file metadata
    """
    stats = os.stat(file_path)
    
    return {
        "size": stats.st_size,
        "created": datetime.fromtimestamp(stats.st_ctime),
        "modified": datetime.fromtimestamp(stats.st_mtime),
        "accessed": datetime.fromtimestamp(stats.st_atime)
    }


def scan_directory(
    base_path: str,
    max_depth: Optional[int] = None
) -> list[Path]:
    """
    Recursively scan directory for files.
    
    Args:
        base_path: Root directory to scan
        max_depth: Maximum recursion depth (None for unlimited)
        
    Returns:
        List of file paths
    """
    base = Path(base_path)
    
    if max_depth is None:
        # Unlimited depth
        return [p for p in base.rglob('*') if p.is_file()]
    else:
        # Limited depth
        files = []
        for p in base.rglob('*'):
            if p.is_file():
                depth = len(p.relative_to(base).parts) - 1
                if depth <= max_depth:
                    files.append(p)
        return files


def get_file_extension(file_path: Path) -> str:
    """Get file extension without the dot."""
    return file_path.suffix.lstrip('.').lower()


def convert_path_windows_to_linux(windows_path: str, base_windows: str, base_linux: str) -> str:
    """Convert Windows path to Linux path."""
    relative = windows_path.replace(base_windows, "").lstrip("\\")
    linux_path = base_linux + "/" + relative.replace("\\", "/")
    return linux_path
