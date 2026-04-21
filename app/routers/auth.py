from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models import User, Organization, PlanType
from app.schemas import UserSignup, UserLogin, Token, UserResponse
from app.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)
import re

router = APIRouter()

def create_slug(name: str) -> str:
    """Create URL-safe slug from organization name"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    """Register a new user and organization"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create organization
    org_slug = create_slug(user_data.organization_name)
    
    # Check if slug exists, add number if needed
    base_slug = org_slug
    counter = 1
    while db.query(Organization).filter(Organization.slug == org_slug).first():
        org_slug = f"{base_slug}-{counter}"
        counter += 1
    
    # Set plan limits
    plan_limits = {
        PlanType.COUNTRY_STARTER: {"users": 3, "markets": 1, "scans": 300},
        PlanType.COUNTRY_PRO: {"users": 10, "markets": 1, "scans": 1000},
        PlanType.REGIONAL_3: {"users": 15, "markets": 3, "scans": 1500},
        PlanType.REGIONAL_5: {"users": 30, "markets": 5, "scans": 3000},
        PlanType.REGIONAL_10: {"users": 999, "markets": 10, "scans": 10000},
        PlanType.ENTERPRISE: {"users": 9999, "markets": 999, "scans": 999999},
    }
    
    limits = plan_limits.get(user_data.plan_type, plan_limits[PlanType.COUNTRY_STARTER])
    
    organization = Organization(
        name=user_data.organization_name,
        slug=org_slug,
        plan_type=user_data.plan_type,
        max_users=limits["users"],
        max_markets=limits["markets"],
        max_scans_per_month=limits["scans"],
        allowed_countries=[]
    )
    
    db.add(organization)
    db.flush()  # Get organization ID
    
    # Create admin user
    hashed_password = get_password_hash(user_data.password)
    
    user = User(
        organization_id=organization.id,
        email=user_data.email,
        hashed_password=hashed_password,
        full_name=user_data.full_name,
        role="admin",
        is_active=True,
        is_verified=True  # Auto-verify for MVP
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create access token
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "org_id": str(organization.id)
        }
    )
    
    return Token(access_token=access_token)

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login with email and password"""
    
    # Find user
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "org_id": str(user.organization_id)
        }
    )
    
    return Token(access_token=access_token)

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user
