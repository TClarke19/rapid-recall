import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
//import Project from 'Project';



function Projects() { //{ projects = [] }
    const { isAuthenticated } = useContext(AuthContext); // Use AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate, isAuthenticated]);

    const projects = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Geography' },
      { id: 3, name: 'Technology' },
    ];

  return (
    <div>
      <>
          <h1>Projects</h1>
        <Button variant="primary">Add Project</Button>{' '}
        <Button variant="danger">Delete Project</Button>{' '}
        <br></br>
        
        {projects.map(project => (
            <div key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </div>
        ))}
        {/* Logged in user's projects will get retrieved from the database and be displayed here */}
      </>
    </div>
  );
}

export default Projects;