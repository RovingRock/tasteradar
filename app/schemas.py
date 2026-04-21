from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from app.models import PlanType, UserRole

# ===== AUTH SCHEMAS =====

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserSignup(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    organization_name: str
    plan_type: PlanType = PlanType.COUNTRY_STARTER

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[UUID] = None
    organization_id: Optional[UUID] = None

# ===== USER SCHEMAS =====

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.VIEWER

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: UUID
    organization_id: UUID
    is_active: bool
    is_verified: bool
    last_login: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# ===== ORGANIZATION SCHEMAS =====

class OrganizationBase(BaseModel):
    name: str
    plan_type: PlanType

class OrganizationCreate(OrganizationBase):
    allowed_countries: List[str] = []

class OrganizationResponse(OrganizationBase):
    id: UUID
    slug: str
    max_users: int
    max_markets: int
    max_scans_per_month: int
    allowed_countries: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# ===== MARKET SCHEMAS =====

class MarketBase(BaseModel):
    country_code: str = Field(..., min_length=2, max_length=2)
    country_name: str
    keywords: List[str] = []
    competitors: List[str] = []

class MarketCreate(MarketBase):
    pass

class MarketResponse(MarketBase):
    id: UUID
    organization_id: UUID
    is_active: bool
    is_primary: bool
    added_at: datetime
    
    class Config:
        from_attributes = True

# ===== SCAN SCHEMAS =====

class ScanBase(BaseModel):
    scan_type: str
    country_code: str

class ScanCreate(ScanBase):
    restaurant_data: Optional[dict] = {}
    social_data: Optional[dict] = {}

class ScanResponse(ScanBase):
    id: UUID
    organization_id: UUID
    restaurant_data: dict
    social_data: dict
    status: str
    scanned_at: datetime
    
    class Config:
        from_attributes = True

# ===== DASHBOARD SCHEMAS =====

class DashboardStats(BaseModel):
    total_scans: int
    scans_this_month: int
    active_markets: int
    total_restaurants_tracked: int
    social_mentions_count: int
    
class TrendingItem(BaseModel):
    name: str
    category: str
    mentions: int
    growth_rate: float
    
class DashboardResponse(BaseModel):
    stats: DashboardStats
    trending_items: List[TrendingItem]
    recent_scans: List[ScanResponse]
