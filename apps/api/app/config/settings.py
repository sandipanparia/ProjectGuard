from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/projectguard"
    REDIS_URL: str = "redis://localhost:6379/0"
    SECRET_KEY: str = "supersecretkey_change_in_production"
    JWT_SECRET: str = "supersecretjwt_change_in_production"
    CORS_ORIGINS: str = "*"

    class Config:
        env_file = "../../.env"
        env_file_encoding = 'utf-8'
        extra = 'ignore'

settings = Settings()
