import React from 'react';
import Stack from './Stack';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Static shipping/service images for the stack component
const shippingImages = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=400&fit=crop"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&h=400&fit=crop"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=400&fit=crop"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500&h=400&fit=crop"
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop"
  }
];

export default function ShippingOptions() {
  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900">
            Explore Our Premium Services
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            for <span className="text-gray-900">your daily needs</span>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Whether you need travel bookings, package delivery, restaurant reservations, or event planning, 
            we offer a variety of reliable and efficient services to meet all your requirements.
          </p>
        </div>

        {/* Interactive Stack Component */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              cardDimensions={{ width: 300, height: 200 }}
              cardsData={shippingImages}
            />
            
            {/* Service Label Overlay */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#082c59] text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-xs text-blue-300 mb-1">Premium</div>
              <div className="font-semibold">Oryno Services</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center max-w-md mx-auto mt-16">
          <p className="text-gray-600 text-xs sm:text-sm">
            Reliable and efficient service delivery across all platforms, 
            ensuring convenience and timely fulfillment of your needs.
          </p>
          
          <Link to="/blog">
            <Button className="bg-[#082c59] hover:bg-[#0a3d7a] text-white font-semibold group text-xs sm:text-sm">
              Read Our Blog
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
