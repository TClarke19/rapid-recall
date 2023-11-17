// frontend/src/components/projects/Project_Dash.js

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
//import Navbar from '../Navbar';


const ProjectDash = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext); // Use AuthContext

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate, isAuthenticated]);

    return (
       <div>
           {/*<Navbar />
             <nav>
                { <Link to="/">Home</Link> }
                { <Link to="/projects">Projects</Link> }
                { <Link to="/logout">Logout</Link> }
            </nav> */}
           <h1>Project Dashboard</h1>
            <Button variant="primary">Add Card</Button>{' '}
            <Button variant="danger">Delete Card</Button>{' '}

            {/* Project dashboard content goes here */}
        </div>
    );
};

export default ProjectDash;