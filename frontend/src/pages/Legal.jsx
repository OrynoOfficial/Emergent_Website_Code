import React from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Legal Information</h1>
          <p className="text-white/80 text-lg">Terms, Privacy, and Policies</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b">
            <a href="#terms" className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-[#082c59] hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-[#082c59] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#cookies" className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-[#082c59] hover:text-white transition-colors">Cookie Policy</a>
            <a href="#refund" className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-[#082c59] hover:text-white transition-colors">Refund Policy</a>
          </div>

          {/* Terms of Service */}
          <section id="terms" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">Last updated: January 1, 2025</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-600 mb-4">By accessing and using Oryno&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Use of Services</h3>
              <p className="text-gray-600 mb-4">You agree to use Oryno&apos;s services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Bookings and Payments</h3>
              <p className="text-gray-600 mb-4">All bookings made through Oryno are subject to availability and confirmation. Prices are displayed in Central African CFA Franc (XAF) and include applicable taxes unless otherwise stated.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Limitation of Liability</h3>
              <p className="text-gray-600 mb-4">Oryno acts as an intermediary between users and service providers. We are not liable for the quality, safety, or legality of the services provided by third parties.</p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">Last updated: January 1, 2025</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Information We Collect</h3>
              <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support. This may include your name, email address, phone number, and payment information.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How We Use Your Information</h3>
              <p className="text-gray-600 mb-4">We use your information to provide, maintain, and improve our services, process transactions, send you service-related communications, and protect against fraud.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Data Security</h3>
              <p className="text-gray-600 mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section id="cookies" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">Last updated: January 1, 2025</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What Are Cookies</h3>
              <p className="text-gray-600 mb-4">Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Types of Cookies We Use</h3>
              <p className="text-gray-600 mb-4">We use essential cookies for site functionality, analytics cookies to understand usage patterns, and marketing cookies to personalize content and ads.</p>
            </div>
          </section>

          {/* Refund Policy */}
          <section id="refund" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">Last updated: January 1, 2025</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cancellation and Refunds</h3>
              <p className="text-gray-600 mb-4">Cancellations made 24 hours or more before the scheduled service are eligible for a full refund. Cancellations made within 24 hours may be subject to cancellation fees depending on the service type.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Refund Processing</h3>
              <p className="text-gray-600 mb-4">Refunds are typically processed within 3-5 business days for mobile money payments and 5-10 business days for card payments. The exact timing depends on your payment provider.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Disputes</h3>
              <p className="text-gray-600 mb-4">If you have any issues with a service, please contact our support team within 48 hours. We will investigate and provide appropriate resolution.</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
