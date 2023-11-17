// frontend/src/components/projects/Project_Dash.js

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
//import Navbar from '../Navbar';


const ProjectDash = () => {
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