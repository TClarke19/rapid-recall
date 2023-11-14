import { Link } from 'react-router-dom';

function Projects({ projects }) {
  return (
    <div>
      {projects.map(project => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      ))}
    </div>
  );
}

export default Projects;