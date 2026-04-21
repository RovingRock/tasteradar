from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, JSON, Enum, DECIMAL
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.database import Base

class PlanType(str, enum.Enum):
    COUNTRY_STARTER = "country_starter"
    COUNTRY_PRO = "country_pro"
    REGIONAL_3 = "regional_3"
    REGIONAL_5 = "regional_5"
    REGIONAL_10 = "regional_10"
    ENTERPRISE = "enterprise"

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    VIEWER = "viewer"

class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    
    # Plan details
    plan_type = Column(Enum(PlanType), nullable=False, default=PlanType.COUNTRY_STARTER)
    max_users = Column(Integer, nullable=False, default=3)
    max_markets = Column(Integer, nullable=False, default=1)
    max_scans_per_month = Column(Integer, nullable=False, default=300)
    
    # Allowed countries (JSONB array like ['SG', 'MY', 'TH'])
    allowed_countries = Column(JSON, nullable=False, default=list)
    
    # Billing
    stripe_customer_id = Column(String(255), nullable=True)
    stripe_subscription_id = Column(String(255), nullable=True)
    
    # Trial
    trial_ends_at = Column(DateTime(timezone=True), nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")
    markets = relationship("Market", back_populates="organization", cascade="all, delete-orphan")
    scans = relationship("Scan", back_populates="organization", cascade="all, delete-orphan")

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    
    # Profile
    full_name = Column(String(255), nullable=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.VIEWER)
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Metadata
    last_login = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="users")

class Market(Base):
    __tablename__ = "markets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    
    country_code = Column(String(2), nullable=False)  # SG, MY, TH, etc.
    country_name = Column(String(100), nullable=False)
    
    # Tracking config
    keywords = Column(JSON, default=list)  # ["bubble tea", "ramen", ...]
    competitors = Column(JSON, default=list)  # ["McDonald's", "KFC", ...]
    
    # Status
    is_active = Column(Boolean, default=True)
    is_primary = Column(Boolean, default=False)  # First market added
    
    # Metadata
    added_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="markets")

class Scan(Base):
    __tablename__ = "scans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    
    # Scan metadata
    scan_type = Column(String(50), nullable=False)  # "restaurant_menu", "social_media", "competitor"
    country_code = Column(String(2), nullable=False)
    
    # Results (JSONB)
    restaurant_data = Column(JSON, default=dict)
    social_data = Column(JSON, default=dict)
    
    # Status
    status = Column(String(50), default="completed")  # pending, running, completed, failed
    
    # Metadata
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="scans")

class UsageLog(Base):
    __tablename__ = "usage_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    
    resource_type = Column(String(50), nullable=False)  # "scan", "social_post", "report"
    count = Column(Integer, default=0)
    
    period_start = Column(DateTime(timezone=True), nullable=False)
    period_end = Column(DateTime(timezone=True), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
