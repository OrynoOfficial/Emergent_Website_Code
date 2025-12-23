import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, Calendar } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Happy Customers',
    description: 'Satisfied users across Cameroon',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: MapPin,
    value: '8',
    label: 'Major Cities',
    description: 'Coverage across the country',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Calendar,
    value: '100,000+',
    label: 'Bookings Made',
    description: 'Successfully completed',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Award,
    value: '4.8/5',
    label: 'Average Rating',
    description: 'Customer satisfaction score',
    color: 'from-yellow-500 to-orange-500'
  }
];

export default function ExcellenceStats() {
  return (
    <div className="bg-gradient-to-br from-[#082c59] via-[#0a3d7a] to-[#082c59] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <Award className="w-4 h-4" />
            Our Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Excellence in Numbers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Delivering exceptional service experiences across Cameroon
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/60 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
