import React from 'react';
import { ArrowRight, Globe, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { WEBAPP_URLS } from '@/api/publicApi';

export default function HeroContent() {
  const handleGetStarted = () => {
    window.location.href = WEBAPP_URLS.register;
  };

  const handleExploreServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-4xl lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-1 mb-3 pt-16 sm:mt-8 sm:mb-8 lg:mt-16 space-y-4 sm:space-y-8">

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-lg rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 border border-white/30 shadow-2xl hover:shadow-white/20 hover:from-white/25 hover:to-white/10 transition-all duration-300 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 group-hover:rotate-12 transition-transform relative z-10" />
              <span className="text-white text-xs font-semibold tracking-wide break-words relative z-10">Premium Service Platform</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2 sm:space-y-4 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10 blur-3xl" />
              <h1 className="text-white mt-1 pt-2 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl break-words drop-shadow-2xl relative">
                YOUR <span className="underline decoration-4 decoration-blue-400/50 underline-offset-8" style={{ color: '#082c59' }}>EVERYDAY</span> SERVICES HUB
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative">
              <p className="text-white/90 pb-2 text-xs leading-relaxed sm:text-base lg:text-sm max-w-3xl break-words backdrop-blur-sm bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                At Oryno, we bring you all essential services at your fingertips - from travel and hotel bookings to package shipments, restaurants, event management, and more. Experience seamless convenience across Cameroon.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4 sm:space-y-6">

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleExploreServices}
                  data-testid="explore-services-btn"
                  className="relative group bg-[#082c59] hover:bg-[#0a3d7a] text-white font-bold px-2.5 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm transition-all duration-500 shadow-xl hover:shadow-blue-400/60 hover:scale-105 w-full sm:w-auto overflow-hidden rounded-lg sm:rounded-xl border border-white/20">
                  <span className="relative z-10 break-words">Explore Our Services</span>
                  <ArrowRight className="relative z-10 ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
                
                <Button
                  onClick={handleGetStarted}
                  data-testid="get-started-btn"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-[#082c59] font-bold px-2.5 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto rounded-lg sm:rounded-xl">
                  Get Started Free
                </Button>
              </div>

              {/* Premium Stats */}
              <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-2">
                {[
                  { value: '9+', label: 'Services', icon: Globe },
                  { value: '24/7', label: 'Support', icon: Sparkles },
                  { value: '10K+', label: 'Happy Customers', icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.15, type: "spring", stiffness: 100 }}
                    className="relative group flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                    <div className="relative text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-2 py-1 sm:px-2 sm:py-1 group-hover:border-white/40 group-hover:bg-white/15 transition-all shadow-xl">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          stat.label === 'Services' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                          stat.label === 'Support' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          'bg-gradient-to-br from-yellow-400 to-yellow-600'
                        }`}>
                          <stat.icon className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-white whitespace-nowrap mb-0.5">{stat.value}</div>
                      <div className="text-white/80 text-[8px] sm:text-[9px] font-medium whitespace-nowrap">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
