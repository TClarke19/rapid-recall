function Flashcard({ flashcard }) {
    const [showAnswer, setShowAnswer] = React.useState(false);
  
    return (
      <div onClick={() => setShowAnswer(!showAnswer)}>
        <div>{flashcard.question}</div>
        {showAnswer && <div>{flashcard.answer}</div>}
      </div>
    );
  }

export default Flashcard;