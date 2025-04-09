import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, loading, logout, isAuthenticated } = useContext(AuthContext);
    
    // Si no está autenticado, redirige a la página de inicio de sesión
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Muestra un estado de carga mientras se obtienen los datos del usuario
    if (loading) {
        return <div className="loading">Preparando tu perfil...</div>;
    }
    
    return (
        <div className="profile-container">
            {/* Icono decorativo de café */}
            <div className="coffee-icon">☕</div>
            <h2>Mi cuenta en Brew Haven</h2>
            
            {/* Muestra los detalles del perfil del usuario si los datos están disponibles */}
            {user ? (
                <div className="profile-details">
                    <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
                    <p><strong>Correo electrónico:</strong> {user.email}</p>
                    <p><strong>ID de miembro:</strong> {user.id}</p>
                    
                    {/* Botón para cerrar sesión */}
                    <button onClick={logout} className="logout-button">
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                // Muestra un mensaje de error si no se pueden cargar los datos del usuario
                <p>No se pudo cargar tu perfil. Por favor, intenta iniciar sesión nuevamente.</p>
            )}
        </div>
    );
};

export default UserProfile;