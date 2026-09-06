from pydantic import BaseModel, UUID4, ConfigDict
from typing import List, Optional
from datetime import datetime

class RiskSignalResponse(BaseModel):
    signal_code: str
    category: str
    severity: float
    confidence: float
    score_contribution: float
    title: str
    explanation: str
    required_verification: Optional[List[str]] = []
    
    model_config = ConfigDict(from_attributes=True)

class RiskRunResponse(BaseModel):
    id: UUID4
    project_id: UUID4
    timestamp: datetime
    score: float
    risk_level: str
    
    model_config = ConfigDict(from_attributes=True)
