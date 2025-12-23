import React, { useState, useEffect, useRef } from 'react';
import { fetchFeaturedHotels } from '@/api/publicApi';
import { Star, MapPin, Wifi, Car, Dumbbell, UtensilsCrossed, Wine, Loader2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/utils';
import { WEBAPP_URLS } from '@/api/publicApi';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  bar: Wine,
  pool: () => <span className="text-xs">🏊</span>,
  room_service: () => <span className="text-xs">🛍️</span>
};

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchFeaturedHotels();
        setHotels(data);
      } catch (error) {
        console.error('Error loading hotels:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  // Auto-play for carousel
  useEffect(() => {
    if (hotels.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % hotels.length);
      }, 5000);
      return () => clearInterval(autoPlayRef.current);
    }
  }, [hotels.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotels.length);
    }, 5000);
  };

  const handleBookNow = () => {
    window.location.href = WEBAPP_URLS.base;
  };

  if (loading) {
    return (
      <div id="hotels" className="bg-white py-12 sm:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading featured hotels...</p>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) return null;

  const HotelCard = ({ hotel, featured = false }) => {
    // Handle both API format and fallback format
    const location = hotel.location || `${hotel.city || ''}${hotel.city && hotel.country ? ', ' : ''}${hotel.country || ''}`;
    const price = hotel.price || hotel.price_per_night;
    const rating = hotel.rating || hotel.average_rating || 4.5;
    const amenities = hotel.amenities || [];
    
    return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className={`relative ${featured ? 'h-48 sm:h-64' : 'h-40'}`}>
        {hotel.image ? (
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-gradient-to-br', 'from-[#082c59]', 'to-[#0a3d7a]');
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#082c59] to-[#0a3d7a] flex items-center justify-center">
            <span className="text-6xl">🏨</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            {[...Array(hotel.star_rating || 4)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
            <Star className="w-3 h-3 fill-white" />
            {typeof rating === 'number' ? rating.toFixed(1) : rating}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>{hotel.name}</h3>
        {location && (
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
        
        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 4).map((amenity, idx) => {
              const amenityKey = typeof amenity === 'string' ? amenity.toLowerCase() : '';
              const Icon = amenityIcons[amenityKey];
              return (
                <div key={idx} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
                  {Icon ? (typeof Icon === 'function' ? <Icon /> : <Icon className="w-3 h-3" />) : null}
                  <span className="capitalize">{amenity.replace('_', ' ')}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">From</span>
            <div className="text-xl font-bold text-[#082c59]">
              {formatCurrency(price)}
              <span className="text-xs font-normal text-gray-500">/night</span>
            </div>
          </div>
          <Button 
            onClick={handleBookNow}
            className="bg-[#082c59] hover:bg-[#0a3d7a] text-white text-xs px-4 py-2"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
  };

  return (
    <div id="hotels" className="bg-gray-50 py-12 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#082c59]"></span>
              <p className="font-semibold text-[#082c59] text-xs">Featured Hotels</p>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900">
              Top-Rated Accommodations
            </h2>
            <p className="text-gray-600 text-sm max-w-xl">
              Discover our handpicked selection of premium hotels across Cameroon
            </p>
          </div>
          <Button 
            onClick={handleBookNow}
            variant="outline"
            className="mt-4 sm:mt-0 border-[#082c59] text-[#082c59] hover:bg-[#082c59] hover:text-white"
          >
            View All Hotels <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <HotelCard hotel={hotels[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => { setCurrentIndex((prev) => (prev - 1 + hotels.length) % hotels.length); resetAutoPlay(); }}
              className="p-2 bg-white rounded-full shadow-lg border"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {hotels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentIndex(idx); resetAutoPlay(); }}
                  className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-[#082c59]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              onClick={() => { setCurrentIndex((prev) => (prev + 1) % hotels.length); resetAutoPlay(); }}
              className="p-2 bg-white rounded-full shadow-lg border"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} featured={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
