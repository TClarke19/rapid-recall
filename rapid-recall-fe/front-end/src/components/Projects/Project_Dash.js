// frontend/src/components/projects/Project_Dash.js

import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import CustomNavbar from '../Navbar';


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
           <CustomNavbar />
             <nav>
                { <Link to="/">Home</Link> }
                { <Link to="/projects">Projects</Link> }
                { <Link to="/logout">Logout</Link> }
            </nav> 
           <h1>Project Dashboard</h1>
            <Button variant="primary">Add Card</Button>{' '}
            <Button variant="danger">Delete Card</Button>{' '}

            {/* Project dashboard content goes here (this will be from the Projects component)*/}
        </div>
    );
};

export default ProjectDash;