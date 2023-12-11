import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import learning_one from '../learning_one.jpg';
import learning_two from '../learning_two.jpg';
import learning_three from '../learning_three.png';
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
        <>
            <Container className='d-flex flex columns justify-content-center align-items-center' style={{minHeight:'100vh'}}>
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
                                <Button variant='link' href='https://www.google.com/account/about/'>Don't have a Google account? Sign up!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Carousel interval={5000}>
                    <Carousel.Item>
                        <img src={learning_one} alt="First slide" style={{ width: '700px', height: 'auto' }}/>
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <h3>An app to help to prepare!</h3>
                        <p>Save your projects, and always be prepared!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={learning_two} alt="Second slide" style={{ width: '700px', height: 'auto' }}/>
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <h3>Keep track of all your projects!</h3>
                        <p>All in one convenient place!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={learning_three} alt="Third slide" style={{ width: '700px', height: 'auto' }}/>
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <h3>Everything is saved to your account!</h3>
                        <p>
                            Simply log in with your google account, and enjoy!
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
            
        </>
    );
};

export default Login;
