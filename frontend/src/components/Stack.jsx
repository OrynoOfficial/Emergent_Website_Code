import React, { useState, useMemo } from 'react';

// Simple seeded random number generator to avoid impure function calls during render
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  sendToBackOnClick = false
}) {
  // Pre-calculate random rotations using useMemo
  const randomRotations = useMemo(() => {
    return cardsData.map((_, index) => 
      randomRotation ? seededRandom(index + 1) * 10 - 5 : 0
    );
  }, [cardsData, randomRotation]);

  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
          { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
          { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
          { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
        ]
  );

  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative cursor-pointer"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: '600px',
      }}
    >
      {cards.map((card, index) => {
        const cardIndex = cardsData.findIndex(c => c.id === card.id);
        const randomRotate = randomRotations[cardIndex >= 0 ? cardIndex : index] || 0;
        const rotation = (cards.length - index - 1) * 4 + randomRotate;
        const scale = 1 + index * 0.06 - cards.length * 0.06;

        return (
          <div
            key={card.id}
            className="absolute transition-all duration-300 ease-out hover:scale-105"
            onClick={() => sendToBackOnClick && sendToBack(card.id)}
            style={{
              transform: `rotateZ(${rotation}deg) scale(${scale})`,
              transformOrigin: '90% 90%',
              width: cardDimensions.width,
              height: cardDimensions.height,
            }}
          >
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg w-full h-full">
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
