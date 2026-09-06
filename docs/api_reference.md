# ProjectGuard India — API Reference

Base URL: `http://localhost:8000`

Interactive docs: `http://localhost:8000/docs` (Swagger UI)

---

## Authentication

### POST `/auth/login`
Obtain a JWT access token.

**Request Body:**
```json
{
  "username": "admin@projectguard.in",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

All subsequent requests must include:
```
Authorization: Bearer <access_token>
```

---

## Projects

### GET `/projects/`
List all projects with optional filters.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `skip` | int | Pagination offset (default: 0) |
| `limit` | int | Max results (default: 100) |
| `state` | string | Filter by state name |
| `status` | string | `planned\|active\|delayed\|completed\|suspended` |
| `risk_level` | string | `low\|moderate\|high\|critical` |
| `district` | string | Filter by district |

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "project_code": "DEMO-HIGH-001",
    "title": "Road Construction in Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "status": "active",
    "sanctioned_amount": 4500000.0,
    "actual_expenditure": 3800000.0,
    "physical_progress_pct": 42.0,
    "financial_progress_pct": 84.4,
    "risk_score": 87.0,
    "risk_level": "critical"
  }
]
```

### GET `/projects/{project_id}`
Get full details for a single project.

### POST `/projects/`
Create a new project record. (Role: `analyst`, `superadmin`)

**Request Body:**
```json
{
  "project_code": "PRJ-XXXXX",
  "title": "My New Project",
  "state": "Karnataka",
  "district": "Bellary",
  "sanctioned_amount": 2500000,
  "status": "active"
}
```

### PATCH `/projects/{project_id}`
Update project fields. (Role: `analyst`, `superadmin`)

### DELETE `/projects/{project_id}`
Soft-delete a project. (Role: `superadmin` only)

---

## Risk Engine

### GET `/risk/projects/{project_id}/score`
Get the latest computed risk score for a project.

**Response:**
```json
{
  "project_id": "uuid",
  "score": 87.0,
  "level": "critical",
  "triggered_rules": [
    {
      "rule_id": "financial_progress_mismatch",
      "rule_name": "Financial vs Physical Progress Mismatch",
      "category": "Financial",
      "score_contribution": 22.5,
      "evidence": {
        "financial_pct": 84.4,
        "physical_pct": 42.0,
        "delta": 42.4
      }
    }
  ],
  "computed_at": "2026-09-07T01:30:00Z"
}
```

### POST `/risk/projects/{project_id}/run`
Trigger a fresh risk score computation. (Role: `analyst`, `superadmin`)

### GET `/risk/queue`
Get the prioritized investigation queue — all projects ordered by risk score descending.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `level` | string | Filter by risk level |
| `state` | string | Filter by state |
| `limit` | int | Max results (default: 50) |

---

## Investigations

### GET `/investigations/`
List all investigations.

### POST `/investigations/`
Open a new investigation for a project. (Role: `analyst`, `superadmin`)

```json
{
  "project_id": "uuid",
  "priority": "high",
  "notes": "Significant financial-physical mismatch detected."
}
```

### PATCH `/investigations/{investigation_id}`
Update status, assign to user, add notes.

```json
{
  "status": "in_progress",
  "assigned_to": "user-uuid",
  "notes": "Field visit scheduled for 2026-09-15."
}
```

---

## Evidence

### GET `/evidence/?project_id={id}`
List all evidence items for a project.

### POST `/evidence/`
Upload / register a new evidence record. (Role: `analyst`, `superadmin`)

```json
{
  "project_id": "uuid",
  "evidence_type": "document",
  "title": "Measurement Book - Oct 2026",
  "description": "Signed MB submitted by contractor.",
  "file_url": "https://storage.example.com/mb-oct-2026.pdf"
}
```

### DELETE `/evidence/{evidence_id}`
Remove an evidence record. (Role: `superadmin`)

---

## Map / GIS

### GET `/map/projects`
Get all projects with GeoJSON coordinates for map rendering.

**Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [73.8567, 18.5204] },
      "properties": {
        "project_id": "uuid",
        "project_code": "DEMO-HIGH-001",
        "title": "Road Construction in Pune",
        "risk_score": 87,
        "risk_level": "critical",
        "state": "Maharashtra"
      }
    }
  ]
}
```

### GET `/map/clusters`
Detect and return geographic clusters of suspicious projects.

---

## Analytics

### GET `/analytics/summary`
Platform-wide summary statistics.

**Response:**
```json
{
  "total_projects": 1248,
  "critical_count": 42,
  "high_count": 156,
  "moderate_count": 402,
  "low_count": 648,
  "avg_risk_score": 34.2,
  "open_investigations": 18,
  "total_sanctioned_amount": 4823000000,
  "states_covered": 28
}
```

### GET `/analytics/anomalies-by-category`
Anomaly counts grouped by rule category.

### GET `/analytics/risk-by-state`
Risk distribution broken down by state.

### GET `/analytics/contractor-concentration`
Top contractors by project count and total value — flags concentration risk.

---

## Audit Logs

### GET `/audit/logs`
View system audit trail. (Role: `superadmin` only)

**Query Parameters:** `user_id`, `action`, `resource_type`, `from_date`, `to_date`

---

## Error Responses

| Code | Meaning |
|------|---------|
| `400` | Bad Request — validation error |
| `401` | Unauthorized — missing/invalid token |
| `403` | Forbidden — insufficient role |
| `404` | Not Found |
| `422` | Unprocessable Entity — Pydantic schema error |
| `500` | Internal Server Error |

```json
{
  "detail": "Project not found"
}
```
