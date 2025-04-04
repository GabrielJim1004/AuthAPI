from fastapi import FastAPI
from app.api.routes import auth_router
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI(
    title="Authentication API",
    description="API for user authentication and profile management",
    version="1.0.0"
)

# Include routers
app.include_router(auth_router)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Authentication API is running"}