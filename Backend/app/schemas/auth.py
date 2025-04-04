#Define los esquemas de datos que se utilizarán en la aplicación para validar y serializar la información de los usuarios.
from pydantic import BaseModel, EmailStr
from typing import Optional

#Define el esquema para las solicitudes de inicio de sesión.
class LoginDto(BaseModel):
    email: str
    password: str

#Define el esquema para las solicitudes de registro.
class RegisterDto(BaseModel):
    name: str
    lastname: str
    email: str
    password: str

#Define el esquema para las respuestas que contienen un token de autenticación.
#Este token se utilizará para autenticar al usuario en las solicitudes posteriores.
class TokenDto(BaseModel):
    token: str

#Define el esquema para las respuestas que contienen información del usuario.
#Esta información se utilizará para mostrar detalles del usuario en la aplicación.
class UserDto(BaseModel):
    id: int
    email: str
    name: str
    lastname: str
    
    #Permite que este esquema se convierta en un modelo de SQLAlchemy.
    #Esto es útil para interactuar con la base de datos y realizar operaciones CRUD.
    class Config:  
        orm_mode = True