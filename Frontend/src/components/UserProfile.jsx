import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, loading, logout, isAuthenticated } = useContext(AuthContext);
    
    // If not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Show loading state
    if (loading) {
        return <div className="loading">Brewing your profile...</div>;
    }
    
    return (
        <div className="profile-container">
            <div className="coffee-icon">☕</div>
            <h2>My Brew Haven Account</h2>
            
            {user ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name} {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member ID:</strong> {user.id}</p>
                    
                    <button onClick={logout} className="logout-button">
                        Sign Out
                    </button>
                </div>
            ) : (
                <p>Failed to load your profile. Please try signing in again.</p>
            )}
        </div>
    );
};

export default UserProfile;