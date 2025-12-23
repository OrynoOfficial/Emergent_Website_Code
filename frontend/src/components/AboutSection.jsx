import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To simplify everyday services across Africa by providing a unified platform that connects people with essential services seamlessly.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become Africa\'s leading integrated services platform, making quality services accessible to everyone, everywhere.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Customer-first approach, innovation, reliability, and commitment to excellence in every service we provide.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div id="about" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#082c59]"></span>
              <p className="font-semibold text-[#082c59] text-xs uppercase tracking-wider">About Oryno</p>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Your Trusted Partner for
              <span className="text-[#082c59]"> Everyday Convenience</span>
            </h2>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Founded with a vision to transform how Africans access essential services, 
              Oryno brings together travel, hospitality, logistics, and lifestyle services 
              under one unified platform. We&apos;re committed to making your daily life easier 
              through technology and exceptional service.
            </p>
            
            <p className="text-gray-600 text-base leading-relaxed">
              From booking bus tickets and hotel rooms to ordering food and managing events, 
              Oryno is your one-stop solution for all service needs across Cameroon and beyond.
            </p>

            <Link to={createPageUrl('AboutUs')}>
              <Button className="bg-[#082c59] hover:bg-[#0a3d7a] text-white mt-4 group">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right - Values Cards */}
          <div className="space-y-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
