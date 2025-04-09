import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    // Estado para gestionar los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    // Accede a la función de inicio de sesión, estado de carga y mensaje de error desde AuthContext
    const { login, loading, error } = useContext(AuthContext);
    
    // Maneja los cambios en los inputs y actualiza el estado formData
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Maneja el envío del formulario y llama a la función de inicio de sesión
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.email, formData.password);
    };
    
    return (
        <div className="login-container">
            {/* Icono decorativo de café */}
            <div className="coffee-icon">☕</div>
            <h2>Bienvenido de nuevo</h2>
            
            {/* Muestra un mensaje de error si el inicio de sesión falla */}
            {error && <div className="error-message">{error}</div>}
            
            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu.correo@ejemplo.com"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                </div>
                
                {/* Botón de envío con estado de carga */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Preparando...' : 'Iniciar sesión'}
                </button>
            </form>
            
            {/* Enlace a la página de registro */}
            <p>
                ¿No tienes una cuenta? <Link to="/register">Regístrate ahora</Link>
            </p>
        </div>
    );
};

export default Login;