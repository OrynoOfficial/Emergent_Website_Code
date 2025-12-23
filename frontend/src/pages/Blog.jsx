import React, { useState, useEffect } from 'react';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Calendar, User, ArrowRight, Tag, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const blogPosts = [
  {
    id: 1,
    title: 'How Oryno is Transforming Travel in Cameroon',
    excerpt: 'Discover how our platform is making bus travel easier and more accessible for thousands of Cameroonians.',
    category: 'Company News',
    author: 'Jean-Pierre Kamga',
    date: '2025-01-15',
    image: null,
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Top 10 Hotels in Douala for Business Travelers',
    excerpt: 'Our curated list of the best hotels for business travelers visiting Cameroon\'s economic capital.',
    category: 'Travel Tips',
    author: 'Marie Nguemo',
    date: '2025-01-10',
    image: null,
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Introducing Mobile Money Payments on Oryno',
    excerpt: 'Pay for all your bookings using MTN Mobile Money and Orange Money - fast, secure, and convenient.',
    category: 'Product Updates',
    author: 'Paul Fotso',
    date: '2025-01-05',
    image: null,
    readTime: '3 min read'
  },
  {
    id: 4,
    title: 'Planning the Perfect Kribi Beach Getaway',
    excerpt: 'Everything you need to know about planning an unforgettable trip to Cameroon\'s coastal paradise.',
    category: 'Travel Tips',
    author: 'Aminata Diallo',
    date: '2024-12-28',
    image: null,
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'Oryno Expands to 3 New Cities',
    excerpt: 'We\'re excited to announce our expansion to Garoua, Maroua, and Ebolowa, bringing our services to more Cameroonians.',
    category: 'Company News',
    author: 'Jean-Pierre Kamga',
    date: '2024-12-20',
    image: null,
    readTime: '4 min read'
  },
  {
    id: 6,
    title: 'A Guide to Event Venues in Yaoundé',
    excerpt: 'Find the perfect venue for your next event with our comprehensive guide to Yaoundé\'s best event spaces.',
    category: 'Guides',
    author: 'Marie Nguemo',
    date: '2024-12-15',
    image: null,
    readTime: '7 min read'
  }
];

const categories = ['All', 'Company News', 'Travel Tips', 'Product Updates', 'Guides'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#082c59] to-[#0a3d7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Oryno Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            News, tips, and insights from the Oryno team
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#082c59] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-[#082c59] to-[#0a3d7a] flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#082c59]/10 text-[#082c59] text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#082c59] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
