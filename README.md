# 🛡️ ProjectGuard India

> **AI-assisted early-warning and investigation prioritization platform for Indian MPLADS and public development projects.**

[![Built at HackHeritage 4.0](https://img.shields.io/badge/HackHeritage-4.0-blue?style=flat-square)](https://github.com/sandipanparia/ProjectGuard)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+PostGIS-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)](https://www.docker.com)

---

## 🎯 Problem Statement

India's MPLADS (Member of Parliament Local Area Development Scheme) disburses ₹5 crore per MP per year for local infrastructure. With 543 MPs, that's **₹2,715 crore annually** across tens of thousands of micro-projects — making systematic oversight nearly impossible by hand.

**ProjectGuard India** applies a transparent, rule-based risk engine to detect early warning signals of irregularity — cost overruns, contractor concentration, geographic duplication, missing evidence — and surfaces them for human investigators in a prioritized queue.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Intelligence Dashboard** | Real-time metrics, top critical projects, system alerts |
| 🔍 **Investigation Queue** | Risk-sorted project list with one-click detail view |
| 🗺️ **Map Intelligence** | Interactive SVG India map with geographic cluster detection |
| 🏢 **Contractor Analysis** | Entity relationship mapping and concentration alerts |
| 📈 **Analytics** | Anomaly distributions, state heatmaps, evidence deficits |
| ⚙️ **Rule Engine Admin** | Enable/disable/tune 20+ detection rules |
| 🔐 **RBAC Auth** | Role-based access: superadmin, analyst, viewer, field_officer |
| 📋 **Evidence Management** | Upload and track compliance documents per project |
| 📝 **Audit Logs** | Every action is immutably logged |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Inter font |
| **Backend** | FastAPI (Python 3.11+), SQLAlchemy 2.0, Alembic |
| **Database** | PostgreSQL 15 + PostGIS 3.3 |
| **Cache/Queue** | Redis 7 |
| **Auth** | JWT + bcrypt, RBAC |
| **Infrastructure** | Docker Compose, Nginx |

---

## 🚀 Quick Start

### With Docker (Recommended)
```bash
git clone https://github.com/sandipanparia/ProjectGuard.git
cd ProjectGuard
cp .env.example .env
docker-compose up -d
docker-compose exec api alembic upgrade head
docker-compose exec api python -m app.ingestion.demo_seed
```

Open **http://localhost:3000**

### Without Docker
```bash
# Frontend
cd apps/web && npm install && npm run dev

# Backend
cd apps/api
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Default credentials:** `admin@projectguard.in` / `admin123`

---

## 📁 Project Structure

```
ProjectGuard/
├── apps/
│   ├── api/          # FastAPI backend (risk engine, auth, GIS APIs)
│   └── web/          # Next.js 14 frontend (dashboard, map, analytics)
├── data/
│   ├── demo/         # Sample CSV/JSON demo datasets (15 projects, 5 contractors)
│   └── schemas/      # PostgreSQL schema SQL dump
├── docs/
│   ├── architecture.md   # System design & DB schema
│   ├── api_reference.md  # Complete REST API docs
│   └── setup.md          # Detailed setup guide
├── scripts/
│   └── seed_demo.sh  # One-command demo data seeder
├── infrastructure/
│   └── nginx.conf    # Production reverse proxy config
└── docker-compose.yml
```

---

## 🔬 Risk Engine — Detection Rules

The rule engine evaluates each project against 20+ rules across 5 categories:

**Financial (8 rules)**
- Financial vs Physical Progress Mismatch (> 30% delta)
- Unit Rate Anomaly (vs district peer average)
- Cost Overrun > 20%
- Unusual Payment Velocity

**Timeline (4 rules)**
- Project Delayed > 6 months
- Stalled Project (no update in 90 days)
- Suspicious Same-Day Completion Claim

**Contractor (4 rules)**
- Single Contractor Dominance (> 30% of district spend)
- Blacklisted Contractor Award
- Multiple Awards to Related Entities

**Geographic (3 rules)**
- Spatial Cluster (3+ similar projects within 2km)
- Duplicate Project Detection
- Cross-District Boundary Anomaly

**Evidence / Data Quality (3 rules)**
- Missing Measurement Book
- Missing Geotagged Photos
- No Payment Receipts on File

---

## 📸 Screenshots

| Dashboard | Investigation Queue | Map Intelligence |
|-----------|-------------------|-----------------|
| Real-time risk metrics | Sortable priority queue | Interactive India dot-map |
| Alert feed | Project detail view | State-wise heatmap |

---

## 📚 Documentation

- [Architecture Guide](docs/architecture.md)
- [API Reference](docs/api_reference.md)
- [Setup & Deployment](docs/setup.md)

---

## 🏆 Built At

**HackHeritage 4.0 Hackathon** — Team ProjectGuard India

> *"Transparency in public spending is a fundamental right. Technology can make it a reality."*

---

## 📄 License

MIT License — free to use, modify, and deploy for public good.
