import { Link } from 'react-router-dom';
import React from "react";
import Button from 'react-bootstrap/Button';

function Projects({ projects = [] }) {
  return (
    <div>
      {projects.map(project => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      ))}
      <>
          <h1>Projects</h1>
        <Button variant="primary">Add Project</Button>{' '}
        <Button variant="danger">Delete Project</Button>{' '}
      </>
    </div>
  );
}

export default Projects;