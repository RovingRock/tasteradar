from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, Organization, Market
from app.schemas import OrganizationResponse, MarketResponse, MarketCreate
from app.auth import get_current_user, require_role

router = APIRouter()

@router.get("/me", response_model=OrganizationResponse)
def get_my_organization(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's organization details"""
    
    organization = db.query(Organization).filter(
        Organization.id == current_user.organization_id
    ).first()
    
    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    return organization

@router.get("/markets", response_model=List[MarketResponse])
def get_organization_markets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all markets for current organization"""
    
    markets = db.query(Market).filter(
        Market.organization_id == current_user.organization_id
    ).all()
    
    return markets

@router.post("/markets", response_model=MarketResponse)
def add_market(
    market_data: MarketCreate,
    current_user: User = Depends(require_role("admin")),
    db: Session = Depends(get_db)
):
    """Add a new market to track (admin only)"""
    
    organization = db.query(Organization).filter(
        Organization.id == current_user.organization_id
    ).first()
    
    # Check if org has reached market limit
    current_market_count = db.query(Market).filter(
        Market.organization_id == current_user.organization_id
    ).count()
    
    if current_market_count >= organization.max_markets:
        raise HTTPException(
            status_code=403,
            detail=f"Market limit reached ({organization.max_markets}). Upgrade your plan to add more markets."
        )
    
    # Check if market already exists
    existing_market = db.query(Market).filter(
        Market.organization_id == current_user.organization_id,
        Market.country_code == market_data.country_code.upper()
    ).first()
    
    if existing_market:
        raise HTTPException(
            status_code=400,
            detail=f"Market {market_data.country_code} already exists"
        )
    
    # Create market
    is_first_market = current_market_count == 0
    
    market = Market(
        organization_id=current_user.organization_id,
        country_code=market_data.country_code.upper(),
        country_name=market_data.country_name,
        keywords=market_data.keywords,
        competitors=market_data.competitors,
        is_primary=is_first_market
    )
    
    db.add(market)
    
    # Update organization's allowed_countries
    if market_data.country_code.upper() not in organization.allowed_countries:
        organization.allowed_countries.append(market_data.country_code.upper())
    
    db.commit()
    db.refresh(market)
    
    return market

@router.delete("/markets/{market_id}")
def remove_market(
    market_id: str,
    current_user: User = Depends(require_role("admin")),
    db: Session = Depends(get_db)
):
    """Remove a market (admin only)"""
    
    market = db.query(Market).filter(
        Market.id == market_id,
        Market.organization_id == current_user.organization_id
    ).first()
    
    if not market:
        raise HTTPException(status_code=404, detail="Market not found")
    
    db.delete(market)
    db.commit()
    
    return {"message": "Market removed successfully"}
