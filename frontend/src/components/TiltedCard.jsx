import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TiltedCard({
  imageSrc,
  altText = 'Card image',
  captionText = '',
  containerWidth = '150px',
  containerHeight = '150px',
  imageWidth = '150px',
  imageHeight = '150px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showCaption = true,
  className = ''
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -rotateAmplitude;
    const rotateYValue = (mouseX / (rect.width / 2)) * rotateAmplitude;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? scaleOnHover : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: containerWidth,
        height: containerHeight,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Card */}
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <img
          src={imageSrc}
          alt={altText}
          style={{ width: imageWidth, height: imageHeight }}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? '100%' : '-100%'
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Caption */}
        {showCaption && captionText && (
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white text-xs font-semibold text-center truncate drop-shadow-lg">
              {captionText}
            </p>
          </div>
        )}
      </div>
      
      {/* Shadow */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 rounded-full blur-md"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.4 : 0.2
        }}
      />
    </motion.div>
  );
}
