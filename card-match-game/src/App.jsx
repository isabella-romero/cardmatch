import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import './App.css';
import './components/Card.css';

const cardImages = [
  { src: "/Edgar-1.png", matched: false },
  { src: "/Edgar-2.png", matched: false },
  { src: "/Edgar-3.png", matched: false },
  { src: "/Edgar-4.png", matched: false },
  { src: "/Edgar-5.png", matched: false },
  { src: "/Edgar-6.png", matched: false },
  { src: "/Edgar-7.png", matched: false },
  { src: "/Edgar-8.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card); // First card clicked
    } else {
      setChoiceTwo(card); // Second card clicked
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // If the cards match, update their matched status
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        // If the cards don't match, reset them after a delay
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if all cards are matched
  const allCardsMatched = cards.every((card) => card.matched);

  return (
    <div className="App">
      <h1>Card Match Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {allCardsMatched && <h2>🎉 Happy Birthday! 🎉</h2>} {/* Display message when all cards are matched */}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
