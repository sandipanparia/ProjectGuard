from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from uuid import UUID

from app.config.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse, ProjectListResponse
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=ProjectListResponse)
async def list_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = select(Project).offset(skip).limit(limit)
    result = await db.execute(query)
    projects = result.scalars().all()
    
    # count
    total = 1000 # stub for now, use select(func.count()) in prod
    
    return ProjectListResponse(total=total, items=projects)

@router.get("/{id}", response_model=ProjectResponse)
async def get_project(id: UUID, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    result = await db.execute(select(Project).where(Project.id == id))
    project = result.scalars().first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    return project
