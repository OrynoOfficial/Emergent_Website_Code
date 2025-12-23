import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CreditCard, Headphones, Star, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your transactions and data are protected with enterprise-grade security.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book services anytime, anywhere. Our platform never sleeps.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Multiple payment options including mobile money, cards, and cash.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Our customer support team is always ready to assist you.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    icon: Star,
    title: 'Quality Assured',
    description: 'All service providers are vetted for quality and reliability.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'Quick booking process with instant confirmations.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

export default function WhyChooseUs() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 text-xs font-semibold text-green-700 mb-4">
            <Star className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Oryno Advantage
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence, innovation, and customer satisfaction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:bg-white"
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
