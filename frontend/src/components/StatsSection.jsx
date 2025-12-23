import React, { useState, useEffect } from 'react';
import { fetchStats } from '@/api/publicApi';
import { Hotel, MapPin, Car, Calendar, Building, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/utils';

export default function StatsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#082c59] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!stats || Object.keys(stats).length === 0) {
    return null;
  }

  const statItems = [
    { 
      value: stats.total_hotels || 0, 
      label: 'Hotels', 
      icon: Hotel,
      color: 'from-blue-400 to-blue-600'
    },
    { 
      value: stats.total_routes || 0, 
      label: 'Travel Routes', 
      icon: MapPin,
      color: 'from-green-400 to-green-600'
    },
    { 
      value: stats.total_vehicles || 0, 
      label: 'Vehicles', 
      icon: Car,
      color: 'from-orange-400 to-orange-600'
    },
    { 
      value: stats.total_events || 0, 
      label: 'Events', 
      icon: Calendar,
      color: 'from-purple-400 to-purple-600'
    },
    { 
      value: stats.cities_covered || 0, 
      label: 'Cities Covered', 
      icon: Building,
      color: 'from-pink-400 to-pink-600'
    },
    { 
      value: stats.happy_customers || 0, 
      label: 'Happy Customers', 
      icon: Users,
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#082c59] via-[#0a3d7a] to-[#082c59] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Platform Statistics
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted Across Cameroon
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            Join thousands of satisfied customers who rely on Oryno for their everyday service needs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-all"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:border-white/40 transition-all hover:scale-105 duration-300">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {formatNumber(stat.value)}
                </div>
                <div className="text-white/70 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
