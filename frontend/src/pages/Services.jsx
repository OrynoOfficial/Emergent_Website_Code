import React, { useState, useEffect } from 'react';
import { fetchServices } from '@/api/publicApi';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Button } from '@/components/ui/button';
import { ArrowRight, Hotel, Bus, Car, UtensilsCrossed, Calendar, Film, Shirt, Building, Package, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { WEBAPP_URLS } from '@/api/publicApi';

const iconMap = {
  hotel: Hotel, bus: Bus, car: Car, utensils: UtensilsCrossed,
  calendar: Calendar, film: Film, shirt: Shirt, building: Building, package: Package
};

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

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleExplore = () => {
    window.location.href = WEBAPP_URLS.base;
  };

  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover all the services Oryno offers to make your life easier
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
              <p className="text-gray-500 mt-4">Loading services...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Package;
                const colorClass = colorMap[service.id] || 'from-gray-500 to-gray-600';
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <Button
                      onClick={handleExplore}
                      variant="outline"
                      className="w-full border-[#082c59] text-[#082c59] hover:bg-[#082c59] hover:text-white group"
                    >
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
