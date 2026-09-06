import uuid
import enum
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.config.database import Base

class EvidenceType(str, enum.Enum):
    DOCUMENT = "DOCUMENT"
    PHOTO = "PHOTO"
    VIDEO = "VIDEO"
    GIS = "GIS"
    PAYMENT = "PAYMENT"
    BOQ = "BOQ"
    TENDER = "TENDER"
    MEASUREMENT = "MEASUREMENT"
    CERTIFICATE = "CERTIFICATE"
    INSPECTION = "INSPECTION"
    OTHER = "OTHER"

class VerificationStatus(str, enum.Enum):
    UNVERIFIED = "UNVERIFIED"
    VERIFIED = "VERIFIED"
    DISPUTED = "DISPUTED"

class EvidenceItem(Base):
    __tablename__ = "evidence_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    type = Column(Enum(EvidenceType), nullable=False, index=True)
    source = Column(String, nullable=True)
    source_reference = Column(String, nullable=True)
    file_path = Column(String, nullable=True) # S3 or local path
    uploaded_date = Column(DateTime, default=datetime.utcnow)
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.UNVERIFIED)
    metadata_info = Column(JSON, nullable=True)
