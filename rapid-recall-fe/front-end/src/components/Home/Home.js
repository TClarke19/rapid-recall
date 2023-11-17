import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../contexts/AuthContext';



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
        <div>
            <h1>Home page</h1>
            {userInfo && (
                <div>
                    <h2>User Information</h2>
                    <img src={userInfo.picture} alt={`${userInfo.name}'s profile`} />
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
