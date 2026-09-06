# ProjectGuard India — Reset & Utility Scripts

## seed_demo.sh
Seeds the database with 1000+ synthetic MPLADS project records.
```bash
bash scripts/seed_demo.sh
```

## reset_db.sh
Drops and recreates the database (use with caution).
```bash
docker-compose down -v
docker-compose up -d
bash scripts/seed_demo.sh
```

## export_risk_queue.sh (coming soon)
Exports the top-100 high-risk projects to CSV for offline review.
