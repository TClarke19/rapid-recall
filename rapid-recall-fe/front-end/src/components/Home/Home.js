import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import

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
            <h1>Welcome to the Home Page</h1>
            {userInfo && (
                <div>
                  <nav>
                      <Link to="/">Home</Link>
                      <Link to="/projects">Projects</Link>
                  </nav>
                  <h1>Home page</h1>
                </div>
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
