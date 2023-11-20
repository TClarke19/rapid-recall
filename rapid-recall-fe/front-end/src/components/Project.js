//import React from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
//import Flashcard from './Flashcard';
import { useParams } from 'react-router-dom';

function Project() {
  const { id } = useParams();

  const flashcards = {
    1: [{ id: 1, question: 'Question 1', answer: 'Answer 1' }, { id: 2, question: 'Question 2', answer: 'Answer 2' }],
    2: [{ id: 3, question: 'Question 3', answer: 'Answer 3' }, { id: 4, question: 'Question 4', answer: 'Answer 4' }],
    3: [{ id: 5, question: 'Question 5', answer: 'Answer 5' }, { id: 6, question: 'Question 6', answer: 'Answer 6' }],
  };
    return (
      <div>
        {/* Display hard coded flashcard array here  */}
        <h1>Project</h1>
            <Button variant="primary">Add Card</Button>{' '}
            <Button variant="danger">Delete Card</Button>{' '}
            {/* {flashcards[id].map(flashcard => (
                <Flashcard flashcard={flashcard} key={flashcard.id} />
            ))} */}
            {flashcards[id].map(flashcard => (
        <div key={flashcard.id}>
          <h3>Question: {flashcard.question}</h3>
          <p>Answer: {flashcard.answer}</p>
        </div>
      ))}
        </div>
    );
  }

export default Project;