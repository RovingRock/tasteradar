from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from typing import List
from app.database import get_db
from app.models import User, Scan, Market
from app.schemas import DashboardResponse, DashboardStats, TrendingItem, ScanResponse
from app.auth import get_current_user

router = APIRouter()

@router.get("/stats", response_model=DashboardResponse)
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics and data"""
    
    org_id = current_user.organization_id
    
    # Total scans
    total_scans = db.query(func.count(Scan.id)).filter(
        Scan.organization_id == org_id
    ).scalar() or 0
    
    # Scans this month
    first_day_of_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    scans_this_month = db.query(func.count(Scan.id)).filter(
        and_(
            Scan.organization_id == org_id,
            Scan.scanned_at >= first_day_of_month
        )
    ).scalar() or 0
    
    # Active markets
    active_markets = db.query(func.count(Market.id)).filter(
        and_(
            Market.organization_id == org_id,
            Market.is_active == True
        )
    ).scalar() or 0
    
    # Calculate total restaurants from scans
    total_restaurants = 0
    social_mentions = 0
    
    scans = db.query(Scan).filter(Scan.organization_id == org_id).all()
    for scan in scans:
        if scan.restaurant_data and isinstance(scan.restaurant_data, dict):
            total_restaurants += len(scan.restaurant_data.get('restaurants', []))
        if scan.social_data and isinstance(scan.social_data, dict):
            social_mentions += len(scan.social_data.get('posts', []))
    
    # Get trending items (mock data for MVP)
    trending_items = [
        TrendingItem(
            name="Bubble Tea",
            category="Beverages",
            mentions=487,
            growth_rate=23.5
        ),
        TrendingItem(
            name="Spicy Ramen",
            category="Noodles",
            mentions=342,
            growth_rate=18.2
        ),
        TrendingItem(
            name="Poke Bowl",
            category="Rice Bowls",
            mentions=298,
            growth_rate=15.7
        ),
        TrendingItem(
            name="Korean Fried Chicken",
            category="Fried Chicken",
            mentions=276,
            growth_rate=12.3
        ),
    ]
    
    # Get recent scans (last 10)
    recent_scans = db.query(Scan).filter(
        Scan.organization_id == org_id
    ).order_by(Scan.scanned_at.desc()).limit(10).all()
    
    stats = DashboardStats(
        total_scans=total_scans,
        scans_this_month=scans_this_month,
        active_markets=active_markets,
        total_restaurants_tracked=total_restaurants,
        social_mentions_count=social_mentions
    )
    
    return DashboardResponse(
        stats=stats,
        trending_items=trending_items,
        recent_scans=[ScanResponse.from_orm(scan) for scan in recent_scans]
    )

@router.get("/scans", response_model=List[ScanResponse])
def get_scans(
    country_code: str = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get organization's scans with optional filtering"""
    
    query = db.query(Scan).filter(Scan.organization_id == current_user.organization_id)
    
    if country_code:
        query = query.filter(Scan.country_code == country_code)
    
    scans = query.order_by(Scan.scanned_at.desc()).limit(limit).all()
    
    return [ScanResponse.from_orm(scan) for scan in scans]
