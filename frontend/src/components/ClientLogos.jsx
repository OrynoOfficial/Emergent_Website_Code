import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'MTN Cameroon', logo: '🟡' },
  { name: 'Orange Cameroon', logo: '🟠' },
  { name: 'Express Union', logo: '🔵' },
  { name: 'Guarantee Trust', logo: '🟢' },
  { name: 'United Bank', logo: '🔴' },
  { name: 'Afriland First Bank', logo: '🟣' }
];

export default function ClientLogos() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Trusted by Leading Partners
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-2xl">{partner.logo}</span>
              <span className="text-gray-700 font-medium text-sm">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
