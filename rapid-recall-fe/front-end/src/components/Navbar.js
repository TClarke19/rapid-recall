import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token from local storage
        navigate('/');  // Redirect to the login page
    };

    if (location.pathname === '/') {
        return null;  // Don't show the navbar on the login page
    }

    return (
        <nav>
            <Link to="/home">Home</Link> |
            <Link to="/projects">View Projects</Link> |
            <Link to="/project_dashboard">Project Dashboard</Link> |
            <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
        </nav>
    );
};

export default Navbar;