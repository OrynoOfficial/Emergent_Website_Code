import React, { useState, useEffect } from 'react';
import { fetchStats } from '@/api/publicApi';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Package, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WEBAPP_URLS } from '@/api/publicApi';

const iconMap = { TrendingUp, Users, Package, MapPin };

const defaultInsights = [
  { icon: 'TrendingUp', value: '52%', label: 'Service Growth', description: 'Year-over-year increase in total bookings', color: 'text-green-600' },
  { icon: 'Users', value: '18.5K+', label: 'Active Customers', description: 'Monthly active users on our platform', color: 'text-blue-600' },
  { icon: 'Package', value: '99.2%', label: 'Service Fulfillment', description: 'Successful completion rate', color: 'text-purple-600' },
  { icon: 'MapPin', value: '25K+', label: 'Monthly Transactions', description: 'Total bookings processed monthly', color: 'text-orange-600' }
];

export default function AnalyticsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        if (data && Object.keys(data).length > 0) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const insights = stats ? [
    { icon: 'TrendingUp', value: `${stats.total_hotels || 12}+`, label: 'Hotels', description: 'Partner hotels available', color: 'text-green-600' },
    { icon: 'Users', value: `${(stats.happy_customers / 1000).toFixed(0)}K+`, label: 'Happy Customers', description: 'Satisfied users', color: 'text-blue-600' },
    { icon: 'Package', value: `${stats.total_routes || 72}`, label: 'Travel Routes', description: 'Active bus routes', color: 'text-purple-600' },
    { icon: 'MapPin', value: `${stats.cities_covered || 8}`, label: 'Cities', description: 'Coverage across Cameroon', color: 'text-orange-600' }
  ] : defaultInsights;

  useEffect(() => {
    if (isPaused || insights.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, insights.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const currentInsight = insights[currentIndex];
  const CurrentIcon = iconMap[currentInsight?.icon] || TrendingUp;

  return (
    <div className="bg-gray-50/80 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block bg-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-800">
              Real-Time Analytics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Data-Driven Excellence Across All Services
            </h2>
            <p className="text-gray-600 text-sm">
              Our platform tracks every interaction in real-time, ensuring optimal service quality 
              and customer satisfaction across all our offerings.
            </p>
            <div className="flex items-start gap-4 sm:gap-8">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1540929f0_shipping-containers-cargo-port-sunset.jpg"
                alt="Oryno Dashboard"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-lg"
              />
              <div className="pt-2">
                <Button
                  onClick={() => window.location.href = WEBAPP_URLS.register}
                  className="bg-[#082c59] hover:bg-[#0a3d7a] text-white text-xs font-semibold group px-4 py-2 sm:px-6 sm:py-3"
                >
                  View Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Live Platform Telemetry</h3>
            
            {/* Mobile: Single card carousel */}
            <div className="sm:hidden relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-2 ${currentInsight.color}`}>
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">{currentInsight.value}</div>
                  <div className="text-sm font-semibold text-gray-900">{currentInsight.label}</div>
                  <p className="text-xs text-gray-500">{currentInsight.description}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">
                  {insights.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentIndex(idx); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                      className={`h-1 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-[#082c59]' : 'w-1 bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button onClick={handleNext} className="bg-[#082c59] text-white p-1.5 rounded-full">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4">
              {insights.map((insight, index) => {
                const InsightIcon = iconMap[insight.icon] || TrendingUp;
                return (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                    <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 ${insight.color}`}>
                      <InsightIcon className="w-5 h-5" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{insight.value}</div>
                    <div className="text-sm font-semibold text-gray-900">{insight.label}</div>
                    <p className="text-xs text-gray-500">{insight.description}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom Card */}
            <div className="bg-gradient-to-r from-[#082c59] to-[#0a3d7a] text-white p-5 rounded-xl">
              <h4 className="font-semibold mb-2">360° Service Monitoring</h4>
              <p className="text-white/90 text-xs">
                Track every aspect of your service journey—from booking confirmations to delivery updates—all in one unified dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
