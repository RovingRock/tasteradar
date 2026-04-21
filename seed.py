"""
Seed script to populate database with demo data
Run with: python seed.py
"""

from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Organization, User, Market, Scan, PlanType
from app.auth import get_password_hash
import random

# Sample data
DEMO_PASSWORD = "Demo1234!"

DEMO_ORGS = [
    {
        "name": "McDonald's Singapore",
        "slug": "mcdonalds-sg",
        "plan_type": PlanType.COUNTRY_STARTER,
        "countries": ["SG"],
        "admin": {
            "email": "admin@mcdonalds-demo.com",
            "name": "John McDonald"
        }
    },
    {
        "name": "Starbucks Regional APAC",
        "slug": "starbucks-apac",
        "plan_type": PlanType.REGIONAL_3,
        "countries": ["SG", "MY", "TH"],
        "admin": {
            "email": "regional@starbucks-demo.com",
            "name": "Sarah Chen"
        }
    },
    {
        "name": "KFC Malaysia",
        "slug": "kfc-my",
        "plan_type": PlanType.COUNTRY_PRO,
        "countries": ["MY"],
        "admin": {
            "email": "admin@kfc-demo.com",
            "name": "Ahmad Hassan"
        }
    }
]

RESTAURANTS_BY_COUNTRY = {
    "SG": [
        {"name": "Tim Ho Wan", "category": "Dim Sum", "location": "Orchard"},
        {"name": "Din Tai Fung", "category": "Taiwanese", "location": "Marina Bay"},
        {"name": "Paradise Dynasty", "category": "Chinese", "location": "ION Orchard"},
        {"name": "Crystal Jade", "category": "Cantonese", "location": "Takashimaya"},
        {"name": "Ichiban Boshi", "category": "Japanese", "location": "VivoCity"},
        {"name": "Tonkotsu King", "category": "Ramen", "location": "Clarke Quay"},
        {"name": "Shake Shack", "category": "Burgers", "location": "Jewel"},
        {"name": "Guzman y Gomez", "category": "Mexican", "location": "Bugis"},
        {"name": "Poke Theory", "category": "Poke Bowl", "location": "Tanjong Pagar"},
        {"name": "Tiger Sugar", "category": "Bubble Tea", "location": "Somerset"},
    ],
    "MY": [
        {"name": "Mamak 24/7", "category": "Mamak", "location": "Bukit Bintang"},
        {"name": "Jollibee", "category": "Fast Food", "location": "Mid Valley"},
        {"name": "Secret Recipe", "category": "Cafe", "location": "The Gardens"},
        {"name": "OldTown White Coffee", "category": "Cafe", "location": "1 Utama"},
        {"name": "Nando's", "category": "Chicken", "location": "Pavilion KL"},
        {"name": "Sushi King", "category": "Japanese", "location": "KLCC"},
        {"name": "Boat Noodle", "category": "Thai", "location": "Sunway Pyramid"},
        {"name": "The Alley", "category": "Bubble Tea", "location": "Bangsar"},
        {"name": "Tealive", "category": "Bubble Tea", "location": "IOI City Mall"},
        {"name": "MyBurgerLab", "category": "Burgers", "location": "Cyberjaya"},
    ],
    "TH": [
        {"name": "Greyhound Cafe", "category": "Thai Fusion", "location": "Siam Paragon"},
        {"name": "Yum Saap", "category": "Thai Street Food", "location": "EmQuartier"},
        {"name": "After You Dessert Cafe", "category": "Desserts", "location": "CentralWorld"},
        {"name": "Somtam Nua", "category": "Isaan", "location": "Siam Square"},
        {"name": "Crab & Claw", "category": "Seafood", "location": "Thonglor"},
        {"name": "Kuay Teow Kua Gai", "category": "Noodles", "location": "Sukhumvit"},
        {"name": "Tiger Sugar TH", "category": "Bubble Tea", "location": "Siam Center"},
        {"name": "KFC Thailand", "category": "Fast Food", "location": "MBK Center"},
        {"name": "Bonchon", "category": "Korean Fried Chicken", "location": "Terminal 21"},
        {"name": "Pepper Lunch", "category": "Teppanyaki", "location": "Platinum Fashion Mall"},
    ]
}

