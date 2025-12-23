import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Jean-Pierre Kamga',
    role: 'CEO & Founder',
    image: null,
    initials: 'JK',
    bio: 'Visionary leader with 15+ years in tech and logistics.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Marie Nguemo',
    role: 'COO',
    image: null,
    initials: 'MN',
    bio: 'Operations expert driving efficiency across all services.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Paul Fotso',
    role: 'CTO',
    image: null,
    initials: 'PF',
    bio: 'Tech innovator building the future of African services.',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Aminata Diallo',
    role: 'Head of Customer Success',
    image: null,
    initials: 'AD',
    bio: 'Passionate about delivering exceptional customer experiences.',
    color: 'from-pink-500 to-pink-600'
  }
];

export default function TeamSection() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#082c59]/10 rounded-full px-4 py-1.5 text-xs font-semibold text-[#082c59] mb-4">
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet the People Behind Oryno
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A dedicated team of professionals working to revolutionize service delivery in Africa
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
            >
              {/* Avatar */}
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                )}
              </div>

              <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
              <p className="text-[#082c59] text-sm font-medium mb-2">{member.role}</p>
              <p className="text-gray-500 text-xs mb-4">{member.bio}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
