// frontend/src/components/projects/Project_Dash.js

import React from 'react';

const ProjectDash = () => {
    return (
       <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
            </nav>
            <h1>Projects</h1>
        </div>
        <div>
            <h1>Project Dashboard</h1>
            {/* Project dashboard content goes here */}
        </div>
    );
};

export default ProjectDash;