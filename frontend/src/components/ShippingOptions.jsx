import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Plane, Ship, Package, Clock, Shield } from 'lucide-react';

const shippingOptions = [
  {
    icon: Truck,
    title: 'Ground Shipping',
    description: 'Reliable overland delivery across all major cities in Cameroon.',
    features: ['Door-to-door delivery', 'Real-time tracking', '2-5 business days'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Plane,
    title: 'Express Delivery',
    description: 'Fast air freight for urgent packages and time-sensitive items.',
    features: ['Same-day available', 'Priority handling', 'Insurance included'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Ship,
    title: 'International Shipping',
    description: 'Global shipping solutions for businesses and individuals.',
    features: ['Worldwide coverage', 'Customs support', 'Competitive rates'],
    color: 'from-green-500 to-green-600'
  }
];

export default function ShippingOptions() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-700 mb-4">
            <Package className="w-4 h-4" />
            Shipping Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Reliable Package Delivery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of shipping options to get your packages delivered safely and on time
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {shippingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-bold text-gray-900 text-xl mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              
              <ul className="space-y-2">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#082c59]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <Clock className="w-5 h-5 text-[#082c59]" />
            <span className="text-sm font-medium text-gray-700">On-Time Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <Shield className="w-5 h-5 text-[#082c59]" />
            <span className="text-sm font-medium text-gray-700">Package Protection</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <Package className="w-5 h-5 text-[#082c59]" />
            <span className="text-sm font-medium text-gray-700">Track & Trace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
