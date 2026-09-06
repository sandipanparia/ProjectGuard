import uuid
import enum
from sqlalchemy import Column, String, Float, DateTime, Enum, ForeignKey, Date, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.config.database import Base

class ProjectStatus(str, enum.Enum):
    SANCTIONED = "SANCTIONED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    DELAYED = "DELAYED"
    CANCELLED = "CANCELLED"
    ON_HOLD = "ON_HOLD"

class DataStatus(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    NOT_AVAILABLE = "NOT_AVAILABLE"
    INSUFFICIENT_DATA = "INSUFFICIENT_DATA"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(String, unique=True, index=True, nullable=False) # e.g. PRJ-00142
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    work_type = Column(String, nullable=True, index=True)
    
    state_id = Column(UUID(as_uuid=True), ForeignKey("states.id"), nullable=True)
    district_id = Column(UUID(as_uuid=True), ForeignKey("districts.id"), nullable=True)
    constituency_id = Column(UUID(as_uuid=True), ForeignKey("constituencies.id"), nullable=True)
    
    sanction_amount = Column(Float, nullable=True)
    estimated_amount = Column(Float, nullable=True)
    expenditure = Column(Float, nullable=True)
    
    sanction_date = Column(Date, nullable=True)
    start_date = Column(Date, nullable=True)
    expected_completion_date = Column(Date, nullable=True)
    actual_completion_date = Column(Date, nullable=True)
    
    status = Column(Enum(ProjectStatus), default=ProjectStatus.SANCTIONED, index=True)
    
    implementing_agency_id = Column(UUID(as_uuid=True), ForeignKey("implementing_agencies.id"), nullable=True)
    contractor_id = Column(UUID(as_uuid=True), ForeignKey("contractors.id"), nullable=True)
    
    physical_progress = Column(Float, nullable=True) # percentage
    financial_progress = Column(Float, nullable=True) # percentage
    
    location = Column(Geometry('POINT'), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    data_completeness_score = Column(Float, nullable=True)
    data_status = Column(JSON, nullable=True) # Store status of fields e.g., {"contractor": "NOT_AVAILABLE"}

class ProjectTimelineEvent(Base):
    __tablename__ = "project_timeline_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    event_type = Column(String, nullable=False)
    event_date = Column(Date, nullable=False)
    description = Column(String, nullable=True)
    source = Column(String, nullable=True)
