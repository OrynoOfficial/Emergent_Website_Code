import React from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    description: 'Build and scale our platform to serve millions of users across Africa.'
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Yaoundé, Cameroon',
    type: 'Full-time',
    description: 'Lead product strategy and drive innovation in our service offerings.'
  },
  {
    id: 3,
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    description: 'Ensure our customers have exceptional experiences with Oryno services.'
  },
  {
    id: 4,
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    description: 'Drive brand awareness and customer acquisition across digital channels.'
  },
  {
    id: 5,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    description: 'Create beautiful, intuitive experiences for our mobile and web platforms.'
  }
];

const benefits = [
  { icon: Heart, title: 'Health Coverage', description: 'Comprehensive health insurance for you and your family' },
  { icon: Zap, title: 'Growth Opportunities', description: 'Continuous learning and career development programs' },
  { icon: Users, title: 'Great Team', description: 'Work with talented people who are passionate about their craft' },
  { icon: Globe, title: 'Remote Friendly', description: 'Flexible work arrangements to suit your lifestyle' }
];

export default function Careers() {
  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <Briefcase className="w-4 h-4" />
            We&apos;re Hiring!
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Join the Oryno Team
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Help us revolutionize service delivery across Africa
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-gray-600">We offer more than just a job</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-14 h-14 mx-auto bg-[#082c59]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#082c59]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600">Find your next opportunity at Oryno</p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#082c59] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Briefcase className="w-3 h-3" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link to={`/careers/apply/${job.id}`}>
                    <Button className="bg-[#082c59] hover:bg-[#0a3d7a] text-white whitespace-nowrap">
                      Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
