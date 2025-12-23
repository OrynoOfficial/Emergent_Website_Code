import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Car, Plane, Ship, Truck, Train } from 'lucide-react';

const transportModes = [
  { icon: Bus, name: 'Bus Travel', description: 'Intercity bus services', color: 'from-green-500 to-green-600' },
  { icon: Car, name: 'Car Rental', description: 'Self-drive vehicles', color: 'from-blue-500 to-blue-600' },
  { icon: Plane, name: 'Air Travel', description: 'Flight bookings', color: 'from-purple-500 to-purple-600' },
  { icon: Ship, name: 'Sea Transport', description: 'Maritime services', color: 'from-cyan-500 to-cyan-600' },
  { icon: Truck, name: 'Cargo', description: 'Freight shipping', color: 'from-orange-500 to-orange-600' },
  { icon: Train, name: 'Rail', description: 'Train services', color: 'from-red-500 to-red-600' }
];

export default function TransportModes() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Multiple Transport Options
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from various transportation modes to suit your travel needs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {transportModes.map((mode, index) => (
            <motion.div
              key={mode.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all text-center group cursor-pointer"
            >
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <mode.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{mode.name}</h3>
              <p className="text-gray-500 text-xs">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
