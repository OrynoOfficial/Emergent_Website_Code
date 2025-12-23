import React from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { HelpCircle, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    title: 'General Questions',
    faqs: [
      { q: 'What is Oryno?', a: 'Oryno is an all-in-one service platform that connects you with essential services including hotel bookings, bus travel, car rentals, restaurant reservations, event ticketing, and more across Cameroon.' },
      { q: 'How do I create an account?', a: 'Click the "Get Started" button on our website or app, enter your email and phone number, create a password, and verify your account via SMS or email.' },
      { q: 'Is Oryno available in my city?', a: 'Oryno currently operates in major cities including Douala, Yaoundé, Bafoussam, Buea, Kribi, Limbe, Bamenda, and Garoua. We\'re constantly expanding!' },
      { q: 'What languages does Oryno support?', a: 'Our platform is available in both English and French to serve all users across Cameroon.' }
    ]
  },
  {
    title: 'Bookings & Reservations',
    faqs: [
      { q: 'How do I make a booking?', a: 'Select the service you need, choose your preferences (dates, location, etc.), select from available options, and complete payment. You\'ll receive instant confirmation.' },
      { q: 'Can I book for someone else?', a: 'Yes! During the booking process, you can enter the traveler or guest details if they\'re different from your account information.' },
      { q: 'How do I view my booking history?', a: 'Log into your account and navigate to "My Bookings" in your dashboard to see all past and upcoming reservations.' },
      { q: 'Can I modify my booking?', a: 'Yes, most bookings can be modified up to 24 hours before the scheduled service. Go to "My Bookings" and select "Modify" on the booking you want to change.' }
    ]
  },
  {
    title: 'Payments',
    faqs: [
      { q: 'What payment methods are accepted?', a: 'We accept MTN Mobile Money, Orange Money, Visa/Mastercard credit and debit cards, and cash payments at select partner locations.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard SSL encryption and work with certified payment processors to ensure your financial data is always protected.' },
      { q: 'Can I get a receipt for my payment?', a: 'Yes, receipts are automatically sent to your registered email after each successful transaction. You can also download receipts from your booking history.' },
      { q: 'What currency does Oryno use?', a: 'All transactions on Oryno are processed in Central African CFA Franc (XAF).' }
    ]
  },
  {
    title: 'Cancellations & Refunds',
    faqs: [
      { q: 'What is the cancellation policy?', a: 'Cancellation policies vary by service type. Generally, cancellations made 24+ hours before service time are eligible for full refunds. Check specific terms during booking.' },
      { q: 'How do I cancel a booking?', a: 'Go to "My Bookings," find the booking you want to cancel, and click "Cancel Booking." Follow the prompts to complete the cancellation.' },
      { q: 'How long do refunds take?', a: 'Refunds are typically processed within 3-5 business days for mobile money and 5-10 business days for card payments.' },
      { q: 'What if my service was unsatisfactory?', a: 'Contact our support team within 48 hours of your service. We investigate all complaints and will provide appropriate compensation if the issue is verified.' }
    ]
  }
];

export default function Faqs() {
  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Find answers to common questions about Oryno services
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${catIndex}-${faqIndex}`}
                    className="bg-white rounded-xl px-6 shadow-sm border-none"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#082c59] py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">Our support team is here to help</p>
          <a href="mailto:info@oryno.com" className="text-[#082c59] font-semibold hover:underline">
            Contact Support →
          </a>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
