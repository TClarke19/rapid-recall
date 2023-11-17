import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';

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
        <div>
            <Button variant="success" onClick={handleLogin}>Login with Google</Button>
        </div>
    );
};

export default Login;
