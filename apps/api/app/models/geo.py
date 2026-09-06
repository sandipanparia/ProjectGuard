import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.config.database import Base

class State(Base):
    __tablename__ = "states"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False, index=True)

    districts = relationship("District", back_populates="state")

class District(Base):
    __tablename__ = "districts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    state_id = Column(UUID(as_uuid=True), ForeignKey("states.id"), nullable=False)

    state = relationship("State", back_populates="districts")

class Constituency(Base):
    __tablename__ = "constituencies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    state_id = Column(UUID(as_uuid=True), ForeignKey("states.id"), nullable=False)
