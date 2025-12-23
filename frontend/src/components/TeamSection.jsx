import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Users, Loader2 } from 'lucide-react';
import { teamApi } from '@/api/adminApi';

// Fallback data when API is unavailable
const FALLBACK_TEAM = [
  {
    id: '1',
    name: 'Jean-Pierre Kamga',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech and logistics.',
    initials: 'JK',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    name: 'Marie Nguemo',
    role: 'COO',
    bio: 'Operations expert driving efficiency across all services.',
    initials: 'MN',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '3',
    name: 'Paul Fotso',
    role: 'CTO',
    bio: 'Tech innovator building the future of African services.',
    initials: 'PF',
    color: 'from-green-500 to-green-600'
  }
];

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamApi.getHomeMembers();
        if (data && data.length > 0) {
          setTeamMembers(data);
        } else {
          setTeamMembers(FALLBACK_TEAM);
        }
      } catch (error) {
        console.warn('Using fallback team data:', error);
        setTeamMembers(FALLBACK_TEAM);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#082c59] mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#082c59]/10 rounded-full px-4 py-1.5 text-xs font-semibold text-[#082c59] mb-4">
            <Users className="w-4 h-4" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
            >
              {/* Avatar */}
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color || 'from-blue-500 to-blue-600'} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform overflow-hidden`}>
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-white">${member.initials || member.name.split(' ').map(n => n[0]).join('')}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
              <p className="text-[#082c59] text-sm font-medium mb-2">{member.role}</p>
              {member.bio && <p className="text-gray-500 text-xs mb-4 line-clamp-2">{member.bio}</p>}

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.twitter && (
                  <a 
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#082c59] hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {!member.linkedin && !member.twitter && !member.email && (
                  <>
                    <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                    </span>
                    <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-gray-400" />
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
