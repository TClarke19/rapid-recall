import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomNavbar from '../Navbar';

const ProjectDash = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { projectId } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(-1); // Start with -1 indicating no flashcards
    const [revealBack, setRevealBack] = useState(false);
    const [newFlashcardFront, setNewFlashcardFront] = useState('');
    const [newFlashcardBack, setNewFlashcardBack] = useState('');

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/flashcards/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFlashcards(response.data);
                if (response.data.length > 0) {
                    setCurrentFlashcardIndex(0);
                }
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        if (isAuthenticated && projectId) {
            fetchFlashcards();
        } else if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, projectId, navigate]);


    const handleViewNextFlashcard = () => {
        if (flashcards.length === 0) {
            setCurrentFlashcardIndex(-1);
        } else {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * flashcards.length);
            } while (flashcards.length > 1 && nextIndex === currentFlashcardIndex);

            setCurrentFlashcardIndex(nextIndex);
        }
        setRevealBack(false);
    };

    const handleRevealBack = () => {
        setRevealBack(!revealBack);
    };

    const handleAddFlashcard = async () => {
        try {
            const newFlashcard = { front: newFlashcardFront, back: newFlashcardBack, projectId };
            const response = await axios.post('http://localhost:3001/api/flashcards', newFlashcard);
            setFlashcards([...flashcards, response.data]);
            setNewFlashcardFront('');
            setNewFlashcardBack('');
            if (currentFlashcardIndex === -1) {
                setCurrentFlashcardIndex(flashcards.length);
            }
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    const handleDeleteFlashcard = async (flashcardId) => {
        try {
            await axios.delete(`http://localhost:3001/api/flashcards/${flashcardId}`);
            const updatedFlashcards = flashcards.filter(flashcard => flashcard._id !== flashcardId);
            setFlashcards(updatedFlashcards);
            if (currentFlashcardIndex === updatedFlashcards.length) {
                setCurrentFlashcardIndex(updatedFlashcards.length - 1);
            }
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    return (
        <Container>
            <Card>
                <Card.Header as="h5">{`Flashcard`}</Card.Header>
                <Card.Body>
                    {flashcards.length === 0 || currentFlashcardIndex === -1 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                            Empty
                        </div>
                    ) : (
                        <React.Fragment>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px', borderRight: '1px solid #000' }}>
                                    <Card.Title>{flashcards[currentFlashcardIndex].front}</Card.Title>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                                    {revealBack ? (
                                        <Card.Title>{flashcards[currentFlashcardIndex].back}</Card.Title>
                                    ) : (
                                        <Card.Title>Click the button to see the back of the flashcard.</Card.Title>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-center">
                                    <Button variant="primary" onClick={handleViewNextFlashcard}>View Another Flashcard</Button>
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <Button variant="secondary" onClick={handleRevealBack} disabled={currentFlashcardIndex === -1}>Reveal Back of Flashcard</Button>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                </Card.Body>
            </Card>

            <Form className="my-3">
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Front Flashcard"
                        value={newFlashcardFront}
                        onChange={(e) => setNewFlashcardFront(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Back Flashcard"
                        value={newFlashcardBack}
                        onChange={(e) => setNewFlashcardBack(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleAddFlashcard}>Add Flashcard</Button>
            </Form>

            {flashcards.length > 0 ? (
                <Table striped bordered hover className="mt-3">
                    <thead>
                    <tr>
                        <th>Front (Flashcard)</th>
                        <th>Back (Flashcard)</th>
                        <th>Delete Flashcard</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flashcards.map((flashcard, index) => (
                        <tr key={flashcard._id}>
                            <td>{flashcard.front}</td>
                            <td>{flashcard.back}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteFlashcard(flashcard._id)}
                                    disabled={currentFlashcardIndex === index}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center mt-3">No Flashcards Available</div>
            )}
        </Container>
    );
};

export default ProjectDash;