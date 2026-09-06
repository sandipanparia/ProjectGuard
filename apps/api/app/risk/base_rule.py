from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class RiskSignal(BaseModel):
    signal_code: str
    category: str
    severity: float
    confidence: float
    weight: float
    score_contribution: float
    title: str
    explanation: str
    evidence_ids: List[str] = []
    required_verification: List[str] = []
    data_status: str = "AVAILABLE"

class BaseRiskRule(ABC):
    code: str
    name: str
    category: str
    weight: float = 1.0

    @abstractmethod
    def required_fields(self) -> List[str]:
        pass

    @abstractmethod
    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        pass
