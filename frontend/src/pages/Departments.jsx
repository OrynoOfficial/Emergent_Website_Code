import React, { useState } from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Building2, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const departments = [
  {
    id: 'engineering',
    name: 'Engineering',
    title: 'Building the Future of Service Delivery',
    content: `
      <h2>Our Engineering Team</h2>
      <p>The Engineering department at Oryno is the backbone of our technology platform. We build, maintain, and innovate on the systems that power millions of service transactions across Cameroon.</p>
      
      <h3>What We Do</h3>
      <ul>
        <li><strong>Platform Development:</strong> Building scalable web and mobile applications</li>
        <li><strong>Infrastructure:</strong> Managing cloud infrastructure and DevOps</li>
        <li><strong>Data Engineering:</strong> Processing and analyzing vast amounts of service data</li>
        <li><strong>Security:</strong> Ensuring the safety of user data and transactions</li>
      </ul>
      
      <h3>Technologies We Use</h3>
      <p>React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, and more.</p>
      
      <h3>Join Our Team</h3>
      <p>We're always looking for talented engineers who are passionate about solving complex problems and building products that impact millions of users.</p>
    `
  },
  {
    id: 'operations',
    name: 'Operations',
    title: 'Ensuring Seamless Service Delivery',
    content: `
      <h2>Operations Excellence</h2>
      <p>Our Operations team ensures that every booking, every delivery, and every service interaction runs smoothly across our platform.</p>
      
      <h3>Key Responsibilities</h3>
      <ul>
        <li><strong>Partner Management:</strong> Working with hotels, bus operators, and service providers</li>
        <li><strong>Quality Assurance:</strong> Maintaining high service standards</li>
        <li><strong>Logistics Coordination:</strong> Managing delivery networks</li>
        <li><strong>Crisis Management:</strong> Handling service disruptions swiftly</li>
      </ul>
      
      <h3>Our Impact</h3>
      <p>We've achieved 99.2% service fulfillment rate and maintain partnerships with over 100 service providers across Cameroon.</p>
    `
  },
  {
    id: 'customer-success',
    name: 'Customer Success',
    title: 'Putting Customers First',
    content: `
      <h2>Customer Success Team</h2>
      <p>We're dedicated to ensuring every customer has an exceptional experience with Oryno services.</p>
      
      <h3>What We Do</h3>
      <ul>
        <li><strong>24/7 Support:</strong> Available around the clock via chat, phone, and email</li>
        <li><strong>Issue Resolution:</strong> Quick and effective problem-solving</li>
        <li><strong>Customer Education:</strong> Helping users get the most from our platform</li>
        <li><strong>Feedback Collection:</strong> Gathering insights to improve our services</li>
      </ul>
      
      <h3>Our Metrics</h3>
      <p>Average response time under 2 minutes, 4.8/5 customer satisfaction rating, and 95% first-contact resolution rate.</p>
    `
  },
  {
    id: 'marketing',
    name: 'Marketing',
    title: 'Spreading the Oryno Story',
    content: `
      <h2>Marketing & Growth</h2>
      <p>Our Marketing team is responsible for building brand awareness and driving user acquisition across Cameroon and beyond.</p>
      
      <h3>Our Focus Areas</h3>
      <ul>
        <li><strong>Brand Strategy:</strong> Building a recognizable and trusted brand</li>
        <li><strong>Digital Marketing:</strong> SEO, social media, and paid advertising</li>
        <li><strong>Content Creation:</strong> Engaging content that tells our story</li>
        <li><strong>Partnerships:</strong> Strategic collaborations and sponsorships</li>
      </ul>
      
      <h3>Achievements</h3>
      <p>50,000+ social media followers, 200% year-over-year growth in brand awareness.</p>
    `
  },
  {
    id: 'product',
    name: 'Product',
    title: 'Designing User-Centric Solutions',
    content: `
      <h2>Product & Design</h2>
      <p>We create intuitive, beautiful products that solve real problems for our users.</p>
      
      <h3>Our Process</h3>
      <ul>
        <li><strong>User Research:</strong> Understanding customer needs and pain points</li>
        <li><strong>Product Strategy:</strong> Defining roadmaps and priorities</li>
        <li><strong>UX/UI Design:</strong> Creating seamless user experiences</li>
        <li><strong>Iteration:</strong> Continuous improvement based on feedback</li>
      </ul>
      
      <h3>Design Principles</h3>
      <p>Simplicity, accessibility, and delight guide everything we create.</p>
    `
  },
  {
    id: 'finance',
    name: 'Finance',
    title: 'Managing Growth Responsibly',
    content: `
      <h2>Finance & Legal</h2>
      <p>Our Finance team ensures the financial health of Oryno while maintaining compliance with all regulations.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li><strong>Financial Planning:</strong> Budgeting and forecasting</li>
        <li><strong>Accounting:</strong> Accurate financial reporting</li>
        <li><strong>Compliance:</strong> Regulatory adherence</li>
        <li><strong>Partner Payments:</strong> Timely settlements with service providers</li>
      </ul>
    `
  }
];

export default function Departments() {
  const [activeTab, setActiveTab] = useState(departments[0].id);
  const activeDepartment = departments.find(d => d.id === activeTab);

  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-12 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")'
        }} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
            <Building2 className="w-4 h-4 text-white" />
            <span className="text-white/90 font-medium text-xs">Our Departments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Departments & Teams
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover the teams that power Oryno&apos;s innovative platform
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                variant={activeTab === dept.id ? 'default' : 'outline'}
                size="sm"
                className={`whitespace-nowrap text-xs ${
                  activeTab === dept.id ? 'bg-[#082c59]' : ''
                }`}
              >
                {dept.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aboutus#careers-at-oryno" className="inline-flex items-center gap-2 text-[#082c59] hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to About Us
          </Link>

          <AnimatePresence mode="wait">
            {activeDepartment && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8"
              >
                <div className="inline-flex items-center gap-2 bg-[#082c59]/10 rounded-full px-4 py-1.5 text-xs font-semibold text-[#082c59] mb-4">
                  {activeDepartment.name}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {activeDepartment.title}
                </h1>

                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-[#082c59] prose-strong:text-gray-900 prose-ul:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: activeDepartment.content }}
                />

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Interested in joining this team?</p>
                  <Link to="/careers">
                    <Button className="bg-[#082c59] hover:bg-[#0a3d7a]">
                      View Open Positions <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
