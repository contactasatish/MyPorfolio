from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta
import shutil

# Import our custom modules
from models import *
from database import Database
from auth import verify_password, create_access_token, verify_token, get_password_hash
from utils import get_client_ip, get_user_agent, sanitize_filename

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db_instance = Database(client, os.environ['DB_NAME'])

# Create the main app
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# File storage directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Dependency to get current admin user
async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    username = verify_token(credentials.credentials)
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return username

# Initialize default admin user (in production, this should be done via migration)
async def initialize_admin():
    admin = await db_instance.get_admin_user("admin")
    if not admin:
        admin_user = AdminUser(
            username="admin",
            password_hash=get_password_hash("admin123")  # Change this in production!
        )
        await client[os.environ['DB_NAME']].admin_users.insert_one(admin_user.dict())
        logging.info("Default admin user created")

# Routes

@api_router.get("/")
async def root():
    return {"message": "Portfolio API v1.0.0", "status": "active"}

# Portfolio Data Routes
@api_router.get("/portfolio", response_model=PortfolioData)
async def get_portfolio_data(request: Request):
    # Track analytics
    event = AnalyticsEvent(
        event_type=EventType.PAGE_VIEW,
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request)
    )
    await db_instance.create_analytics_event(event)
    
    # Get portfolio data from database, fallback to mock data if not found
    portfolio = await db_instance.get_portfolio_data()
    if not portfolio:
        # Return mock data if no data in database
        from data.mock import portfolioData
        return portfolioData
    return portfolio

@api_router.put("/portfolio")
async def update_portfolio_data(
    portfolio_data: PortfolioData,
    admin: str = Depends(get_current_admin)
):
    success = await db_instance.update_portfolio_data(portfolio_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update portfolio data")
    return {"message": "Portfolio data updated successfully"}

# Contact Routes
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(
    contact_data: ContactMessageCreate,
    request: Request
):
    # Create contact message with IP tracking
    message = ContactMessage(
        **contact_data.dict(),
        ip_address=get_client_ip(request)
    )
    
    # Save to database
    created_message = await db_instance.create_contact_message(message)
    
    # Track analytics
    event = AnalyticsEvent(
        event_type=EventType.CONTACT,
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request)
    )
    await db_instance.create_analytics_event(event)
    
    return created_message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    admin: str = Depends(get_current_admin)
):
    messages = await db_instance.get_contact_messages(skip, limit)
    return messages

@api_router.put("/contact/{message_id}")
async def update_contact_message(
    message_id: str,
    update_data: ContactMessageUpdate,
    admin: str = Depends(get_current_admin)
):
    success = await db_instance.update_contact_message(message_id, update_data)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message updated successfully"}

# Analytics Routes
@api_router.post("/analytics/track")
async def track_analytics_event(
    event_data: AnalyticsEventCreate,
    request: Request
):
    event = AnalyticsEvent(
        **event_data.dict(),
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request)
    )
    await db_instance.create_analytics_event(event)
    return {"message": "Event tracked successfully"}

@api_router.get("/analytics/stats", response_model=AnalyticsStats)
async def get_analytics_stats(
    days: int = 30,
    admin: str = Depends(get_current_admin)
):
    stats = await db_instance.get_analytics_stats(days)
    return stats

# File Management Routes
@api_router.get("/resume/download")
async def download_resume(request: Request):
    resume_path = UPLOAD_DIR / "resume.pdf"
    
    if not resume_path.exists():
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Track download analytics
    event = AnalyticsEvent(
        event_type=EventType.DOWNLOAD,
        section="resume",
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request)
    )
    await db_instance.create_analytics_event(event)
    
    return FileResponse(
        path=resume_path,
        filename="Satish_Kumar_Resume.pdf",
        media_type="application/pdf"
    )

@api_router.post("/resume/upload")
async def upload_resume(
    file: UploadFile = File(...),
    admin: str = Depends(get_current_admin)
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Save uploaded file
    resume_path = UPLOAD_DIR / "resume.pdf"
    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"message": "Resume uploaded successfully", "filename": file.filename}

# Admin Authentication Routes
@api_router.post("/admin/login", response_model=AdminToken)
async def admin_login(login_data: AdminLogin):
    # Get admin user
    admin = await db_instance.get_admin_user(login_data.username)
    if not admin or not verify_password(login_data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Update last login
    await db_instance.update_admin_last_login(login_data.username)
    
    # Create access token
    access_token = create_access_token(data={"sub": admin.username})
    
    return AdminToken(
        access_token=access_token,
        expires_in=60 * 60  # 1 hour
    )

@api_router.get("/admin/verify")
async def verify_admin_token(admin: str = Depends(get_current_admin)):
    return {"message": "Token is valid", "username": admin}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
