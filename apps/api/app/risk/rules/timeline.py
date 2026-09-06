from typing import Any, Dict, List, Optional
from app.risk.base_rule import BaseRiskRule, RiskSignal
from datetime import date

class DelayedCompletionRule(BaseRiskRule):
    code = "TIME-002"
    name = "Project delayed significantly beyond expected completion"
    category = "TIMELINE"
    weight = 12.0

    def required_fields(self) -> List[str]:
        return ["expected_completion_date", "actual_completion_date", "status"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        if not project.expected_completion_date:
            return None
            
        compare_date = project.actual_completion_date if project.actual_completion_date else date.today()
        
        if compare_date > project.expected_completion_date:
            delay_days = (compare_date - project.expected_completion_date).days
            if delay_days > 90: # 3 months delay
                severity = min(delay_days / 365.0, 1.0)
                return RiskSignal(
                    signal_code=self.code,
                    category=self.category,
                    severity=severity,
                    confidence=1.0,
                    weight=self.weight,
                    score_contribution=self.weight * severity,
                    title="Significant Delay",
                    explanation=f"Project is delayed by {delay_days} days.",
                    required_verification=["Check extension of time approvals", "Check penalty clauses"]
                )
        return None

class RapidCompletionRule(BaseRiskRule):
    code = "TIME-005"
    name = "Suspiciously rapid completion relative to peers"
    category = "TIMELINE"
    weight = 14.0

    def required_fields(self) -> List[str]:
        return ["start_date", "actual_completion_date"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        if not project.start_date or not project.actual_completion_date:
            return None
            
        duration = (project.actual_completion_date - project.start_date).days
        peer_median_duration = context.get("peer_median_duration")
        
        if peer_median_duration and duration > 0:
            if duration < peer_median_duration * 0.3: # less than 30% of normal time
                severity = min((peer_median_duration - duration) / peer_median_duration, 1.0)
                return RiskSignal(
                    signal_code=self.code,
                    category=self.category,
                    severity=severity,
                    confidence=0.85,
                    weight=self.weight,
                    score_contribution=self.weight * severity * 0.85,
                    title="Suspiciously rapid completion",
                    explanation=f"Project completed in {duration} days (Peer median: {peer_median_duration} days).",
                    required_verification=["Verify quality of work", "Check completion certificate date"]
                )
        return None
