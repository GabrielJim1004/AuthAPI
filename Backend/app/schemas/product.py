from pydantic import BaseModel

class ProductDto(BaseModel):
    id: int
    name: str
    description: str
    price: float
    currency: str

    class Config:
        from_attributes = True  # Reemplaza orm_mode por from_attributes
