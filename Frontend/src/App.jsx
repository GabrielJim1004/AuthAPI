import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    return (
        <Router>
            {/* Proporciona el contexto de autenticación a toda la aplicación */}
            <AuthProvider>
                <div className="app-container">
                    {/* Encabezado con enlaces de navegación */}
                    <header>
                        <h1>Brew <span>Haven</span></h1>
                        <nav>
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/register">Registrarse</Link></li>
                                <li><Link to="/login">Iniciar sesión</Link></li>
                                <li><Link to="/profile">Mi cuenta</Link></li>
                            </ul>
                        </nav>
                    </header>
                    
                    {/* Contenido principal con rutas */}
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <UserProfile />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
};

// Componente de inicio para la página principal
const Home = () => {
    return (
        <div className="home-container">
            <div className="coffee-icon">☕</div>
            <h2>Bienvenido a Brew Haven</h2>
            <p>Tu tienda única para accesorios premium de barista y café de especialidad.</p>
            
            <div className="home-buttons">
                <Link to="/register">Únete ahora</Link>
                <Link to="/login">Iniciar sesión</Link>
            </div>
        </div>
    );
};

export default App;