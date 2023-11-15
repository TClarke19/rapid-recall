import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';

function Flashcard({ flashcard }) {
    const [showAnswer, setShowAnswer] = React.useState(false);
  
    return (
      <>
        <div onClick={() => setShowAnswer(!showAnswer)}>
          {/* <div>{flashcard.question}</div>
          {showAnswer && <div>{flashcard.answer}</div>} */}
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventkey="0">
                {/* Flashcard question goes here */}
                <div>{flashcard.question}</div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                {/* Flashcard answer goes here */}
                <div>{flashcard.answer}</div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </div>
      </>
    );
  }

export default Flashcard;