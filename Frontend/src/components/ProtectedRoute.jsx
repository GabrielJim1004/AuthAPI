import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    // Accede al estado de autenticación y al estado de carga desde AuthContext
    const { isAuthenticated, loading } = useContext(AuthContext);
    
    // Muestra un mensaje de carga mientras se determina el estado de autenticación
    if (loading) {
        return <div className="loading">Cargando...</div>;
    }
    
    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Renderiza el contenido protegido si el usuario está autenticado
    return children;
};

export default ProtectedRoute;