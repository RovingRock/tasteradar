# TasteRadar Backend API

Sensory Intelligence Platform - Backend API built with FastAPI

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Set up environment variables:**
Create `.env` file (already included) and update if needed:
```
DATABASE_URL=your_railway_postgres_url
REDIS_URL=your_railway_redis_url
SECRET_KEY=your-secret-key
```

3. **Run database migrations:**
```bash
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

4. **Seed demo data:**
```bash
python seed.py
```

5. **Start the server:**
```bash
uvicorn app.main:app --reload
```

API will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

---

## 🌐 Railway Deployment

### Step 1: Create New Service on Railway

1. Go to your Railway dashboard
2. Click "New" → "Empty Service"
3. Name it: "foodintel-backend"

### Step 2: Connect to GitHub

1. Push this code to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. In Railway service settings:
   - Click "Connect to GitHub"
   - Select your repository
   - Railway will auto-detect Python and deploy

### Step 3: Add Environment Variables

In Railway service → Variables tab, add:

```
DATABASE_URL = postgresql://postgres:XVPEPpqajCLmyMuEeplgMpglVDFohxRd@shinkansen.proxy.rlwy.net:36549/railway

REDIS_URL = redis://default:UEuAWyFZmciWYTxnyzMzFeQLQriYOpmN@shinkansen.proxy.rlwy.net:48551

SECRET_KEY = foodintel-secret-key-change-in-production-min-32-characters-long

API_V1_PREFIX = /api/v1

PROJECT_NAME = FoodIntel

ENVIRONMENT = production

CORS_ORIGINS = http://localhost:3000,https://your-vercel-app.vercel.app
```

### Step 4: Deploy

Railway will automatically deploy when you push to GitHub!

### Step 5: Seed Demo Data

After first deployment, run seed script:

1. Go to Railway service → Settings
2. Click "Service Domain" to generate a public URL
3. Open Railway service terminal (or use local terminal):
```bash
railway run python seed.py
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new organization
- `POST /api/v1/auth/login` - Login with email/password
- `GET /api/v1/auth/me` - Get current user info

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/scans` - Get organization scans

### Organizations
- `GET /api/v1/organizations/me` - Get organization details
- `GET /api/v1/organizations/markets` - Get tracked markets
- `POST /api/v1/organizations/markets` - Add new market (admin only)

---

## 🧪 Demo Accounts

After running `seed.py`, use these accounts:

**McDonald's Singapore (Country Starter)**
- Email: `admin@mcdonalds-demo.com`
- Password: `Demo1234!`
- Plan: Country Starter (Singapore only)

**Starbucks Regional APAC (Regional 3)**
- Email: `regional@starbucks-demo.com`
- Password: `Demo1234!`
- Plan: Regional 3 (SG, MY, TH)

**KFC Malaysia (Country Pro)**
- Email: `admin@kfc-demo.com`
- Password: `Demo1234!`
- Plan: Country Pro (Malaysia only)

---

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Primary database
- **Redis** - Caching and task queue
- **JWT** - Authentication tokens
- **Pydantic** - Data validation

---

## 📁 Project Structure

```
foodintel-backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app initialization
│   ├── config.py        # Configuration settings
│   ├── database.py      # Database connection
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── auth.py          # Authentication utilities
│   └── routers/
│       ├── auth.py      # Auth endpoints
│       ├── dashboard.py # Dashboard endpoints
│       └── organizations.py # Organization endpoints
├── seed.py              # Demo data seed script
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
├── Procfile             # Railway process file
└── README.md
```

---

## 🔒 Security Notes

- Change `SECRET_KEY` in production to a random 32+ character string
- Never commit `.env` file to Git
- Use environment variables for all sensitive data
- Enable HTTPS in production (Railway does this automatically)

---

## 📈 Next Steps

1. ✅ Deploy backend to Railway
2. ⏳ Build React frontend
3. ⏳ Connect frontend to backend API
4. ⏳ Add Apify scraper integration
5. ⏳ Add Stripe billing
6. ⏳ Add email notifications

---

## 🐛 Troubleshooting

**Database connection error?**
- Check DATABASE_URL is correct in Railway variables
- Ensure PostgreSQL service is running

**Import errors?**
- Run `pip install -r requirements.txt`

**Seed script fails?**
- Check database connection
- Ensure tables are created first

---

Built with ❤️ using FastAPI
