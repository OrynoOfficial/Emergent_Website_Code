import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Settings, Package, Users, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { WEBAPP_URLS } from '@/api/publicApi';

const defaultContent = {
  cta_title: 'Ready to Get Started?',
  cta_description: 'Join thousands of users who trust Oryno for their everyday service needs across Cameroon',
  cta_button_text: 'Sign Up Now!',
  company_description: 'Your trusted partner for everyday convenience.',
  head_office_address: 'Douala, Cameroon',
  postal_address: 'BP 12345\nDouala, Cameroon',
  contact_email: 'info@oryno.com',
  contact_phone: '+237 6XX XXX XXX',
  copyright_text: '© 2025 Oryno. All rights reserved.'
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    const heroPageUrl = createPageUrl('Hero');
    
    if (location.pathname === heroPageUrl) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(heroPageUrl);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    }
  };

  const handleRegisterClick = () => {
    window.location.href = WEBAPP_URLS.register;
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-700 to-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10">
        {/* CTA Section */}
        <div className="border-b border-white/10">
          <div className="bg-[#082c59] mx-auto px-4 py-8 max-w-7xl sm:px-6 lg:px-8 sm:py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3 w-full lg:w-auto">
                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-[9px] sm:text-[10px] border border-white/20">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Available 24/7</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white">
                  {defaultContent.cta_title}
                </h2>
                <p className="text-white/80 text-[10px] sm:text-xs max-w-2xl">
                  {defaultContent.cta_description}
                </p>
              </div>

              <Button 
                onClick={handleRegisterClick}
                data-testid="footer-cta-btn"
                className="w-full sm:w-auto group relative bg-white text-slate-700 hover:bg-gray-100 px-5 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold rounded-2xl shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1">
                {defaultContent.cta_button_text}
                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <Link
              to={createPageUrl('Hero')}
              onClick={handleHomeClick}
              className="flex items-center gap-3 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-700 flex items-center justify-center overflow-hidden shadow-xl group-hover:scale-105 transition-transform">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ffab5f9a726762e2e6ad1f/b13fbadac_f6726dae0_logo.png"
                  alt="Oryno Logo"
                  className="w-full h-full object-contain p-2 scale-150"
                />
              </div>
              <span className="text-xl font-bold text-white">Oryno</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold mb-2 sm:mb-3 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
                Quick Links
              </h3>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {[
                  { label: 'Home', icon: Home, href: createPageUrl('Hero') },
                  { label: 'Services', icon: Settings, href: '#services' },
                  { label: 'Hotels', icon: Package, href: '#hotels' },
                  { label: 'About Us', icon: Users, href: '#about' }
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={item.label === 'Home' ? handleHomeClick : undefined}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group text-[10px] sm:text-xs lg:text-xs">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                      <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Head Office */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold mb-2 sm:mb-3 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
                Head Office
              </h3>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-white/70 text-[10px] sm:text-xs lg:text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">Oryno</p>
                    <p>{defaultContent.head_office_address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Postal Address */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold mb-2 sm:mb-3 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
                Postal Address
              </h3>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-white/70 text-[10px] sm:text-xs lg:text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">Oryno</p>
                    {defaultContent.postal_address?.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold mb-2 sm:mb-3 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
                Contact Us
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                    </div>
                    <span className="text-white font-medium text-[10px] sm:text-xs lg:text-xs">Email</span>
                  </div>
                  <a href={`mailto:${defaultContent.contact_email}`} className="text-white/70 hover:text-white text-[10px] sm:text-xs lg:text-xs break-all transition-colors pl-7 sm:pl-8 lg:pl-9 block">
                    {defaultContent.contact_email}
                  </a>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                    </div>
                    <span className="text-white font-medium text-[10px] sm:text-xs lg:text-xs">Phone</span>
                  </div>
                  <a href={`tel:${defaultContent.contact_phone?.replace(/\s/g, '')}`} className="text-white/70 hover:text-white text-[10px] sm:text-xs lg:text-xs transition-colors pl-7 sm:pl-8 lg:pl-9 block">
                    {defaultContent.contact_phone}
                  </a>
                </div>
                
                {/* Message Us Button */}
                <div className="space-y-0.5 sm:space-y-1">
                  <Link
                    to={createPageUrl('Contact')}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                      <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                    </div>
                    <span className="text-white font-medium text-[10px] sm:text-xs lg:text-xs">Message Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-5 sm:pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-white/50 text-[10px] sm:text-xs">{defaultContent.copyright_text}</p>
              <div className="flex flex-wrap justify-center gap-5 sm:gap-6 text-[10px] sm:text-xs text-white/50">
                <Link to="#privacy" className="hover:text-white transition-colors whitespace-nowrap">
                  Privacy Policy
                </Link>
                <Link to="#terms" className="hover:text-white transition-colors whitespace-nowrap">
                  Terms of Service
                </Link>
                <Link to="#cookies" className="hover:text-white transition-colors whitespace-nowrap">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
