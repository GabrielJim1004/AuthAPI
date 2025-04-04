#Define el modelo de usuario que representa la tabla de usuarios en la base de datos.
# Este modelo se utiliza para interactuar con la base de datos y realizar operaciones CRUD.
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base

class User(Base):
    __tablename__ = "users" #Define el nombre de la tabla en la base de datos
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(80), unique=True, nullable=False)
    name = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    hashed_password = Column(String(200), nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"