import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Package, MapPin, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', bookings: 1200, revenue: 45000 },
  { month: 'Feb', bookings: 1400, revenue: 52000 },
  { month: 'Mar', bookings: 1800, revenue: 68000 },
  { month: 'Apr', bookings: 2200, revenue: 82000 },
  { month: 'May', bookings: 2600, revenue: 95000 },
  { month: 'Jun', bookings: 3100, revenue: 115000 },
  { month: 'Jul', bookings: 3500, revenue: 130000 },
  { month: 'Aug', bookings: 3800, revenue: 142000 },
  { month: 'Sep', bookings: 3400, revenue: 128000 },
  { month: 'Oct', bookings: 3000, revenue: 112000 },
  { month: 'Nov', bookings: 2800, revenue: 105000 },
  { month: 'Dec', bookings: 3200, revenue: 120000 }
];

const serviceDistribution = [
  { name: 'Hotels', value: 35, color: '#082c59' },
  { name: 'Travel', value: 25, color: '#3b82f6' },
  { name: 'Car Rental', value: 15, color: '#10b981' },
  { name: 'Restaurants', value: 12, color: '#f59e0b' },
  { name: 'Events', value: 8, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#6b7280' }
];

const routeData = [
  { route: 'DLA-YDE', trips: 450 },
  { route: 'YDE-DLA', trips: 420 },
  { route: 'DLA-BUE', trips: 280 },
  { route: 'YDE-BAF', trips: 250 },
  { route: 'DLA-KRI', trips: 180 }
];

export default function ShipmentAnalyticsChart({ showAll = false }) {
  return (
    <div className="space-y-6">
      {/* Main Bookings Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Booking Trends</h3>
            <p className="text-gray-500 text-sm">Monthly booking statistics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm font-semibold">+24%</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#082c59" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#082c59" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
                }}
              />
              <Area 
                type="monotone" 
                dataKey="bookings" 
                stroke="#082c59" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBookings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showAll && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Service Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-[#082c59]" />
              <h3 className="font-bold text-gray-900">Service Distribution</h3>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-[#082c59]" />
              <h3 className="font-bold text-gray-900">Popular Routes</h3>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="route" type="category" stroke="#9ca3af" fontSize={11} width={60} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Bar dataKey="trips" fill="#082c59" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'This Month', value: '3,847', change: '+12%' },
          { icon: TrendingUp, label: 'Growth Rate', value: '24%', change: '+5%' },
          { icon: Package, label: 'Total Services', value: '9', change: 'Active' },
          { icon: MapPin, label: 'Cities', value: '8', change: 'Covered' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#082c59]/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#082c59]" />
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{stat.label}</span>
              <span className="text-green-600 text-xs font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
