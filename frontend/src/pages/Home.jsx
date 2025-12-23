import React, { useEffect } from 'react';
import PillNav from '@/components/PillNav';
import HeroContent from '@/components/HeroContent';
import ServicesSection from '@/components/ServicesSection';
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
import TeamSection from '@/components/TeamSection';
import ExcellenceStats from '@/components/ExcellenceStats';
import ShippingOptions from '@/components/ShippingOptions';

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

      {/* About Section */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      {/* Analytics Section */}
      <AnimatedSection>
        <AnalyticsSection />
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection>
        <WhyChooseUs />
      </AnimatedSection>

      {/* Client Logos */}
      <ClientLogos />

      {/* Container Message CTA */}
      <AnimatedSection>
        <ContainerMessage />
      </AnimatedSection>

      {/* Shipping Options / Premium Services */}
      <AnimatedSection>
        <ShippingOptions />
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <ServicesSection />
      </AnimatedSection>

      {/* Excellence Stats */}
      <AnimatedSection>
        <ExcellenceStats />
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
