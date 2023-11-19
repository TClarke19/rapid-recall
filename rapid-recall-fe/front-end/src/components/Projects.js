import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
//import Project from 'Project';

function Projects({ projects = [] }) {
    const { isAuthenticated } = useContext(AuthContext); // Use AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate, isAuthenticated]);

  return (
    <div>
      {projects.map(project => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      ))}
      <>
          <h1>Projects</h1>
        <Button variant="primary">Add Project</Button>{' '}
        <Button variant="danger">Delete Project</Button>{' '}
        {/* Logged in user's projects will get retrieved from the database and be displayed here */}
      </>
    </div>
  );
}

export default Projects;