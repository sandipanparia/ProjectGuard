import pytest
from app.risk.rules.financial import ExpenditureExceedsSanctionRule
from app.risk.base_rule import RiskSignal
from pydantic import BaseModel

class DummyProject(BaseModel):
    sanction_amount: float
    expenditure: float

@pytest.mark.asyncio
async def test_expenditure_exceeds_sanction_rule_triggered():
    rule = ExpenditureExceedsSanctionRule()
    project = DummyProject(sanction_amount=1000000, expenditure=1500000)
    
    signal = await rule.evaluate(project, {})
    
    assert signal is not None
    assert signal.signal_code == "FIN-001"
    assert signal.severity > 0
    assert signal.score_contribution > 0

@pytest.mark.asyncio
async def test_expenditure_exceeds_sanction_rule_not_triggered():
    rule = ExpenditureExceedsSanctionRule()
    project = DummyProject(sanction_amount=1000000, expenditure=900000)
    
    signal = await rule.evaluate(project, {})
    
    assert signal is None
