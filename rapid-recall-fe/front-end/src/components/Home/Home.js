import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../contexts/AuthContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import home_one from './home_image_one.jpg';
import home_two from './home_image_two.jpg';
import home_three from './home_image_three.jpg';
import Container from 'react-bootstrap/esm/Container';




const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const { isAuthenticated } = useContext(AuthContext); // Use AuthContext

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const decoded = jwtDecode(token);
            setUserInfo(decoded.user);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }, [navigate, isAuthenticated]);

    

    return (
        <>
        <div>
            <h1>Home page</h1>
            {userInfo && (
                <div className='info-center'>
                    <h2>User Information</h2>
                    <img src={userInfo.picture} alt={`${userInfo.name}'s profile`} />
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            )}
        </div>
        <Container className='d-flex flex columns justify-content-center align-items-center' style={{ marginTop: '-100px' }}>
            <Row className="justify-content-md-center">
                    <Col xs lg="6">
            
        </Col>
        </Row>

    <Carousel interval={5000}>
                    <Carousel.Item>
                        <img src={home_one} alt="First slide" style={{ width: '700px', height: 'auto' }}/>
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <h3>You can make projects based on a variety of subjects</h3>
                        <p>You can make them based on math, science, history, biology and more!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={home_two} alt="Second slide" style={{ width: '700px', height: 'auto' }}/>
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <h3>Keep track of all your projects!</h3>
                        <p>All in one convenient place!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={home_three} alt="Third slide" style={{ width: '700px', height: 'auto' }}/>
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

export default Home;
