import asyncio
import random
import uuid
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import AsyncSessionLocal
from app.models.geo import State, District
from app.models.org import Contractor, ImplementingAgency
from app.models.project import Project, ProjectStatus
from app.models.user import User, UserRole
from app.auth.security import get_password_hash

STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat"]
DISTRICTS = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"]
}
PROJECT_TYPES = ["Road Construction", "Water Supply", "School Building", "Hospital Renovation", "Street Lighting"]

async def seed_geo(db: AsyncSession):
    state_objs = []
    district_objs = []
    
    for state_name in STATES:
        state = State(name=state_name)
        db.add(state)
        state_objs.append(state)
    await db.commit()
    
    for state in state_objs:
        for dist_name in DISTRICTS[state.name]:
            dist = District(name=dist_name, state_id=state.id)
            db.add(dist)
            district_objs.append(dist)
    await db.commit()
    return state_objs, district_objs

async def seed_orgs(db: AsyncSession):
    contractors = [
        Contractor(name=f"Contractor_{i}", registration_number=f"REG-{1000+i}") for i in range(50)
    ]
    agencies = [
        ImplementingAgency(name=f"Agency_{i}") for i in range(10)
    ]
    db.add_all(contractors + agencies)
    await db.commit()
    return contractors, agencies

async def seed_projects(db: AsyncSession, states, districts, contractors, agencies):
    projects = []
    for i in range(1, 1001):
        dist = random.choice(districts)
        contractor = random.choice(contractors)
        agency = random.choice(agencies)
        
        is_high_risk_demo = (i == 1)
        is_clean_demo = (i == 2)
        is_missing_data_demo = (i == 3)

        sanction_amount = random.randint(10, 500) * 100000.0
        expenditure = sanction_amount * random.uniform(0.1, 0.9)
        phys_prog = (expenditure / sanction_amount) * 100
        fin_prog = (expenditure / sanction_amount) * 100
        
        prj_id = f"PRJ-{str(i).zfill(5)}"
        name = f"{random.choice(PROJECT_TYPES)} in {dist.name}"
        
        if is_high_risk_demo:
            prj_id = "DEMO-HIGH-001"
            expenditure = sanction_amount * 1.5
            fin_prog = 150.0
            phys_prog = 40.0
        elif is_clean_demo:
            prj_id = "DEMO-CLEAN-001"
        elif is_missing_data_demo:
            prj_id = "DEMO-MISSING-001"
            contractor = None
            sanction_amount = None
            
        p = Project(
            project_id=prj_id,
            name=name,
            work_type=random.choice(PROJECT_TYPES),
            state_id=dist.state_id,
            district_id=dist.id,
            sanction_amount=sanction_amount,
            estimated_amount=sanction_amount * random.uniform(0.9, 1.1) if sanction_amount else None,
            expenditure=expenditure if sanction_amount else None,
            status=ProjectStatus.IN_PROGRESS,
            implementing_agency_id=agency.id,
            contractor_id=contractor.id if contractor else None,
            physical_progress=phys_prog if sanction_amount else None,
            financial_progress=fin_prog if sanction_amount else None,
            latitude=20.0 + random.uniform(-5, 5),
            longitude=77.0 + random.uniform(-5, 5),
            data_completeness_score=100.0 if not is_missing_data_demo else 40.0,
            data_status={"contractor": "NOT_AVAILABLE"} if is_missing_data_demo else {"contractor": "AVAILABLE"}
        )
        projects.append(p)

    # Batch insert
    db.add_all(projects)
    await db.commit()
    print(f"Seeded {len(projects)} projects.")

async def seed_users(db: AsyncSession):
    admin = User(
        email="admin@projectguard.in",
        username="admin",
        hashed_password=get_password_hash("admin123"),
        role=UserRole.ADMIN
    )
    inv = User(
        email="investigator@projectguard.in",
        username="investigator",
        hashed_password=get_password_hash("investigator123"),
        role=UserRole.INVESTIGATOR
    )
    db.add_all([admin, inv])
    await db.commit()

async def main():
    async with AsyncSessionLocal() as db:
        print("Seeding Users...")
        await seed_users(db)
        print("Seeding Geo...")
        states, districts = await seed_geo(db)
        print("Seeding Orgs...")
        contractors, agencies = await seed_orgs(db)
        print("Seeding Projects...")
        await seed_projects(db, states, districts, contractors, agencies)
        print("Demo Database Seeded Successfully.")

if __name__ == "__main__":
    asyncio.run(main())
