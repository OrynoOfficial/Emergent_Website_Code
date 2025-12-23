import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

// Static carousel items since the external API is unavailable
const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    caption: "Streamlined Operations",
    description: "Efficient workflows that save time"
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    caption: "Excellence in Service",
    description: "Premium quality at every step"
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    caption: "Ease of Use",
    description: "Simple and intuitive platform"
  },
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    caption: "Wider Customer Reach",
    description: "Connect with customers across Africa"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    caption: "24/7 Support",
    description: "Always here when you need us"
  },
  {
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    caption: "Secure Transactions",
    description: "Your data is always protected"
  }
];

export default function WhyChooseUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section className="relative bg-white py-12 sm:py-14 lg:py-16 overflow-hidden">
      {/* Animated Background Elements - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-[#082c59] to-gray-900 mb-2 sm:mb-3">
            Why Choose Oryno?
          </h2>
        </motion.div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 text-[#082c59]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 text-[#082c59]" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-8 sm:mx-12">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-1 sm:px-2"
                >
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-xl shadow-lg sm:shadow-lg">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-[150px] sm:h-[220px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay gradient - smaller on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:hidden" />
                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                    
                    {/* Premium Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-lg px-2 py-1 sm:px-2 sm:py-1 shadow-lg">
                      <div className="flex items-center gap-1 sm:gap-1">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#082c59]" />
                        <span className="text-[8px] sm:text-[10px] font-bold text-[#082c59]">Premium</span>
                      </div>
                    </div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <p className="text-white text-sm sm:text-base font-semibold mb-0.5 sm:mb-0.5">{item.caption}</p>
                      <p className="text-white/80 text-[10px] sm:text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-1.5 mt-4 sm:mt-5">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 6000);
                }}
                className={`h-1.5 sm:h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 sm:w-5 bg-[#082c59]' 
                    : 'w-1.5 sm:w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
