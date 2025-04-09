import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    // Estado para gestionar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    // Accede a la función de registro, estado de carga y mensaje de error desde AuthContext
    const { register, loading, error } = useContext(AuthContext);
    
    // Estado para verificar si las contraseñas coinciden
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    // Maneja los cambios en los inputs y actualiza el estado formData
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        // Verifica si las contraseñas coinciden
        if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
            if (e.target.name === 'confirmPassword') {
                setPasswordsMatch(formData.password === e.target.value);
            } else {
                setPasswordsMatch(formData.confirmPassword === e.target.value);
            }
        }
    };
    
    // Maneja el envío del formulario y llama a la función de registro
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        
        register(formData.name, formData.lastname, formData.email, formData.password);
    };
    
    return (
        <div className="register-container">
            {/* Icono decorativo de café */}
            <div className="coffee-icon">☕</div>
            <h2>Crea tu cuenta</h2>
            
            {/* Muestra un mensaje de error si el registro falla */}
            {error && <div className="error-message">{error}</div>}
            
            {/* Formulario de registro */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Pérez"
                        required
                    />
                </div>
                
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
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                    {/* Muestra un mensaje de error si las contraseñas no coinciden */}
                    {!passwordsMatch && (
                        <div className="error-message">Las contraseñas no coinciden</div>
                    )}
                </div>
                
                {/* Botón de envío con estado de carga */}
                <button 
                    type="submit" 
                    disabled={loading || !passwordsMatch}
                >
                    {loading ? 'Creando...' : 'Crear cuenta'}
                </button>
            </form>
            
            {/* Enlace a la página de inicio de sesión */}
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Register;