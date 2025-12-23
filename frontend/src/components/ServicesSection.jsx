import React, { useState, useEffect, useRef } from 'react';
import { fetchServices } from '@/api/publicApi';
import { 
  Bus, Package, UtensilsCrossed, Calendar, Shirt, Car, Film, Building, 
  Hotel, MapPin, ArrowRight, ChevronLeft, ChevronRight, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { WEBAPP_URLS } from '@/api/publicApi';

// Icon mapping for services
const iconMap = {
  hotel: Hotel,
  bus: Bus,
  car: Car,
  utensils: UtensilsCrossed,
  calendar: Calendar,
  film: Film,
  shirt: Shirt,
  building: Building,
  package: Package,
  // Default fallbacks
  Hotel: Hotel,
  Bus: Bus,
  Car: Car,
  Package: Package
};

// Color mapping for services
const colorMap = {
  hotels: 'from-blue-500 to-blue-600',
  travel: 'from-green-500 to-green-600',
  'car-rental': 'from-orange-500 to-orange-600',
  restaurants: 'from-red-500 to-red-600',
  events: 'from-purple-500 to-purple-600',
  cinema: 'from-pink-500 to-pink-600',
  laundry: 'from-cyan-500 to-cyan-600',
  banquet: 'from-amber-500 to-amber-600',
  packages: 'from-indigo-500 to-indigo-600'
};

// Moved outside parent component to avoid re-creation on render
function ServiceCard({ service, onExplore }) {
  const Icon = service.IconComponent;
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 duration-300 h-full">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.colorClass} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <button
        onClick={onExplore}
        className="text-[#082c59] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
      >
        Explore <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        const servicesWithIcons = data.map((service) => ({
          ...service,
          IconComponent: iconMap[service.icon] || Package,
          colorClass: colorMap[service.id] || 'from-gray-500 to-gray-600'
        }));
        setServices(servicesWithIcons);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // Auto-play functionality for mobile carousel
  useEffect(() => {
    if (services.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 4000);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [services.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      resetAutoPlay();
    }
    if (touchStart - touchEnd < -50) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
      resetAutoPlay();
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    resetAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
    resetAutoPlay();
  };

  const handleExploreService = () => {
    window.location.href = WEBAPP_URLS.base;
  };

  if (loading) {
    return (
      <div id="services" className="bg-slate-100 py-12 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="services" className="bg-slate-100 py-12 sm:py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-16">
          <div className="lg:col-span-1 space-y-3 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-0.5 sm:w-3 sm:h-0.5 bg-[#082c59]"></span>
              <p className="font-semibold text-[#082c59] text-[10px] sm:text-xs">Our Services</p>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 leading-tight">
              Everything You Need, All in One Place
            </h2>
            <p className="text-gray-600 text-xs sm:text-base">
              From bus travel and hotel bookings to package shipments, restaurants, event management, 
              pressing, car rentals and entertainment - we bring you all these at your fingertips!
            </p>
            
            <Button 
              onClick={handleExploreService}
              data-testid="view-all-services-btn"
              className="bg-[#082c59] hover:bg-[#0a3d7a] text-white font-semibold px-6 py-3 text-xs sm:text-sm group mt-4"
            >
              View All Our Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Carousel */}
          <div className="lg:col-span-2 block sm:hidden">
            <div
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full"
                >
                  {services[currentIndex] && (
                    <ServiceCard service={services[currentIndex]} onExplore={handleExploreService} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetAutoPlay();
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ?
                    'w-8 bg-[#082c59]' :
                    'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="lg:col-span-2 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} onExplore={handleExploreService} />
            ))}
          </div>
        </div>

        {/* Show remaining services on desktop */}
        {services.length > 6 && (
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {services.slice(6).map((service) => (
              <ServiceCard key={service.id} service={service} onExplore={handleExploreService} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
