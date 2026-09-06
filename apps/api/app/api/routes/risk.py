from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from uuid import UUID
from typing import List

from app.config.database import get_db
from app.models.risk import RiskRun, RiskRunSignal
from app.schemas.risk import RiskRunResponse, RiskSignalResponse
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["risk"])

@router.get("/{id}/risk", response_model=RiskRunResponse)
async def get_project_risk(id: UUID, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    result = await db.execute(
        select(RiskRun)
        .where(RiskRun.project_id == id)
        .order_by(RiskRun.timestamp.desc())
        .limit(1)
    )
    risk = result.scalars().first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risk calculation not found for this project")
    return risk

@router.get("/{id}/signals", response_model=List[RiskSignalResponse])
async def get_project_signals(id: UUID, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    run_result = await db.execute(
        select(RiskRun)
        .where(RiskRun.project_id == id)
        .order_by(RiskRun.timestamp.desc())
        .limit(1)
    )
    risk = run_result.scalars().first()
    if not risk:
        return []
        
    sig_result = await db.execute(
        select(RiskRunSignal).where(RiskRunSignal.run_id == risk.id)
    )
    return sig_result.scalars().all()
