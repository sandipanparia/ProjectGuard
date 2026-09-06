import uuid
from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.config.database import Base

class ImplementingAgency(Base):
    __tablename__ = "implementing_agencies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False, index=True)
    state_id = Column(UUID(as_uuid=True), nullable=True)

class Contractor(Base):
    __tablename__ = "contractors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    registration_number = Column(String, nullable=True, index=True)

class EntityRelationship(Base):
    __tablename__ = "entity_relationships"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_entity_id = Column(UUID(as_uuid=True), nullable=False)
    source_entity_type = Column(String, nullable=False)
    target_entity_id = Column(UUID(as_uuid=True), nullable=False)
    target_entity_type = Column(String, nullable=False)
    relationship_type = Column(String, nullable=False) # e.g. "EXECUTED_PROJECT"
