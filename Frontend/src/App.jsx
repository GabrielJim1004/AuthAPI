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
            <AuthProvider>
                <div className="app-container">
                    <header>
                        <h1>Brew <span>Haven</span></h1>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/profile">My Account</Link></li>
                            </ul>
                        </nav>
                    </header>
                    
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

// Home component
const Home = () => {
    return (
        <div className="home-container">
            <div className="coffee-icon">☕</div>
            <h2>Welcome to Brew Haven</h2>
            <p>Your one-stop shop for premium barista accessories and specialty coffee.</p>
            
            <div className="home-buttons">
                <Link to="/register">Join Now</Link>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default App;