// frontend/src/components/projects/Project_Dash.js

import React from 'react';

const ProjectDash = () => {
    return (
       <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>Projects</h1>
            <Button variant="primary">Add Card</Button>{' '}
            <Button variant="danger">Delete Card</Button>{' '}
        </div>
        <div>
            <h1>Project Dashboard</h1>
            {/* Project dashboard content goes here */}
        </div>
    );
};

export default ProjectDash;