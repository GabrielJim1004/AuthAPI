import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Crea el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Estados para gestionar los datos del usuario, token, estado de carga y mensajes de error
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    const API_URL = 'http://127.0.0.1:8000'; // URL del backend
    
    // Verifica el token y obtiene los datos del usuario cuando el componente se monta
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await fetch(`${API_URL}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        // Maneja tokens inválidos o expirados
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                } catch (err) {
                    console.error('Error al verificar el token:', err);
                    setError('La autenticación falló. Por favor, inicia sesión nuevamente.');
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        
        verifyToken();
    }, [token]);
    
    // Registra un nuevo usuario
    const register = async (name, lastname, email, password) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, lastname, email, password }) // Asegúrate de que coincida con el esquema del backend
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate('/profile');
            } else {
                setError(data.detail || 'El registro falló');
            }
        } catch (err) {
            console.error('Error al registrar:', err);
            setError('El registro falló. Por favor, intenta nuevamente.');
        }
    
        setLoading(false);
    };
    
    // Inicia sesión de un usuario
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate('/store'); // Redirige a la tienda
            } else {
                setError(data.detail || 'El inicio de sesión falló');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('El inicio de sesión falló. Por favor, intenta nuevamente.');
        }
        
        setLoading(false);
    };
    
    // Cierra sesión del usuario
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };
    
    // Verifica si el usuario está autenticado
    const isAuthenticated = !!token;
    
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                register,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};