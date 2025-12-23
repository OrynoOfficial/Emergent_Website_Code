import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, Mail, Trash2, Check, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialApplications = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', position: 'Senior Software Engineer', date: '2025-01-18', status: 'pending' },
  { id: 2, name: 'Marie Claire', email: 'marie@example.com', position: 'Product Manager', date: '2025-01-17', status: 'reviewing' },
  { id: 3, name: 'Paul Martin', email: 'paul@example.com', position: 'UX Designer', date: '2025-01-16', status: 'accepted' },
  { id: 4, name: 'Sophie Ngo', email: 'sophie@example.com', position: 'Marketing Specialist', date: '2025-01-15', status: 'rejected' },
  { id: 5, name: 'Emmanuel Kamga', email: 'emmanuel@example.com', position: 'Customer Success Manager', date: '2025-01-14', status: 'pending' }
];

export default function ApplicationsManager() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredApps = applications.filter(app => 
    filter === 'all' ? true : app.status === filter
  );

  const updateStatus = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const deleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewing: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600">Manage candidate applications</p>
        </div>
        
        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'pending', 'reviewing', 'accepted', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                filter === status 
                  ? 'bg-[#082c59] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: applications.length, color: 'bg-gray-100' },
          { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, color: 'bg-yellow-100' },
          { label: 'Reviewing', value: applications.filter(a => a.status === 'reviewing').length, color: 'bg-blue-100' },
          { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, color: 'bg-green-100' }
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Candidate</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 hidden md:table-cell">Position</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 hidden sm:table-cell">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-gray-600 text-sm">{app.position}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-gray-600 text-sm">{app.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${statusColors[app.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Email">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download CV">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => deleteApplication(app.id)} 
                        className="p-2 hover:bg-red-50 rounded-lg" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
