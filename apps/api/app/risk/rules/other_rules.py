from typing import Any, Dict, List, Optional
from app.risk.base_rule import BaseRiskRule, RiskSignal

class ContractorConcentrationRule(BaseRiskRule):
    code = "CON-001"
    name = "Unusual contractor concentration in district"
    category = "CONTRACTOR"
    weight = 14.0

    def required_fields(self) -> List[str]:
        return ["contractor_id", "district_id"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        if not project.contractor_id:
            return None
            
        contractor_market_share = context.get("contractor_district_market_share")
        
        if contractor_market_share and contractor_market_share > 0.4: # 40% of district projects
            severity = min((contractor_market_share - 0.4) * 2, 1.0)
            return RiskSignal(
                signal_code=self.code,
                category=self.category,
                severity=severity,
                confidence=0.9,
                weight=self.weight,
                score_contribution=self.weight * severity * 0.9,
                title="Contractor Concentration",
                explanation=f"Contractor holds {contractor_market_share*100:.1f}% of projects in this district.",
                required_verification=["Review tendering process", "Check other bidders"]
            )
        return None

class SimilarProjectsNearbyRule(BaseRiskRule):
    code = "GEO-001"
    name = "Multiple similar projects within small radius"
    category = "GEOGRAPHIC"
    weight = 12.0

    def required_fields(self) -> List[str]:
        return ["latitude", "longitude", "work_type"]

    async def evaluate(self, project: Any, context: Dict[str, Any]) -> Optional[RiskSignal]:
        nearby_similar = context.get("nearby_similar_projects_count", 0)
        
        if nearby_similar >= 2:
            severity = min(nearby_similar / 5.0, 1.0)
            return RiskSignal(
                signal_code=self.code,
                category=self.category,
                severity=severity,
                confidence=0.9,
                weight=self.weight,
                score_contribution=self.weight * severity * 0.9,
                title="Nearby Similar Projects",
                explanation=f"Detected {nearby_similar} similar projects within a 2km radius.",
                required_verification=["Check if projects are duplicates", "Verify if splitting of work occurred"]
            )
        return None
