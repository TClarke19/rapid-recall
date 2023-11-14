//import React from 'react';
import Flashcard from './Flashcard'; 

function Project({ flashcards }) {
    return (
      <div>
        {flashcards.map(flashcard => (
          <Flashcard flashcard={flashcard} key={flashcard.id} />
        ))}
      </div>
    );
  }

export default Project;