import React, { useEffect } from 'react';
import PillNav from '@/components/PillNav';
import HeroContent from '@/components/HeroContent';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import FeaturedHotels from '@/components/FeaturedHotels';
import FeaturedPackages from '@/components/FeaturedPackages';
import PopularRoutes from '@/components/PopularRoutes';
import Testimonials from '@/components/Testimonials';
import HelpBanner from '@/components/HelpBanner';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ClientLogos from '@/components/ClientLogos';
import FaqSection from '@/components/FaqSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import ContainerMessage from '@/components/ContainerMessage';
import ChatbotWidget from '@/components/ChatbotWidget';
import OrynoMarketingCarousel from '@/components/OrynoMarketingCarousel';
import OrynoServiceNetwork from '@/components/OrynoServiceNetwork';
import TransportModes from '@/components/TransportModes';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when landing on the page
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Navigation */}
        <PillNav />
        
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ffab5f9a726762e2e6ad1f/ba1f35d8f_Adjustthepreviousl.png"
            alt="Oryno services - Bus travel, car rentals, and logistics network"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '100vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <HeroContent />
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Client Logos */}
      <ClientLogos />

      {/* Stats Section - Platform Statistics */}
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <ServicesSection />
      </AnimatedSection>

      {/* Transport Modes */}
      <AnimatedSection>
        <TransportModes />
      </AnimatedSection>

      {/* Service Network */}
      <AnimatedSection>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Our Service Network
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore all the services connected through the Oryno platform
              </p>
            </div>
            <OrynoServiceNetwork />
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>

      {/* Featured Hotels */}
      <AnimatedSection>
        <FeaturedHotels />
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection>
        <WhyChooseUs />
      </AnimatedSection>

      {/* Marketing Carousel */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Discover Oryno
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the best of travel and logistics services
              </p>
            </div>
            <OrynoMarketingCarousel />
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Packages */}
      <AnimatedSection>
        <FeaturedPackages />
      </AnimatedSection>

      {/* Analytics Section */}
      <AnimatedSection>
        <AnalyticsSection />
      </AnimatedSection>

      {/* Popular Routes */}
      <AnimatedSection>
        <PopularRoutes />
      </AnimatedSection>

      {/* Container Message CTA */}
      <AnimatedSection>
        <ContainerMessage />
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection>
        <FaqSection />
      </AnimatedSection>

      {/* Help Banner */}
      <AnimatedSection>
        <HelpBanner />
      </AnimatedSection>

      {/* Footer */}
      <Footer />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </main>
  );
}
