#Configura la base de datos y proporciona las herramientas necesarias para interactuar con ella.
from sqlalchemy import create_engine #crea la conexión a la base de datos
from sqlalchemy.ext.declarative import declarative_base #Define la clase base para los modelos de la base de datos
from sqlalchemy.orm import sessionmaker #crea la sesión para interactuar con la base de datos
from .config import settings #Importa la configuración de la base de datos desde el archivo de configuración

# Crea el motor de la base de datos utilizando la URL de la base de datos definida en la configuración
engine = create_engine(settings.DATABASE_URL)

# Crea una clase de sesión que se utilizará para interactuar con la base de datos
# autocommit=False: No se guardan automáticamente los cambios en la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crea una clase base para los modelos de la base de datos
# Esta clase se utilizará para definir los modelos de la base de datos
Base = declarative_base()

# Crea una función que proporciona una sesión de base de datos para su uso en las rutas de la API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        