import uuid
import enum
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Enum, JSON, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.config.database import Base

class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class RiskRule(Base):
    __tablename__ = "risk_rules"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String, unique=True, nullable=False, index=True) # e.g. FIN-001
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # e.g. FINANCIAL
    description = Column(String, nullable=True)
    weight = Column(Float, default=1.0)
    enabled = Column(Boolean, default=True)
    threshold = Column(Float, nullable=True)
    version = Column(Integer, default=1)

class RiskRun(Base):
    __tablename__ = "risk_runs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    score = Column(Float, nullable=False) # 0-100
    risk_level = Column(Enum(RiskLevel), nullable=False)
    rule_set_version = Column(String, nullable=True)

class RiskRunSignal(Base):
    __tablename__ = "risk_run_signals"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    run_id = Column(UUID(as_uuid=True), ForeignKey("risk_runs.id"), nullable=False)
    signal_code = Column(String, nullable=False)
    category = Column(String, nullable=False)
    severity = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    score_contribution = Column(Float, nullable=False)
    title = Column(String, nullable=False)
    explanation = Column(String, nullable=False)
    required_verification = Column(JSON, nullable=True)
    data_status = Column(String, nullable=True)
