import React, { useState, useEffect } from 'react';
import { fetchStats, fetchServices } from '@/api/publicApi';
import { 
  Users, Hotel, MapPin, Calendar, TrendingUp, 
  FileText, Briefcase, Eye, ArrowUp, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, servicesData] = await Promise.all([
          fetchStats(),
          fetchServices()
        ]);
        setStats(statsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const dashboardStats = [
    { label: 'Total Hotels', value: stats?.total_hotels || 12, icon: Hotel, change: '+12%', color: 'bg-blue-500' },
    { label: 'Travel Routes', value: stats?.total_routes || 72, icon: MapPin, change: '+8%', color: 'bg-green-500' },
    { label: 'Active Events', value: stats?.total_events || 12, icon: Calendar, change: '+15%', color: 'bg-purple-500' },
    { label: 'Happy Customers', value: stats?.happy_customers || '10K', icon: Users, change: '+24%', color: 'bg-orange-500' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#082c59] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Oryno Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New blog post published', time: '2 hours ago', icon: FileText },
              { action: 'Job application received', time: '4 hours ago', icon: Briefcase },
              { action: 'Homepage content updated', time: '1 day ago', icon: Eye },
              { action: 'New testimonial added', time: '2 days ago', icon: Users }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Services Overview</h2>
          <div className="space-y-3">
            {services.slice(0, 5).map((service) => (
              <div key={service.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#082c59]/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📦</span>
                  </div>
                  <span className="text-sm text-gray-900">{service.name}</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
