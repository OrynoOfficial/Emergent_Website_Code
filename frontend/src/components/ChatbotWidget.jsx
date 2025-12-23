import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const quickReplies = [
  'How do I book a hotel?',
  'Bus ticket prices',
  'Contact support',
  'Refund policy'
];

const botResponses = {
  'default': "Hello! I'm Oryno Assistant. How can I help you today? You can ask about our services, bookings, or any other questions.",
  'hotel': "To book a hotel, simply browse our Hotels section, select your preferred dates and location, choose a hotel, and complete the booking. You'll receive instant confirmation via email and SMS.",
  'bus': "Bus tickets can be booked through our Travel section. Select your origin, destination, and travel date. Prices typically range from 3,000 to 15,000 XAF depending on the route and bus class.",
  'price': "Our prices vary by service. Hotels start from 25,000 XAF/night, bus tickets from 3,000 XAF, and car rentals from 35,000 XAF/day. Visit each service section for detailed pricing.",
  'contact': "You can reach our support team 24/7 via:\n• Email: info@oryno.com\n• Phone: +237 6XX XXX XXX\n• Live chat: Right here!",
  'refund': "Our refund policy varies by service. Generally, cancellations made 24+ hours before the service date are eligible for full refunds. Please check specific terms at booking time.",
  'services': "Oryno offers 9 services: Hotels, Travel (Bus), Car Rental, Restaurants, Events, Cinema, Laundry, Banquet Halls, and Travel Packages. How can I help you with any of these?"
};

function getResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('hotel') || lower.includes('room') || lower.includes('accommodation')) return botResponses.hotel;
  if (lower.includes('bus') || lower.includes('travel') || lower.includes('ticket')) return botResponses.bus;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) return botResponses.price;
  if (lower.includes('contact') || lower.includes('support') || lower.includes('help')) return botResponses.contact;
  if (lower.includes('refund') || lower.includes('cancel') || lower.includes('policy')) return botResponses.refund;
  if (lower.includes('service') || lower.includes('offer') || lower.includes('what')) return botResponses.services;
  return "I understand you're asking about \"" + message + "\". Let me help you with that. For specific inquiries, please contact our support team at info@oryno.com or use our portal for direct assistance.";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: botResponses.default }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { type: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = { type: 'bot', text: getResponse(text) };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Positioned to avoid platform evaluation badge */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors ${
          isOpen ? 'bg-gray-700' : 'bg-[#082c59]'
        } text-white hover:scale-110 transform`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="chatbot-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#082c59] text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Oryno Assistant</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    msg.type === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === 'user' ? 'bg-[#082c59]' : 'bg-gray-200'
                    }`}>
                      {msg.type === 'user' ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-gray-600" />
                      }
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      msg.type === 'user' 
                        ? 'bg-[#082c59] text-white rounded-br-none' 
                        : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(reply)}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-[#082c59] hover:bg-[#0a3d7a] text-white px-3"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
