# ProjectGuard India — Setup & Deployment Guide

## Prerequisites

| Tool | Minimum Version | Purpose |
|------|----------------|---------|
| Node.js | 18.x | Frontend |
| Python | 3.11+ | Backend |
| Docker + Docker Compose | v24+ | Full stack |
| Git | 2.x | Version control |

---

## Option A: Run with Docker (Recommended)

This starts the entire stack — database, Redis, API, and frontend — in one command.

### 1. Clone the Repository
```bash
git clone https://github.com/sandipanparia/ProjectGuard.git
cd ProjectGuard
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env if needed (defaults work for local Docker setup)
```

### 3. Start All Services
```bash
docker-compose up -d
```

### 4. Run Database Migrations
```bash
docker-compose exec api alembic upgrade head
```

### 5. Seed Demo Data
```bash
docker-compose exec api python -m app.ingestion.demo_seed
```

### 6. Access the Application
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (Redoc) | http://localhost:8000/redoc |

**Default Login:**
- Email: `admin@projectguard.in`
- Password: `admin123`

---

## Option B: Run Locally (Without Docker)

### Frontend Setup
```bash
cd apps/web
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend Setup
```bash
cd apps/api

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.\.venv\Scripts\activate

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit DATABASE_URL to point to your local PostgreSQL instance

# Run migrations
alembic upgrade head

# Seed demo data
python -m app.ingestion.demo_seed

# Start API server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> **Note:** For full GIS functionality, PostgreSQL must have the PostGIS extension enabled.
> Run `CREATE EXTENSION IF NOT EXISTS postgis;` in your database.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+asyncpg://postgres:postgres@db:5432/projectguard` | PostgreSQL connection string |
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection string |
| `SECRET_KEY` | (required) | JWT signing key — use a 256-bit random string in production |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | JWT token lifetime |
| `ENVIRONMENT` | `development` | `development` or `production` |
| `CORS_ORIGINS` | `http://localhost:3000` | Allowed frontend origins |

---

## Running Tests

### Backend Unit Tests
```bash
cd apps/api
pytest tests/ -v
```

### Frontend Build Check
```bash
cd apps/web
npm run build
```

---

## Docker Services

```yaml
# docker-compose.yml services:

db:        # PostgreSQL 15 + PostGIS 3.3 — Port 5432
redis:     # Redis 7 Alpine — Port 6379
api:       # FastAPI (Uvicorn) — Port 8000
web:       # Next.js 14 — Port 3000
```

### Useful Docker Commands
```bash
# View logs
docker-compose logs -f api
docker-compose logs -f web

# Restart a service
docker-compose restart api

# Stop everything
docker-compose down

# Stop and remove volumes (resets database)
docker-compose down -v

# Rebuild after code changes
docker-compose up -d --build
```

---

## Production Deployment Notes

1. **Change all secrets** in `.env` — never use defaults in production
2. **Enable HTTPS** — use a reverse proxy like Nginx or Caddy
3. **Set `ENVIRONMENT=production`** — disables debug mode and Swagger UI
4. **Use managed PostgreSQL** (e.g., AWS RDS, Supabase) with PostGIS extension
5. **Use managed Redis** (e.g., AWS ElastiCache) for reliability
6. **Set up automated backups** for the database
7. **Configure a CDN** for static assets from Next.js

---

## Project Structure

```
ProjectGuard/
├── apps/
│   ├── api/                    # FastAPI Backend
│   │   ├── app/
│   │   │   ├── api/routes/     # Endpoint handlers
│   │   │   ├── auth/           # JWT + RBAC
│   │   │   ├── config/         # Database + settings
│   │   │   ├── ingestion/      # Data normalization + demo seed
│   │   │   ├── models/         # SQLAlchemy ORM models
│   │   │   ├── risk/           # Rule engine + scoring
│   │   │   └── schemas/        # Pydantic request/response schemas
│   │   ├── migrations/         # Alembic migration scripts
│   │   ├── tests/              # pytest unit tests
│   │   └── requirements.txt
│   │
│   └── web/                    # Next.js 14 Frontend
│       ├── app/
│       │   ├── page.tsx        # Intelligence Dashboard
│       │   ├── projects/       # Investigation Queue + Detail
│       │   ├── map/            # Map Intelligence (GIS)
│       │   ├── analytics/      # Analytics Dashboard
│       │   ├── contractors/    # Contractor Analysis
│       │   ├── rules/          # Rule Engine Admin
│       │   └── login/          # Authentication
│       ├── public/
│       └── package.json
│
├── data/
│   ├── demo/                   # Sample CSV/JSON demo data
│   └── schemas/                # Database schema SQL dumps
│
├── docs/                       # Documentation
│   ├── architecture.md
│   ├── api_reference.md
│   └── setup.md
│
├── scripts/                    # Utility scripts
│   └── seed_demo.sh
│
├── infrastructure/             # Infra configs (Nginx, etc.)
│   └── nginx.conf
│
├── docker-compose.yml
├── .env.example
└── README.md
```
