import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const { register, loading, error } = useContext(AuthContext);
    
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        // Check if passwords match
        if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
            if (e.target.name === 'confirmPassword') {
                setPasswordsMatch(formData.password === e.target.value);
            } else {
                setPasswordsMatch(formData.confirmPassword === e.target.value);
            }
        }
    };
    
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
            <div className="coffee-icon">☕</div>
            <h2>Create Your Account</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                    {!passwordsMatch && (
                        <div className="error-message">Passwords do not match</div>
                    )}
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading || !passwordsMatch}
                >
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>
            
            <p>
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
};

export default Register;