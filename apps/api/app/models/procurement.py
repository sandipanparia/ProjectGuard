import uuid
from sqlalchemy import Column, String, Float, ForeignKey, Date, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.config.database import Base

class Tender(Base):
    __tablename__ = "tenders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    tender_number = Column(String, nullable=True, index=True)
    published_date = Column(Date, nullable=True)
    value = Column(Float, nullable=True)

class WorkOrder(Base):
    __tablename__ = "work_orders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    contractor_id = Column(UUID(as_uuid=True), ForeignKey("contractors.id"), nullable=False)
    order_number = Column(String, nullable=True)
    order_date = Column(Date, nullable=True)
    value = Column(Float, nullable=True)

class PaymentRecord(Base):
    __tablename__ = "payment_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False)
    reference_number = Column(String, nullable=True)
