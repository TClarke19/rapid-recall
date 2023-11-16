import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/api/google/login';
    };

    return (
        <div>
            <Button variant="success" onClick={handleLogin}>Login with Google</Button>
        </div>
    );
};

export default Login;
