import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 


const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUserInfo(decoded.user);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }, [navigate]);

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>Home page</h1>
            <h1>Welcome to the Home Page</h1>
            <>
                <Button variant="primary">Add Project</Button>{' '}
                <Button variant="danger">Delete Project</Button>{' '}
            </>
            {userInfo && (
                <div>
                    <h2>User Information</h2>
                    <img src={userInfo.picture} alt={`${userInfo.name}'s profile`} />
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    {/* Render other user details */}
                </div>
            )}
        </div>
    );
};

export default Home;
