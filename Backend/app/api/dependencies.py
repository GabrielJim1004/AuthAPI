
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.database import get_db #Dependencia que proporciona una sesión de base de datos.
from app.models.user import User #Modelo de usuario que representa la tabla de usuarios en la base de datos.
from app.config import settings #Configuración de la aplicación, incluyendo la clave secreta y el algoritmo para JWT.

#Define el esquema de seguridad para la autenticación con JWT.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

#Define la función get_current_user que se utiliza como dependencia en las rutas protegidas.
#Esta función extrae el token JWT del encabezado de autorización y valida al usuario correspondiente.
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get the current user from the JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    #define una excepción de credenciales que se lanzará si la validación falla.
    #Intenta decodificar el token JWT utilizando la clave secreta y el algoritmo configurados.
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        user_id: int = int(payload.get("sub"))
        if user_id is None:
            raise credentials_exception
    except (JWTError, ValueError):
        raise credentials_exception
    
    # Get user from database
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
        
    return user