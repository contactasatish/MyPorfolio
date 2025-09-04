from fastapi import Request
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def get_client_ip(request: Request) -> Optional[str]:
    """Extract client IP address from request."""
    # Check for forwarded IP first (common in production behind proxies)
    forwarded_ip = request.headers.get("X-Forwarded-For")
    if forwarded_ip:
        # X-Forwarded-For can contain multiple IPs, get the first one
        return forwarded_ip.split(",")[0].strip()
    
    # Check for real IP header
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    
    # Fallback to direct client IP
    if hasattr(request.client, "host"):
        return request.client.host
    
    return None

def get_user_agent(request: Request) -> Optional[str]:
    """Extract user agent from request."""
    return request.headers.get("User-Agent")

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage."""
    import re
    # Remove any characters that aren't alphanumeric, dots, dashes, or underscores
    sanitized = re.sub(r'[^\w\-_\.]', '', filename)
    return sanitized[:255]  # Limit length

def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format."""
    if size_bytes == 0:
        return "0B"
    
    size_names = ["B", "KB", "MB", "GB"]
    import math
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return f"{s} {size_names[i]}"