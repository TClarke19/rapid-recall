import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
//import Project from 'Project';



function Projects() {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            fetchProjects();
        }
    }, [isAuthenticated, navigate]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/projects', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:3001/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProjects(projects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };


    const addProject = async () => {
        try {
            const newProject = { name: projectName, description: projectDescription };
            const response = await axios.post('http://localhost:3001/api/projects', newProject, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 201) {
                setProjects([...projects, response.data]);
            }

            // Reset input fields
            setProjectName('');
            setProjectDescription('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    /*const projects = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Geography' },
      { id: 3, name: 'Technology' },
    ];*/

  return (
    <div>
        <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>

        <table>
            <thead>
            <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Delete Project</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project, index) => (
                <tr key={project._id}>
                    <td>
                        <Link to={`/project/${project._id}`}>{project.name}</Link>
                    </td>
                    <td>{project.description}</td>
                    <td>
                        <button onClick={() => deleteProject(project._id, index)}>Delete Project</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default Projects;