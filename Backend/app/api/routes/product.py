from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductDto

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[ProductDto])
def get_products(db: Session = Depends(get_db)):
    """
    Obtener la lista de productos.
    """
    return db.query(Product).all()
