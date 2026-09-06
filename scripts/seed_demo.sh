#!/bin/bash
# ProjectGuard India — Demo Seed Script
# Usage: bash scripts/seed_demo.sh
#
# This script seeds the database with 1000+ synthetic MPLADS project records
# Run this AFTER starting the Docker stack and running migrations.

set -e

echo "========================================"
echo "  ProjectGuard India — Demo Data Seed   "
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "ERROR: Docker is not running. Please start Docker first."
  exit 1
fi

# Check if the api container is up
if ! docker-compose ps | grep -q "api.*Up"; then
  echo "Starting docker-compose stack..."
  docker-compose up -d
  echo "Waiting 10s for services to be ready..."
  sleep 10
fi

echo ""
echo "[1/3] Running database migrations..."
docker-compose exec api alembic upgrade head

echo ""
echo "[2/3] Seeding demo data (1000+ projects)..."
docker-compose exec api python -m app.ingestion.demo_seed

echo ""
echo "[3/3] Running initial risk score computation..."
docker-compose exec api python -c "
from app.risk.engine import RiskEngine
import asyncio

async def run():
    engine = RiskEngine()
    await engine.run_all()
    print('Risk scoring complete.')

asyncio.run(run())
"

echo ""
echo "========================================"
echo "  ✅ Demo setup complete!"
echo ""
echo "  Frontend:    http://localhost:3000"
echo "  API:         http://localhost:8000"
echo "  Swagger UI:  http://localhost:8000/docs"
echo ""
echo "  Login:"
echo "  Email:    admin@projectguard.in"
echo "  Password: admin123"
echo "========================================"
