import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { WEBAPP_URLS } from '@/api/publicApi';

export default function HelpBanner() {
  const handleGetStarted = () => {
    window.location.href = WEBAPP_URLS.register;
  };

  return (
    <div className="bg-gradient-to-r from-[#082c59] via-[#0a3d7a] to-[#082c59] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need Help Getting Started?
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Our support team is available 24/7 to help you with bookings, reservations, 
              and any questions you might have.
            </p>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={handleGetStarted}
              className="bg-white text-[#082c59] hover:bg-gray-100 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
              
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
