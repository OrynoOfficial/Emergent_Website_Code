import React, { useState, useEffect } from 'react';
import { fetchFeaturedPackages } from '@/api/publicApi';
import { Star, Clock, MapPin, ArrowRight, Loader2, Plane, Heart, Mountain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils';
import { WEBAPP_URLS } from '@/api/publicApi';

const packageTypeIcons = {
  travel: Plane,
  honeymoon: Heart,
  adventure: Mountain,
  luxury: Sparkles
};

const packageTypeColors = {
  travel: 'from-blue-500 to-cyan-500',
  honeymoon: 'from-pink-500 to-rose-500',
  adventure: 'from-green-500 to-emerald-500',
  luxury: 'from-amber-500 to-yellow-500'
};

export default function FeaturedPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchFeaturedPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error loading packages:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  const handleViewPackage = () => {
    window.location.href = WEBAPP_URLS.base;
  };

  if (loading) {
    return (
      <div id="packages" className="bg-white py-12 sm:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (packages.length === 0) return null;

  return (
    <div id="packages" className="bg-white py-12 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#082c59]/10 rounded-full px-4 py-1.5 text-xs font-semibold text-[#082c59] mb-4">
            <Sparkles className="w-4 h-4" />
            Featured Packages
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Curated Travel Experiences
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover our handpicked all-inclusive packages for unforgettable adventures
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg, index) => {
            const Icon = packageTypeIcons[pkg.package_type] || Plane;
            const colorClass = packageTypeColors[pkg.package_type] || 'from-gray-500 to-gray-600';
            
            return (
              <motion.div
                key={pkg.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image/Header */}
                <div className={`relative h-48 bg-gradient-to-br ${colorClass} p-6 flex flex-col justify-between`}>
                  <div className="flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold capitalize">
                      {pkg.package_type}
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                      <span className="text-white text-xs font-semibold">{pkg.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{pkg.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{pkg.duration_days} days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">Starting from</span>
                      <div className="text-2xl font-bold text-[#082c59]">
                        {formatCurrency(pkg.base_price)}
                      </div>
                    </div>
                    <Button
                      onClick={handleViewPackage}
                      className="bg-[#082c59] hover:bg-[#0a3d7a] text-white group"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            onClick={handleViewPackage}
            variant="outline"
            className="border-[#082c59] text-[#082c59] hover:bg-[#082c59] hover:text-white px-8 py-3"
          >
            Explore All Packages <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
