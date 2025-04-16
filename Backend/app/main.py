from fastapi import FastAPI
from app.api.routes import auth_router
from app.api.routes.product import router as product_router
from app.api.routes.currency import router as currency_router
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI(
    title="Authentication API",
    description="API for user authentication and profile management",
    version="1.0.0"
)
# Incluir las rutas de autenticación
app.include_router(auth_router)
# Incluir las rutas de productos
app.include_router(product_router)
# Incluir las rutas de tasas de cambio
app.include_router(currency_router)

# Configuración de los orígenes permitidos para CORS
origins = [
    "http://localhost:3000",  # Origen del frontend en React (puerto 3000)
    "http://localhost:5173",  # Origen del frontend en Vite (puerto 5173)
]

# Agregar el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solicitudes desde los orígenes definidos
    allow_credentials=True,  # Permitir el envío de cookies y credenciales
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados HTTP
)

@app.get("/")
def root():
    return {"message": "Authentication API is running"}