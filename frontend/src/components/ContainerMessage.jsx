import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WEBAPP_URLS } from '@/api/publicApi';

export default function ContainerMessage() {
  const handleGetStarted = () => {
    window.location.href = WEBAPP_URLS.register;
  };

  return (
    <div className="bg-slate-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#082c59] to-[#0a3d7a] rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-white"
              >
                <Sparkles className="w-4 h-4" />
                All-in-One Platform
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              >
                Your Gateway to Seamless Service Access Across Africa
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-base"
              >
                From hotel reservations to bus tickets, car rentals to event bookings 
                - experience the convenience of having all your service needs met in one place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleGetStarted}
                  className="bg-white text-[#082c59] hover:bg-gray-100 font-semibold px-6 py-3 group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                      <Globe className="w-10 h-10 text-[#082c59]" />
                    </div>
                    <div className="text-white font-bold text-xl">9+ Services</div>
                    <div className="text-white/70 text-sm">One Platform</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
                  <Package className="w-8 h-8 text-yellow-900" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-xl">✈️</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
