//import React from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Flashcard from './Flashcard'; 

function Project({ flashcards }) {
    return (
      <div>
        {flashcards.map(flashcard => (
          <Flashcard flashcard={flashcard} key={flashcard.id} />
        ))}
          <h1>Project</h1>
          <Button variant="primary">Add Card</Button>{' '}
          <Button variant="danger">Delete Card</Button>{' '}
      </div>
    );
  }

export default Project;