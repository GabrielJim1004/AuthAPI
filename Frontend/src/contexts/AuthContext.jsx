import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    const API_URL = 'http://127.0.0.1:8000'; // Adjust this to your API URL
    
    // Check if token exists and fetch user data when component mounts
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
                        // Token invalid or expired
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                } catch (err) {
                    console.error('Error verifying token:', err);
                    setError('Authentication failed. Please login again.');
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        
        verifyToken();
    }, [token]);
    
    // Register a new user
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
                body: JSON.stringify({ name, lastname, email, password }) // Ensure this matches the backend schema
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate('/profile');
            } else {
                setError(data.detail || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
        }
    
        setLoading(false);
    };
    
    // Login user
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
                navigate('/profile');
            } else {
                setError(data.detail || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please try again.');
        }
        
        setLoading(false);
    };
    
    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };
    
    // Check if user is authenticated
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