import React from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import ExcellenceStats from '@/components/ExcellenceStats';
import { Target, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { WEBAPP_URLS } from '@/api/publicApi';

const timeline = [
  { year: '2022', title: 'Founded', description: 'Oryno was founded with a vision to simplify service access in Cameroon.' },
  { year: '2023', title: 'Expansion', description: 'Expanded to 5 major cities and added car rental and event services.' },
  { year: '2024', title: 'Growth', description: 'Reached 50,000+ customers and launched the mobile app.' },
  { year: '2025', title: 'Innovation', description: 'Introducing AI-powered recommendations and international expansion.' }
];

export default function AboutUs() {
  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About Oryno
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your trusted partner for everyday convenience across Africa
          </p>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Timeline */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">From a simple idea to transforming service delivery in Africa</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#082c59]/20 hidden md:block"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-[#082c59] font-bold text-2xl mb-2">{item.year}</div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#082c59] rounded-full z-10"></div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Excellence Stats */}
      <ExcellenceStats />

      {/* Team Section */}
      <TeamSection />

      {/* Careers Section */}
      <div id="careers-at-oryno" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for talented individuals who share our passion for innovation and customer service.
          </p>
          <Button
            onClick={() => window.location.href = '/careers'}
            className="bg-[#082c59] hover:bg-[#0a3d7a] text-white"
          >
            View Open Positions <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
