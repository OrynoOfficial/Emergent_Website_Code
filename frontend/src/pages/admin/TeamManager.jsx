import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X, Loader2, RefreshCw, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamApi } from '@/api/adminApi';

const colorOptions = [
  { value: 'from-blue-500 to-blue-600', label: 'Blue' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple' },
  { value: 'from-green-500 to-green-600', label: 'Green' },
  { value: 'from-pink-500 to-pink-600', label: 'Pink' },
  { value: 'from-orange-500 to-orange-600', label: 'Orange' },
  { value: 'from-red-500 to-red-600', label: 'Red' },
  { value: 'from-yellow-500 to-yellow-600', label: 'Yellow' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
];

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    color: 'from-blue-500 to-blue-600',
    linkedin: '',
    twitter: '',
    email: '',
    order: 0,
    show_on_home: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await teamApi.getAll();
      setMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      color: 'from-blue-500 to-blue-600',
      linkedin: '',
      twitter: '',
      email: '',
      order: members.length + 1,
      show_on_home: true
    });
    setShowEditor(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      image: member.image || '',
      color: member.color || 'from-blue-500 to-blue-600',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      email: member.email || '',
      order: member.order || 0,
      show_on_home: member.show_on_home !== false
    });
    setShowEditor(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await teamApi.delete(id);
      setMembers(members.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete team member');
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.role.trim()) {
      alert('Name and role are required');
      return;
    }
    
    setSaving(true);
    try {
      if (editingMember) {
        const updated = await teamApi.update(editingMember.id, formData);
        setMembers(members.map(m => m.id === editingMember.id ? updated : m));
      } else {
        const newMember = await teamApi.create(formData);
        setMembers([...members, newMember]);
      }
      setShowEditor(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#082c59]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Manager</h1>
          <p className="text-gray-600">Manage team members displayed on the website</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadMembers} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button onClick={handleNew} className="bg-[#082c59]">
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </div>
      </div>

      {/* Member Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
                <button onClick={() => setShowEditor(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., CEO, CTO, Manager"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={2}
                    placeholder="Short biography..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <Input
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                    <Input
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.show_on_home}
                        onChange={(e) => setFormData({ ...formData, show_on_home: e.target.checked })}
                        className="w-4 h-4 text-[#082c59] rounded focus:ring-[#082c59]"
                      />
                      <span className="text-sm text-gray-700">Show on Homepage</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowEditor(false)}>Cancel</Button>
                  <Button onClick={handleSave} className="bg-[#082c59]" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {editingMember ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members Grid */}
      {members.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No team members yet</p>
          <Button onClick={handleNew} className="bg-[#082c59]">
            <Plus className="w-4 h-4 mr-2" /> Add First Member
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color || 'from-blue-500 to-blue-600'} flex items-center justify-center flex-shrink-0`}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-bold">
                      {member.initials || member.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                  <p className="text-sm text-[#082c59]">{member.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${member.show_on_home ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {member.show_on_home ? 'Visible' : 'Hidden'}
                    </span>
                    <span className="text-xs text-gray-500">Order: {member.order}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                <button onClick={() => handleEdit(member)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
