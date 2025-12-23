import React, { useState, useEffect } from 'react';
import { fetchPopularRoutes } from '@/api/publicApi';
import { MapPin, ArrowRight, Bus, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils';
import { WEBAPP_URLS } from '@/api/publicApi';

export default function PopularRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data = await fetchPopularRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Error loading routes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, []);

  const handleBookRoute = () => {
    window.location.href = WEBAPP_URLS.base;
  };

  if (loading) {
    return (
      <div id="routes" className="bg-slate-100 py-12 sm:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading popular routes...</p>
        </div>
      </div>
    );
  }

  if (routes.length === 0) return null;

  return (
    <div id="routes" className="bg-slate-100 py-12 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 text-xs font-semibold text-green-700 mb-4">
            <Bus className="w-4 h-4" />
            Popular Routes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Travel Across Cameroon
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Book bus tickets for the most popular intercity routes with trusted operators
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Route Header */}
              <div className="bg-gradient-to-r from-[#082c59] to-[#0a3d7a] p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">{route.from_city}</span>
                  </div>
                  <div className="flex-1 mx-3 border-t-2 border-dashed border-white/40 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full p-1">
                      <Bus className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{route.to_city}</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Users className="w-4 h-4" />
                    <span>{route.operators_count} operators</span>
                  </div>
                  <div className="text-xs text-gray-500">Multiple departures</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From</span>
                    <div className="text-lg font-bold text-[#082c59]">
                      {formatCurrency(route.min_price)}
                    </div>
                  </div>
                  <Button
                    onClick={handleBookRoute}
                    size="sm"
                    className="bg-[#082c59] hover:bg-[#0a3d7a] text-white text-xs"
                  >
                    Book
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            onClick={handleBookRoute}
            className="bg-[#082c59] hover:bg-[#0a3d7a] text-white px-8 py-3"
          >
            View All Routes <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
