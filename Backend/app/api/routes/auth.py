from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginDto, RegisterDto, TokenDto, UserDto
from app.core.security import verify_password, get_password_hash, create_access_token
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=TokenDto)
def register(user_data: RegisterDto, db: Session = Depends(get_db)):
    """Register a new user and return a JWT token."""
    # Check if user with email exists
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        name=user_data.name,
        lastname=user_data.lastname,
        hashed_password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Generate JWT token
    token = create_access_token(data={"sub": str(db_user.id)})
    return {"token": token}

@router.post("/login", response_model=TokenDto)
def login(user_credentials: LoginDto, db: Session = Depends(get_db)):
    """Authenticate a user and return a JWT token."""
    # Find user by email
    user = db.query(User).filter(User.email == user_credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify password
    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    
    # Generate JWT token
    token = create_access_token(data={"sub": str(user.id)})
    return {"token": token}

@router.get("/profile", response_model=UserDto)
def get_profile(current_user: User = Depends(get_current_user)):
    """Get the profile of the authenticated user."""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "lastname": current_user.lastname
    }