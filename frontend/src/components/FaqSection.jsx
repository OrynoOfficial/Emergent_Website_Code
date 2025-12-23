import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services does Oryno offer?',
    answer: 'Oryno offers a comprehensive range of services including hotel bookings, bus travel tickets, car rentals, restaurant reservations, event ticketing, cinema bookings, laundry services, banquet hall reservations, and travel packages.'
  },
  {
    question: 'How do I make a booking?',
    answer: 'Simply create an account on our platform, browse the service you need, select your preferences, and complete the booking with your preferred payment method. You\'ll receive instant confirmation via email and SMS.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept various payment methods including MTN Mobile Money, Orange Money, credit/debit cards (Visa, Mastercard), and cash payments at selected locations.'
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, you can cancel or modify bookings through your account dashboard. Cancellation policies vary by service type - please check the specific terms at the time of booking.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use industry-standard encryption and security protocols to protect your payment information. All transactions are processed through secure payment gateways.'
  }
];

export default function FaqSection() {
  return (
    <div id="faqs" className="bg-gray-50 py-16 sm:py-24 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#082c59]/10 rounded-full px-4 py-1.5 text-xs font-semibold text-[#082c59] mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl px-6 shadow-sm border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#082c59] py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link to={createPageUrl('Faqs')}>
            <Button variant="outline" className="border-[#082c59] text-[#082c59] hover:bg-[#082c59] hover:text-white">
              View All FAQs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
