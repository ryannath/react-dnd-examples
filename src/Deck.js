import { useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import Card from './Card';

const Deck = () => {
  // Deck handles the list of cards
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make dough',
    },
    {
      id: 3,
      text: 'Live well',
    },
  ]);

  // And provides a function that can be called to change that ordering
  // This is used by the card to reposition themselves
  const moveCard = (dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          // Remove the card that was dragged.
          [dragIndex, 1],
          // And insert the dragged card before hover index
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  };

  return (
    <div
      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {cards.map((card, index) => (
        <Card id={card.id} index={index} text={card.text} moveCard={moveCard} />
      ))}
    </div>
  );
};
export default Deck;
