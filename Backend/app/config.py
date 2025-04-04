import os
from datetime import timedelta

# For Pydantic v2, we need to use Settings from pydantic-settings
try:
    # Try to import from pydantic-settings (Pydantic v2)
    from pydantic_settings import BaseSettings
except ImportError:
    # Fall back to original location for Pydantic v1
    from pydantic import BaseSettings


class Settings(BaseSettings):
    # JWT Settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "supersecretkey")
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 
    
    # Database Settings
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mssql+pyodbc://@DESKTOP-A3PCSNK\\SQLEXPRESS/FastApi?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
    )
    
    class Config:
        env_file = ".env"

settings = Settings()