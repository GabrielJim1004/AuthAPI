import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { login, loading, error } = useContext(AuthContext);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.email, formData.password);
    };
    
    return (
        <div className="login-container">
            <div className="coffee-icon">☕</div>
            <h2>Welcome Back</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
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
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Brewing...' : 'Sign In'}
                </button>
            </form>
            
            <p>
                Don't have an account yet? <Link to="/register">Join now</Link>
            </p>
        </div>
    );
};

export default Login;