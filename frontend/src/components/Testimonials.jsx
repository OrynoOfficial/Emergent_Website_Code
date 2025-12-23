import React, { useState, useEffect, useRef } from 'react';
import { fetchTestimonials } from '@/api/publicApi';
import { Star, ChevronLeft, ChevronRight, Quote, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(autoPlayRef.current);
    }
  }, [testimonials.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoPlay();
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];
  
  // Handle both API format and fallback format
  const getTestimonialData = (testimonial) => ({
    name: testimonial.name || testimonial.user_name || 'Anonymous',
    comment: testimonial.comment || testimonial.text || '',
    rating: testimonial.rating || 5,
    city: testimonial.city || testimonial.location || '',
    service: testimonial.service || testimonial.service_used || '',
    avatar: testimonial.avatar || testimonial.image || null
  });

  return (
    <div className="bg-gray-50 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-1.5 text-xs font-semibold text-yellow-700 mb-4">
            <Star className="w-4 h-4 fill-yellow-500" />
            Customer Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Real experiences from real customers across Cameroon
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              {currentTestimonial && (() => {
                const data = getTestimonialData(currentTestimonial);
                return (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8 w-10 h-10 bg-[#082c59] rounded-full flex items-center justify-center">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < data.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-center text-lg sm:text-xl leading-relaxed mb-8">
                    "{data.comment}"
                  </p>

                  {/* Author */}
                  <div className="text-center">
                    {data.avatar ? (
                      <img 
                        src={data.avatar} 
                        alt={data.name}
                        className="w-16 h-16 mx-auto rounded-full object-cover mb-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#082c59] to-[#0a3d7a] rounded-full flex items-center justify-center mb-3">
                        <span className="text-white text-2xl font-bold">
                          {data.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    <h4 className="font-bold text-gray-900 text-lg">{data.name}</h4>
                    {data.city && <p className="text-gray-500 text-sm">{data.city}</p>}
                    {data.service && <p className="text-[#082c59] text-xs font-medium mt-1">{data.service}</p>}
                  </div>
                </motion.div>
              )})()}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 hover:scale-110 transition-all z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 hover:scale-110 transition-all z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetAutoPlay();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#082c59]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
