import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSlides = [
  {
    id: 1,
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ff629f4ed_shipping-containers-cargo-port-sunset.jpg',
    title: 'Booking Travel Made Easy',
    subtitle: 'Seamless bus and travel reservations across Cameroon'
  },
  {
    id: 2,
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/678d08a73_scene-with-photorealistic-logistics-operations-proceedings.jpg',
    title: 'Seamless Package Delivery',
    subtitle: 'Fast and reliable logistics services'
  },
  {
    id: 3,
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e5cbe65af_transport-logistics-concept.jpg',
    title: 'Real-Time Tracking',
    subtitle: 'Track your shipments every step of the way'
  },
  {
    id: 4,
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c459c4b6c_transport-logistics-concept1.jpg',
    title: 'All Services, One Platform',
    subtitle: 'Hotels, travel, rentals, and more'
  }
];

export default function OrynoMarketingCarousel({ slides = defaultSlides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) {
      clearInterval(progressInterval.current);
      return;
    }

    const duration = 4000; // 4 seconds per slide
    const intervalTime = 50; // Update progress every 50ms
    const increment = (intervalTime / duration) * 100;

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(current => (current + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval.current);
  }, [isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
        <p className="text-white text-lg">No slides available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-900 rounded-2xl overflow-hidden group">
      {/* Main Image with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex]?.image}
            alt={slides[currentIndex]?.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              {slides[currentIndex]?.title}
            </h3>
            {slides[currentIndex]?.subtitle && (
              <p className="text-white/80 text-sm sm:text-base mb-4">
                {slides[currentIndex]?.subtitle}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <span className="text-sm font-medium">
            {currentIndex + 1}/{slides.length}
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label={isAutoPlaying ? 'Pause' : 'Play'}
      >
        {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
