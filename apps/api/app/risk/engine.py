from typing import List, Any
from app.risk.base_rule import BaseRiskRule, RiskSignal

class RiskEngine:
    def __init__(self, rules: List[BaseRiskRule]):
        self.rules = rules

    async def calculate_risk(self, project: Any, context: dict) -> dict:
        signals = []
        total_score = 0.0
        
        for rule in self.rules:
            try:
                signal = await rule.evaluate(project, context)
                if signal:
                    signals.append(signal)
            except Exception as e:
                print(f"Error evaluating rule {rule.code}: {e}")
                
        # Group by category to apply caps and prevent double counting
        category_scores = {}
        for sig in signals:
            if sig.category not in category_scores:
                category_scores[sig.category] = 0.0
            category_scores[sig.category] += sig.score_contribution
            
        # Example cap: no category can contribute more than 40 points
        for cat, score in category_scores.items():
            capped_score = min(score, 40.0)
            total_score += capped_score
            
        total_score = min(total_score, 100.0)
        
        risk_level = "LOW"
        if total_score >= 75:
            risk_level = "CRITICAL"
        elif total_score >= 50:
            risk_level = "HIGH"
        elif total_score >= 25:
            risk_level = "MODERATE"
            
        return {
            "score": total_score,
            "risk_level": risk_level,
            "signals": [s.model_dump() for s in signals]
        }
