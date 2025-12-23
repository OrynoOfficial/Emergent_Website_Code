import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';
import { Zap } from 'lucide-react';

const services = [
  { name: 'Travels & Bus', top: '5%', left: '8%', rotation: -12, delay: 0, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200' },
  { name: 'Hotels & Stay', top: '8%', left: '85%', rotation: 8, delay: 0.1, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
  { name: 'Car Rental', top: '35%', left: '2%', rotation: -8, delay: 0.2, image: 'https://images.unsplash.com/photo-1449965408869-ebd3fee56940?w=200' },
  { name: 'Restaurants', top: '35%', left: '90%', rotation: 10, delay: 0.3, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' },
  { name: 'Package Delivery', top: '65%', left: '5%', rotation: 6, delay: 0.4, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200' },
  { name: 'Banquets', top: '65%', left: '88%', rotation: -10, delay: 0.5, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200' },
  { name: 'Laundry', top: '88%', left: '15%', rotation: 12, delay: 0.6, image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=200' },
  { name: 'Events', top: '88%', left: '78%', rotation: -6, delay: 0.7, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200' }
];

export default function OrynoServiceNetwork() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden rounded-3xl">
      {/* Background animations */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl"
      />

      {/* Connection lines from center to each card */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          {services.map((_, index) => (
            <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082c59" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#082c59" stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>
        {services.map((service, index) => {
          const centerX = 50;
          const centerY = 50;
          const serviceX = parseFloat(service.left);
          const serviceY = parseFloat(service.top);
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${centerX}%`}
              y1={`${centerY}%`}
              x2={`${serviceX}%`}
              y2={`${serviceY}%`}
              stroke={`url(#gradient-${index})`}
              strokeWidth="1.5"
              strokeDasharray="6,6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.3, 0.7, 0.3],
                strokeDashoffset: [0, -12]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: service.delay },
                opacity: { duration: 2, repeat: Infinity, delay: service.delay },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          );
        })}
      </svg>

      {/* Service cards */}
      {services.map((service, index) => (
        <motion.div
          key={service.name}
          className="absolute hidden sm:block"
          style={{ 
            top: service.top, 
            left: service.left,
            zIndex: 2,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: service.rotation }}
          animate={{ opacity: 1, scale: 1, rotate: service.rotation }}
          transition={{ duration: 0.8, delay: service.delay }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [service.rotation, service.rotation + 2, service.rotation]
            }}
            transition={{ 
              duration: 4 + index * 0.3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TiltedCard
              imageSrc={service.image}
              altText={service.name}
              captionText={service.name}
              containerHeight="100px"
              containerWidth="100px"
              imageHeight="100px"
              imageWidth="100px"
              scaleOnHover={1.15}
              rotateAmplitude={12}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Mobile: Simple grid of services */}
      <div className="sm:hidden absolute inset-0 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-3">
          {services.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-2 shadow-lg text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden mb-1">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] font-medium text-gray-700 truncate">{service.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center Oryno Platform */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Pulsing rings */}
        <motion.div
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#082c59]"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-blue-500"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Platform box */}
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-[#082c59] via-blue-700 to-[#082c59] shadow-2xl overflow-hidden"
          animate={{ 
            boxShadow: [
              '0 10px 30px rgba(8, 44, 89, 0.4)',
              '0 10px 45px rgba(8, 44, 89, 0.6)',
              '0 10px 30px rgba(8, 44, 89, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Sparkles */}
          <motion.div
            className="absolute top-1.5 right-1.5 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-3 left-3 w-0.5 h-0.5 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mb-1"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ffab5f9a726762e2e6ad1f/b13fbadac_f6726dae0_logo.png"
                  alt="Oryno Logo"
                  className="w-full h-full object-contain p-1 scale-150"
                />
              </div>
            </motion.div>

            <h2 className="text-xs sm:text-sm font-bold text-white mb-0.5">Oryno</h2>
            <p className="text-white/80 text-[8px] text-center mb-1">Platform</p>
            
            <motion.div
              className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-1.5 py-0.5"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-2 h-2 text-yellow-300" />
              <span className="text-white text-[7px] font-medium">9 Services</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
