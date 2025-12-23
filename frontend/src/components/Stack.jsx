import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Stack({
  items = [],
  offset = 10,
  scaleFactor = 0.06,
  className = ''
}) {
  const [cards, setCards] = useState(items);

  const moveToEnd = (index) => {
    const newCards = [...cards];
    const [removed] = newCards.splice(index, 1);
    newCards.push(removed);
    setCards(newCards);
  };

  return (
    <div className={`relative ${className}`} style={{ height: 300, width: 250 }}>
      {cards.map((card, index) => {
        const isTop = index === 0;
        
        return (
          <motion.div
            key={card.id || index}
            className="absolute w-full cursor-pointer"
            style={{
              transformOrigin: 'top center',
              zIndex: cards.length - index
            }}
            initial={false}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              opacity: 1 - index * 0.1
            }}
            whileHover={isTop ? { scale: 1.05, y: -10 } : {}}
            onClick={() => isTop && moveToEnd(0)}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {card.image && (
                <div className="h-40 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                {card.title && (
                  <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                )}
                {card.description && (
                  <p className="text-gray-600 text-sm">{card.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
