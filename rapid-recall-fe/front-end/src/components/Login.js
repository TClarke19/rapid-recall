import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css'

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use AuthContext

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            login(token); // Use login method from AuthContext
            navigate('/home');
        }
    }, [navigate, login]);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/api/google/login';
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Welcome Rapid [ Recall ]</Card.Title>
                            <Card.Text>
                                It's an app to help you study! Simply log in with your existing google account,
                                 create some flashcards, and learn the easy way! The flashcards will be saved to your account
                                 in projects! Add or delete your projects and flashcards to organize your workspace!
                            </Card.Text>
                            <Button variant="success" onClick={handleLogin}>Login with Google</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
