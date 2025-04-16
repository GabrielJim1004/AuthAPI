import requests
from fastapi import APIRouter, HTTPException
from app.config import settings

router = APIRouter(prefix="/currency", tags=["currency"])

@router.get("/rates")
def get_exchange_rates(base_currency: str = "USD"):
    """
    Obtener tasas de cambio desde una API externa.
    """
    try:
        # URL de la API de cambio de divisas
        url = f"https://api.exchangerate-api.com/v4/latest/{base_currency}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Filtrar solo las monedas necesarias
        filtered_rates = {
            "USD": data["rates"].get("USD", 1),
            "EUR": data["rates"].get("EUR"),
            "MXN": data["rates"].get("MXN"),
            "CRC": data["rates"].get("CRC"),  # Colones costarricenses
            "JPY": data["rates"].get("JPY")   # Yenes japoneses
        }
        return {"base": data["base"], "rates": filtered_rates}
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="Error al obtener tasas de cambio")
