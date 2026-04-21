# 🚀 TasteRadar Backend - Railway Deployment Guide

## Step-by-Step Deployment (5 minutes)

### 1. Create GitHub Repository

```bash
# In your terminal, navigate to the foodintel-backend folder
cd foodintel-backend

# Initialize git
git init
git add .
git commit -m "Initial TasteRadar backend"

# Create repository on GitHub (github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/tasteradar-backend.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Railway

**Option A: Through Dashboard (Recommended)**

1. Go to railway.app
2. Click "+ New Project"
3. Select "Deploy from GitHub repo"
4. Choose `tasteradar-backend`
5. Railway auto-detects Python and deploys ✅

**Option B: Railway CLI**

```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

### 3. Environment Variables

Railway should auto-detect these from your .env file, but verify in Dashboard → Variables:

```
✅ DATABASE_URL (should be auto-linked to your Postgres)
✅ REDIS_URL (should be auto-linked to your Redis)
✅ SECRET_KEY
✅ CORS_ORIGINS
✅ PROJECT_NAME
```

### 4. Get Your API URL

After deployment, Railway gives you:
```
https://tasteradar-backend-production.up.railway.app
```

**Test it:** Visit `https://your-url.railway.app/health`

Should return: `{"status": "healthy"}`

### 5. Seed Demo Data

**Option A: Railway Dashboard**
1. Go to service → three dots → "Open Shell"
2. Run: `python seed.py`

**Option B: Railway CLI**
```bash
railway run python seed.py
```

### 6. Test API

Visit: `https://your-url.railway.app/docs`

You'll see the interactive API documentation!

Try logging in:
- Email: `admin@mcdonalds-demo.com`
- Password: `Demo1234!`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway service created and linked
- [ ] Deployment successful (check logs)
- [ ] Environment variables set
- [ ] Public URL works (`/health` endpoint)
- [ ] Seed data loaded
- [ ] API docs accessible (`/docs`)
- [ ] Demo login works

---

## 🐛 Troubleshooting

**Build fails?**
- Check Railway logs for errors
- Ensure `requirements.txt` is in root folder

**Database connection error?**
- Verify DATABASE_URL in Railway variables
- Check Postgres service is running

**Seed script fails?**
- Run it twice (sometimes Railway needs warm-up)
- Check database tables were created

---

## 📝 Save Your API URL

Once deployed, save this:
```
BACKEND_API_URL=https://your-railway-url.railway.app
```

We'll need it for the frontend! 🎨

---

**Status:** ⏳ Waiting for Railway deployment...

**Next:** Build React frontend!
