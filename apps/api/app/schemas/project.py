from pydantic import BaseModel, UUID4, ConfigDict
from typing import Optional, List, Dict
from datetime import date, datetime

class ProjectBase(BaseModel):
    project_id: str
    name: str
    description: Optional[str] = None
    work_type: Optional[str] = None
    sanction_amount: Optional[float] = None
    expenditure: Optional[float] = None
    status: str
    physical_progress: Optional[float] = None
    financial_progress: Optional[float] = None
    data_completeness_score: Optional[float] = None

class ProjectResponse(ProjectBase):
    id: UUID4
    state_id: Optional[UUID4] = None
    district_id: Optional[UUID4] = None
    contractor_id: Optional[UUID4] = None
    implementing_agency_id: Optional[UUID4] = None
    
    model_config = ConfigDict(from_attributes=True)

class ProjectListResponse(BaseModel):
    total: int
    items: List[ProjectResponse]
