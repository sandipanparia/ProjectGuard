import uuid
import enum
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.config.database import Base

class InvestigationStatus(str, enum.Enum):
    UNREVIEWED = "UNREVIEWED"
    IN_REVIEW = "IN_REVIEW"
    EVIDENCE_REQUESTED = "EVIDENCE_REQUESTED"
    FIELD_VERIFICATION = "FIELD_VERIFICATION"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"

class InvestigationFinding(str, enum.Enum):
    NO_ISSUE_FOUND = "NO_ISSUE_FOUND"
    INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"
    IRREGULARITY_CONFIRMED = "IRREGULARITY_CONFIRMED"
    REQUIRES_FURTHER_REVIEW = "REQUIRES_FURTHER_REVIEW"

class Investigation(Base):
    __tablename__ = "investigations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), unique=True, nullable=False)
    assigned_to = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    status = Column(Enum(InvestigationStatus), default=InvestigationStatus.UNREVIEWED, index=True)
    finding = Column(Enum(InvestigationFinding), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    notes = Column(String, nullable=True)

class InvestigationTask(Base):
    __tablename__ = "investigation_tasks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    investigation_id = Column(UUID(as_uuid=True), ForeignKey("investigations.id"), nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)
