from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums
class MessageStatus(str, Enum):
    UNREAD = "unread"
    READ = "read"
    REPLIED = "replied"

class EventType(str, Enum):
    PAGE_VIEW = "page_view"
    SECTION_VIEW = "section_view"
    DOWNLOAD = "download" 
    CONTACT = "contact"
    PROJECT_VIEW = "project_view"

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: MessageStatus = MessageStatus.UNREAD
    ip_address: Optional[str] = None

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactMessageUpdate(BaseModel):
    status: MessageStatus

# Analytics Models
class AnalyticsEvent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: EventType
    section: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AnalyticsEventCreate(BaseModel):
    event_type: EventType
    section: Optional[str] = None

class AnalyticsStats(BaseModel):
    total_views: int
    section_views: Dict[str, int]
    recent_activity: List[Dict[str, Any]]
    contact_submissions: int
    downloads: int

# Portfolio Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    location: str
    email: EmailStr
    phone: str
    linkedin: str
    heroImage: str

class AboutInfo(BaseModel):
    title: str
    description: str
    backgroundImage: str

class SkillCategory(BaseModel):
    category: str
    items: List[str]

class Experience(BaseModel):
    title: str
    company: str
    type: str
    period: str
    location: str
    achievements: List[str]

class Project(BaseModel):
    id: int
    title: str
    description: str
    impact: str
    technologies: List[str]
    image: str
    category: str

class PortfolioData(BaseModel):
    personal: PersonalInfo
    about: AboutInfo
    skills: List[SkillCategory]
    experience: List[Experience] 
    projects: List[Project]

# Admin Models
class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int