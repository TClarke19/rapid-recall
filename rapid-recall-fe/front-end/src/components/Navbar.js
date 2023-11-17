import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const CustomNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (location.pathname === '/') {
        return null;  // Don't show the navbar on the login page
    }

    {/* I added the bootstrap navbar. We can decide if we want to go with */}

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/home">Rapid [Recall]</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/project_dashboard">Project Dashboard</Nav.Link>
                    </Nav>
                    <button onClick={handleLogout}>Logout</button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;