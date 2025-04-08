import os
from datetime import timedelta

# Para Pydantic v2, necesitamos usar Settings desde pydantic-settings
try:
    # Intenta importar desde pydantic-settings (Pydantic v2)
    from pydantic_settings import BaseSettings
except ImportError:
    # Si no está disponible, utiliza la ubicación original para Pydantic v1
    from pydantic import BaseSettings


class Settings(BaseSettings):
    # Configuración de JWT
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "supersecretkey")  # Clave secreta para firmar tokens JWT
    JWT_ALGORITHM: str = "HS256"  # Algoritmo utilizado para encriptar los tokens JWT
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # Tiempo de expiración de los tokens JWT en minutos
    
    # Configuración de la base de datos
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mssql+pyodbc://@DESKTOP-A3PCSNK\\SQLEXPRESS/FastApi?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
    )  # URL de conexión a la base de datos, con un valor predeterminado para SQL Server
    
    class Config:
        env_file = ".env"  # Especifica que las configuraciones también se pueden cargar desde un archivo .env

settings = Settings()