# ProjectGuard India

**Investigation Prioritization & Anomaly Detection Platform**

ProjectGuard India is a state-of-the-art backend and frontend platform designed to automatically flag and prioritize public development projects based on anomaly detection and risk scoring.

## Monorepo Architecture

This repository uses a monorepo structure:
- `apps/web`: Next.js 14 Frontend (App Router, Tailwind CSS)
- `apps/api`: FastAPI Backend (Python, SQLAlchemy, PostgreSQL, PostGIS, Redis)
- `infrastructure`: Docker Compose setup

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (if running frontend locally outside Docker)
- Python 3.11+ (if running backend locally outside Docker)

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```
Ensure that `JWT_SECRET` and `SECRET_KEY` are secure for production use.

### 2. Start Services via Docker Compose

Run the entire stack in the background:
```bash
docker compose up -d --build
```

### 3. Database Migrations

Run Alembic migrations to create the database schema:
```bash
docker compose exec api alembic upgrade head
```

### 4. Seed Demo Data

The demo dataset contains over 1,000 synthetic projects (clean, anomalous, and missing data variants):
```bash
docker compose exec api python -m app.ingestion.demo_seed
```

### 5. Access the Platform

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

### Demo Accounts

The database seeder automatically creates the following accounts:
- **Admin**: `admin` / `admin123`
- **Investigator**: `investigator` / `investigator123`

## Risk Engine

The intelligence layer is driven by a deterministic Rule Engine in `apps/api/app/risk`.
Rules evaluate contextual peers (e.g., peer median cost) to assign risk scores to projects. Signals are aggregated and capped per category to calculate the final 0-100 Investigation Risk score.

## Known Limitations

- **MapLibre Integration**: The Map Intelligence page currently contains a visual UI placeholder. `maplibre-gl` integration requires actual GeoJSON endpoints that the API supports but need wiring on the frontend canvas.
- **Machine Learning**: As per requirements, no fake ML predictions were used. The current intelligence is fully deterministic and rule-based.
- **Background Workers**: Basic background job structures were created, but Celery/ARQ workers need to be fully hooked up for processing bulk risk recalculations.

## Future Integration Points

The `RiskEngine` architecture (`apps/api/app/risk/engine.py`) is designed so that future ML models (LLMs, Computer Vision on evidence photos, satellite analysis) can simply output a standard `RiskSignal` object. The engine will transparently incorporate these AI signals into the final score without requiring changes to the core application logic.
