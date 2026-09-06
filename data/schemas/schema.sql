-- ProjectGuard India — Database Schema SQL
-- PostgreSQL 15 + PostGIS 3.3
-- Run after: CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE project_status AS ENUM ('planned', 'active', 'delayed', 'completed', 'suspended');
CREATE TYPE risk_level AS ENUM ('low', 'moderate', 'high', 'critical');
CREATE TYPE org_type AS ENUM ('agency', 'contractor', 'consultant');
CREATE TYPE user_role AS ENUM ('superadmin', 'analyst', 'viewer', 'field_officer');
CREATE TYPE investigation_status AS ENUM ('open', 'in_progress', 'escalated', 'closed', 'dismissed');
CREATE TYPE investigation_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE evidence_type AS ENUM ('document', 'photo', 'satellite', 'report', 'other');

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role user_role NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================
-- ORGANIZATIONS
-- ============================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(500) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    org_type org_type NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    blacklisted BOOLEAN NOT NULL DEFAULT FALSE,
    blacklist_reason TEXT,
    blacklisted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_org_state ON organizations(state);
CREATE INDEX idx_org_type ON organizations(org_type);
CREATE INDEX idx_org_blacklisted ON organizations(blacklisted);

-- ============================================================
-- PROJECTS
-- ============================================================

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Financial
    sanctioned_amount DECIMAL(15, 2),
    actual_expenditure DECIMAL(15, 2),
    
    -- Progress
    physical_progress_pct DECIMAL(5, 2) DEFAULT 0,
    financial_progress_pct DECIMAL(5, 2) DEFAULT 0,
    
    -- Location (PostGIS)
    location GEOMETRY(Point, 4326),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    block VARCHAR(100),
    village VARCHAR(100),
    pin_code VARCHAR(10),
    
    -- Status & Timeline
    status project_status NOT NULL DEFAULT 'planned',
    start_date DATE,
    expected_end_date DATE,
    actual_end_date DATE,
    
    -- Relations
    contractor_id UUID REFERENCES organizations(id),
    implementing_agency_id UUID REFERENCES organizations(id),
    
    -- Metadata
    work_category VARCHAR(200),
    mplad_year VARCHAR(10),
    mp_name VARCHAR(255),
    mp_constituency VARCHAR(255),
    source_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_state ON projects(state);
CREATE INDEX idx_projects_district ON projects(district);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_contractor ON projects(contractor_id);
CREATE INDEX idx_projects_location ON projects USING GIST(location);

-- ============================================================
-- RISK RUNS
-- ============================================================

CREATE TABLE risk_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    score DECIMAL(5, 2) NOT NULL DEFAULT 0,
    level risk_level NOT NULL DEFAULT 'low',
    triggered_rules JSONB DEFAULT '[]',
    is_latest BOOLEAN NOT NULL DEFAULT TRUE,
    computed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_risk_runs_project ON risk_runs(project_id);
CREATE INDEX idx_risk_runs_level ON risk_runs(level);
CREATE INDEX idx_risk_runs_latest ON risk_runs(project_id, is_latest) WHERE is_latest = TRUE;

-- ============================================================
-- RISK SIGNALS (individual triggered rules per run)
-- ============================================================

CREATE TABLE risk_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    risk_run_id UUID NOT NULL REFERENCES risk_runs(id) ON DELETE CASCADE,
    rule_id VARCHAR(100) NOT NULL,
    rule_name VARCHAR(255),
    category VARCHAR(100),
    score_contribution DECIMAL(5, 2) NOT NULL,
    evidence_snapshot JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_signals_run ON risk_signals(risk_run_id);
CREATE INDEX idx_signals_rule ON risk_signals(rule_id);

-- ============================================================
-- INVESTIGATIONS
-- ============================================================

CREATE TABLE investigations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    opened_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    status investigation_status NOT NULL DEFAULT 'open',
    priority investigation_priority NOT NULL DEFAULT 'medium',
    notes TEXT,
    outcome TEXT,
    escalated_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inv_project ON investigations(project_id);
CREATE INDEX idx_inv_status ON investigations(status);
CREATE INDEX idx_inv_assigned ON investigations(assigned_to);

-- ============================================================
-- EVIDENCE
-- ============================================================

CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    investigation_id UUID REFERENCES investigations(id),
    evidence_type evidence_type NOT NULL,
    title VARCHAR(500),
    description TEXT,
    file_url TEXT,
    file_size_bytes BIGINT,
    collected_by UUID REFERENCES users(id),
    collected_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_evidence_project ON evidence(project_id);
CREATE INDEX idx_evidence_investigation ON evidence(investigation_id);

-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- ============================================================
-- RISK RULES CONFIG
-- ============================================================

CREATE TABLE risk_rules (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    weight DECIMAL(5, 2) NOT NULL DEFAULT 1.0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HELPFUL VIEWS
-- ============================================================

-- Latest risk score per project
CREATE VIEW v_project_risk AS
SELECT 
    p.id,
    p.project_code,
    p.title,
    p.state,
    p.district,
    p.status,
    p.sanctioned_amount,
    p.actual_expenditure,
    p.physical_progress_pct,
    p.financial_progress_pct,
    rr.score AS risk_score,
    rr.level AS risk_level,
    rr.triggered_rules,
    rr.created_at AS risk_computed_at
FROM projects p
LEFT JOIN risk_runs rr ON rr.project_id = p.id AND rr.is_latest = TRUE;

-- Investigation queue ordered by risk
CREATE VIEW v_investigation_queue AS
SELECT 
    p.id AS project_id,
    p.project_code,
    p.title,
    p.state,
    p.district,
    p.status AS project_status,
    rr.score AS risk_score,
    rr.level AS risk_level,
    i.id AS investigation_id,
    i.status AS investigation_status,
    i.priority,
    i.assigned_to
FROM projects p
JOIN risk_runs rr ON rr.project_id = p.id AND rr.is_latest = TRUE
LEFT JOIN investigations i ON i.project_id = p.id AND i.status NOT IN ('closed', 'dismissed')
WHERE rr.level IN ('high', 'critical')
ORDER BY rr.score DESC;
