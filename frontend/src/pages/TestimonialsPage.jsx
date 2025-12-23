import React, { useState, useEffect } from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { fetchTestimonials } from '@/api/publicApi';
import { Star, Quote, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <Star className="w-4 h-4 fill-yellow-400" />
            Customer Reviews
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">What Our Customers Say</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Real stories from real customers across Cameroon
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-[#082c59] animate-spin mx-auto" />
              <p className="text-gray-500 mt-4">Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg relative"
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-[#082c59] rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex gap-1 mb-4 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#082c59] to-[#0a3d7a] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.city} • {testimonial.service}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
