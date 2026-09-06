# ProjectGuard India — System Architecture

## Overview

ProjectGuard India is a production-grade web platform for AI-assisted early-warning and investigation prioritization of potential irregularities in Indian MPLADS (Member of Parliament Local Area Development Scheme) and public development projects.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│              Next.js 14 (App Router) — Port 3000                │
│   Dashboard | Investigation Queue | Map | Analytics | Rules     │
└─────────────────────────┬───────────────────────────────────────┘
                          │ REST API (JSON)
┌─────────────────────────▼───────────────────────────────────────┐
│                       API LAYER                                  │
│           FastAPI (Python 3.11+) — Port 8000                    │
│   /auth | /projects | /risk | /map | /evidence | /analytics     │
└────┬──────────────────────────────────────┬───────────────────  ┘
     │                                      │
┌────▼────────────────┐          ┌──────────▼──────────────────── ┐
│   PostgreSQL 15     │          │       Redis 7                   │
│   + PostGIS 3.3     │          │   Background Jobs / Cache       │
│   Port: 5432        │          │   Port: 6379                    │
└─────────────────────┘          └─────────────────────────────── ┘
```

---

## Component Breakdown

### Frontend (`apps/web/`)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR/CSR hybrid routing |
| Styling | Tailwind CSS + Custom CSS | Premium dark UI design |
| Fonts | Inter + JetBrains Mono (Google Fonts) | Professional typography |
| Maps | SVG India visualization (MapLibre-ready) | Geospatial visualization |
| State | React `useState` / `useEffect` | Local component state |

**Pages:**
- `/` — Intelligence Dashboard (metrics, risk queue, alerts)
- `/projects` — Investigation Queue (sortable, filterable project list)
- `/projects/[id]` — Project Detail (full risk breakdown, evidence, timeline)
- `/map` — Map Intelligence (interactive dot-map, state statistics)
- `/contractors` — Contractor Analysis (entity relationships, concentration)
- `/analytics` — System Analytics (anomaly distributions, state heatmaps)
- `/rules` — Rule Engine Admin (manage detection rules)
- `/login` — Authentication page

---

### Backend (`apps/api/`)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | FastAPI 0.111+ | Async REST API |
| ORM | SQLAlchemy 2.0 + Alembic | Database models & migrations |
| Auth | JWT (python-jose) + bcrypt | Stateless authentication |
| GIS | GeoAlchemy2 + PostGIS | Spatial queries |
| Validation | Pydantic v2 | Request/response schemas |
| Background | Celery + Redis | Async risk score computation |

---

### Database Schema

```
projects ──────────────────────────────────────────────────────┐
  id (UUID PK)                                                  │
  project_code (unique)                                         │
  title, description                                            │
  sanctioned_amount, actual_expenditure                         │
  location (GEOMETRY Point, SRID 4326)                          │
  state, district, block, village                               │
  status (ENUM: planned/active/delayed/completed/suspended)     │
  physical_progress_pct                                         │
  financial_progress_pct                                        │
  start_date, expected_end_date, actual_end_date                │
  contractor_id (FK → organizations)                            │
  created_at, updated_at                                        │
                                                                │
organizations ─────────────────────────────────────────────────┘
  id (UUID PK)
  name, registration_number
  org_type (agency | contractor | consultant)
  state, district
  blacklisted (BOOLEAN)
  blacklist_reason

risk_runs
  id (UUID PK)
  project_id (FK → projects)
  score (FLOAT 0-100)
  level (ENUM: low/moderate/high/critical)
  triggered_rules (JSONB)
  created_at

risk_signals
  id (UUID PK)
  risk_run_id (FK)
  rule_id (VARCHAR)
  rule_name, category
  score_contribution (FLOAT)
  evidence_snapshot (JSONB)

investigations
  id (UUID PK)
  project_id (FK)
  assigned_to (FK → users)
  status (ENUM: open/in_progress/escalated/closed/dismissed)
  priority (ENUM: low/medium/high/critical)
  notes, outcome
  created_at, updated_at

evidence
  id (UUID PK)
  project_id (FK)
  investigation_id (FK, nullable)
  evidence_type (document | photo | satellite | report | other)
  title, description
  file_url
  collected_at

audit_logs
  id (UUID PK)
  user_id (FK)
  action, resource_type, resource_id
  ip_address
  metadata (JSONB)
  created_at

users
  id (UUID PK)
  email (unique), hashed_password
  full_name, role (ENUM: superadmin/analyst/viewer/field_officer)
  is_active (BOOLEAN)
```

---

## Risk Engine

The risk engine is a rule-based scoring system that evaluates each project against 20+ detection rules.

### Rule Categories
1. **Financial Rules** — Cost overruns, unit rate anomalies, payment pattern irregularities
2. **Timeline Rules** — Delays, stalled projects, suspicious completion claims
3. **Contractor Rules** — Market concentration, blacklisted entities, multiple awards
4. **Geographic Rules** — Cluster detection, spatial duplication within radius
5. **Evidence Rules** — Missing mandatory documents, data quality deficits

### Scoring Formula
```
composite_score = Σ (rule_weight × rule_trigger_score) / total_possible_score × 100
```

Risk Level Thresholds:
- **Critical**: Score ≥ 75
- **High**: Score 50–74
- **Moderate**: Score 25–49
- **Low**: Score < 25

---

## Security Architecture

| Layer | Mechanism |
|-------|-----------|
| Authentication | JWT Bearer tokens (30-min expiry + refresh) |
| Authorization | Role-Based Access Control (RBAC) |
| Roles | `superadmin`, `analyst`, `viewer`, `field_officer` |
| Passwords | bcrypt hashing (cost factor 12) |
| CORS | Strict origin whitelist |
| Audit | Every write action logged to `audit_logs` table |

---

## Deployment

### Docker Compose (Development)
```
docker-compose up -d
```

Services:
- `db` — PostgreSQL 15 + PostGIS 3.3
- `redis` — Redis 7 Alpine
- `api` — FastAPI (Uvicorn)
- `web` — Next.js

### Environment Variables
See `.env.example` for all required variables.