SOCIAL_POSTS = [
    {"text": "Just tried the new bubble tea flavor at Tiger Sugar! 🧋 #bubbletea #singapore", "platform": "Instagram"},
    {"text": "Korean fried chicken is my new obsession 😍", "platform": "TikTok"},
    {"text": "Best ramen in Singapore hands down 🍜", "platform": "Twitter"},
    {"text": "Poke bowls are perfect for healthy lunch options!", "platform": "Instagram"},
    {"text": "This spicy mala is making me cry but I can't stop eating 🔥", "platform": "TikTok"},
]

def create_seed_data():
    """Create demo organizations, users, markets, and scans"""
    
    db: Session = SessionLocal()
    
    try:
        # Clear existing data (careful in production!)
        print("Clearing existing data...")
        db.query(Scan).delete()
        db.query(Market).delete()
        db.query(User).delete()
        db.query(Organization).delete()
        db.commit()
        
        print("Creating demo organizations and users...")
        
        for org_data in DEMO_ORGS:
            # Set plan limits
            plan_limits = {
                PlanType.COUNTRY_STARTER: {"users": 3, "markets": 1, "scans": 300},
                PlanType.COUNTRY_PRO: {"users": 10, "markets": 1, "scans": 1000},
                PlanType.REGIONAL_3: {"users": 15, "markets": 3, "scans": 1500},
                PlanType.REGIONAL_5: {"users": 30, "markets": 5, "scans": 3000},
                PlanType.REGIONAL_10: {"users": 999, "markets": 10, "scans": 10000},
            }
            
            limits = plan_limits[org_data["plan_type"]]
            
            # Create organization
            org = Organization(
                name=org_data["name"],
                slug=org_data["slug"],
                plan_type=org_data["plan_type"],
                max_users=limits["users"],
                max_markets=limits["markets"],
                max_scans_per_month=limits["scans"],
                allowed_countries=org_data["countries"]
            )
            db.add(org)
            db.flush()
            
            # Create admin user
            user = User(
                organization_id=org.id,
                email=org_data["admin"]["email"],
                hashed_password=get_password_hash(DEMO_PASSWORD),
                full_name=org_data["admin"]["name"],
                role="admin",
                is_active=True,
                is_verified=True
            )
            db.add(user)
            
            # Create markets for each country
            for idx, country_code in enumerate(org_data["countries"]):
                country_names = {"SG": "Singapore", "MY": "Malaysia", "TH": "Thailand"}
                
                market = Market(
                    organization_id=org.id,
                    country_code=country_code,
                    country_name=country_names[country_code],
                    keywords=["bubble tea", "ramen", "poke bowl", "fried chicken"],
                    competitors=["McDonald's", "KFC", "Burger King", "Starbucks"],
                    is_primary=(idx == 0)
                )
                db.add(market)
                db.flush()
                
                # Create sample scans for past 30 days
                for day_offset in range(0, 30, 3):  # Every 3 days
                    scan_date = datetime.utcnow() - timedelta(days=day_offset)
                    
                    # Restaurant scan
                    restaurants = RESTAURANTS_BY_COUNTRY.get(country_code, [])
                    sample_restaurants = random.sample(restaurants, min(5, len(restaurants)))
                    
                    restaurant_data = {
                        "scan_date": scan_date.isoformat(),
                        "restaurants": sample_restaurants,
                        "total_found": len(sample_restaurants)
                    }
                    
                    # Social media scan
                    sample_posts = random.sample(SOCIAL_POSTS, min(3, len(SOCIAL_POSTS)))
                    social_data = {
                        "scan_date": scan_date.isoformat(),
                        "posts": sample_posts,
                        "total_mentions": len(sample_posts) * random.randint(10, 50)
                    }
                    
                    scan = Scan(
                        organization_id=org.id,
                        scan_type="combined",
                        country_code=country_code,
                        restaurant_data=restaurant_data,
                        social_data=social_data,
                        status="completed",
                        scanned_at=scan_date
                    )
                    db.add(scan)
        
        db.commit()
        
        print("\n" + "="*60)
        print("✅ SEED DATA CREATED SUCCESSFULLY!")
        print("="*60)
        print("\nDemo Accounts:")
        print("-" * 60)
        for org_data in DEMO_ORGS:
            print(f"\nOrganization: {org_data['name']}")
            print(f"Email: {org_data['admin']['email']}")
            print(f"Password: {DEMO_PASSWORD}")
            print(f"Plan: {org_data['plan_type'].value}")
            print(f"Countries: {', '.join(org_data['countries'])}")
        print("\n" + "="*60)
        
    except Exception as e:
        print(f"❌ Error creating seed data: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    # Create tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    # Seed data
    create_seed_data()
