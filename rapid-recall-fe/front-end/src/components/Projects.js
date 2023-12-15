import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Container, Button, Table, Form, Row, Col, Card } from 'react-bootstrap';
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
            const response = await axios.get('https://rapid-recall.online/api/projects', {
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
            await axios.delete(`https://rapid-recall.online/api/projects/${projectId}`, {
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
            const response = await axios.post('https://rapid-recall.online/api/projects', newProject, {
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
        <Container>
            <Card className="my-3">
                <Card.Header as="h5">Projects</Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Description"
                                        value={projectDescription}
                                        onChange={(e) => setProjectDescription(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={addProject}>Add Project</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Project Description</th>
                    <th>Delete Project</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project._id}>
                        <td>
                            <Link to={`/project/${project._id}`}>{project.name}</Link>
                        </td>
                        <td>{project.description}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteProject(project._id)}>
                                Delete Project
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Projects;
