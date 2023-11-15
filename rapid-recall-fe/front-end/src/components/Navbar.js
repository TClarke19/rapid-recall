import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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

    {/* I added the bootstrap navbar. We can decide if we want to go with */}

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home">Rapid [Recall]</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <nav>
                <Link to="/home">Home</Link> |
                <Link to="/projects">View Projects</Link> |
                <Link to="/project_dashboard">Project Dashboard</Link> |
                <Button variant='danger' onClick={handleLogout}>Logout</Button> {/* Logout Button */}
            </nav>
        </>
    );
};

export default Navbar;