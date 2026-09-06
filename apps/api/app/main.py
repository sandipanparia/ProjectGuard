from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.api.routes import auth, projects, risk

app = FastAPI(
    title="ProjectGuard India API",
    description="Backend API for ProjectGuard India",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")
app.include_router(risk.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to ProjectGuard India API"}
