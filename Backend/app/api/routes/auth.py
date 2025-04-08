from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# Importa las dependencias necesarias para interactuar con la base de datos y manejar la autenticación
from app.database import get_db  # Dependencia para obtener la sesión de la base de datos
from app.models.user import User  # Modelo de usuario que representa la tabla en la base de datos
from app.schemas.auth import LoginDto, RegisterDto, TokenDto, UserDto  # Esquemas para validar y estructurar datos
from app.core.security import verify_password, get_password_hash, create_access_token  # Funciones de seguridad
from app.api.dependencies import get_current_user  # Dependencia para obtener el usuario autenticado

# Crea un enrutador para las rutas relacionadas con la autenticación
router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=TokenDto)
def register(user_data: RegisterDto, db: Session = Depends(get_db)):
    """
    Registrar un nuevo usuario y devolver un token JWT.
    - user_data: Datos del usuario enviados en la solicitud (validados con RegisterDto).
    - db: Sesión de la base de datos proporcionada por la dependencia get_db.
    """
    # Verifica si ya existe un usuario con el mismo correo electrónico
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"  # Error si el correo ya está registrado
        )
    
    # Crea un nuevo usuario con los datos proporcionados
    hashed_password = get_password_hash(user_data.password)  # Hashea la contraseña
    db_user = User(
        email=user_data.email,
        name=user_data.name,
        lastname=user_data.lastname,
        hashed_password=hashed_password
    )
    
    # Guarda el nuevo usuario en la base de datos
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # Actualiza el objeto db_user con los datos de la base de datos
    
    # Genera un token JWT para el usuario registrado
    token = create_access_token(data={"sub": str(db_user.id)})
    return {"token": token}  # Devuelve el token al cliente

@router.post("/login", response_model=TokenDto)
def login(user_credentials: LoginDto, db: Session = Depends(get_db)):
    """
    Autenticar a un usuario y devolver un token JWT.
    - user_credentials: Credenciales del usuario (correo y contraseña).
    - db: Sesión de la base de datos proporcionada por la dependencia get_db.
    """
    # Busca al usuario en la base de datos por su correo electrónico
    user = db.query(User).filter(User.email == user_credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"  # Error si el usuario no existe
        )
    
    # Verifica si la contraseña proporcionada coincide con la almacenada
    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"  # Error si la contraseña es incorrecta
        )
    
    # Genera un token JWT para el usuario autenticado
    token = create_access_token(data={"sub": str(user.id)})
    return {"token": token}  # Devuelve el token al cliente

@router.get("/profile", response_model=UserDto)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    Obtener el perfil del usuario autenticado.
    - current_user: Usuario autenticado proporcionado por la dependencia get_current_user.
    """
    return {
        "id": current_user.id,  # ID del usuario
        "email": current_user.email,  # Correo electrónico del usuario
        "name": current_user.name,  # Nombre del usuario
        "lastname": current_user.lastname  # Apellido del usuario
    }