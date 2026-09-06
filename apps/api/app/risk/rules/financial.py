from typing import Any, Dict, List, Optional
from app.risk.base_rule import BaseRiskRule, RiskSignal

class ExpenditureExceedsSanctionRule(BaseRiskRule):
    code = "FIN-001"
    name = "Expenditure exceeds sanctioned amount"
    category = "FINANCIAL"
    weight = 15.0

    def required_fields(self) -> List[str]:
        return ["sanction_amount", "expenditure"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        if not project.sanction_amount or not project.expenditure:
            return None
            
        if project.expenditure > project.sanction_amount:
            ratio = project.expenditure / project.sanction_amount
            severity = min((ratio - 1.0) * 2, 1.0) # max severity if 50% over budget
            return RiskSignal(
                signal_code=self.code,
                category=self.category,
                severity=severity,
                confidence=1.0,
                weight=self.weight,
                score_contribution=self.weight * severity,
                title="Expenditure Exceeds Sanction",
                explanation=f"Project expenditure ({project.expenditure}) exceeds sanctioned amount ({project.sanction_amount}).",
                required_verification=["Review payment records", "Check for revised sanction orders"]
            )
        return None

class CostAbovePeerMedianRule(BaseRiskRule):
    code = "FIN-002"
    name = "Project cost significantly above contextual peer median"
    category = "FINANCIAL"
    weight = 18.0

    def required_fields(self) -> List[str]:
        return ["sanction_amount", "work_type", "district_id"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        peer_median = context.get("peer_median_cost")
        if not peer_median or not project.sanction_amount:
            return None
            
        if project.sanction_amount > peer_median * 1.3: # 30% above median
            deviation = (project.sanction_amount - peer_median) / peer_median
            severity = min(deviation, 1.0)
            return RiskSignal(
                signal_code=self.code,
                category=self.category,
                severity=severity,
                confidence=0.9,
                weight=self.weight,
                score_contribution=self.weight * severity * 0.9,
                title="Unusually high project cost",
                explanation=f"Project cost is {deviation*100:.1f}% above contextual peers (Median: {peer_median}).",
                required_verification=["Review BOQ", "Compare quantities with similar projects"]
            )
        return None

class ProgressMismatchRule(BaseRiskRule):
    code = "FIN-005"
    name = "Financial progress greater than physical progress"
    category = "PROGRESS"
    weight = 16.0

    def required_fields(self) -> List[str]:
        return ["financial_progress", "physical_progress"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        if project.financial_progress is None or project.physical_progress is None:
            return None
            
        diff = project.financial_progress - project.physical_progress
        if diff > 15.0: # more than 15% gap
            severity = min(diff / 50.0, 1.0)
            return RiskSignal(
                signal_code=self.code,
                category=self.category,
                severity=severity,
                confidence=0.95,
                weight=self.weight,
                score_contribution=self.weight * severity * 0.95,
                title="Progress Mismatch",
                explanation=f"Financial progress ({project.financial_progress}%) is significantly ahead of physical progress ({project.physical_progress}%).",
                required_verification=["Verify physical execution", "Check measurement book"]
            )
        return None
