import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Edit, X, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentApi, seedDatabase } from '@/api/adminApi';

const defaultContent = {
  hero: {
    title: 'YOUR EVERYDAY SERVICES HUB',
    subtitle: 'At Oryno, we bring you all essential services at your fingertips - from travel and hotel bookings to package shipments, restaurants, event management, and more.',
    badge: 'Premium Service Platform'
  },
  about: {
    title: 'Your Trusted Partner for Everyday Convenience',
    description: 'Founded with a vision to transform how Africans access essential services, Oryno brings together travel, hospitality, logistics, and lifestyle services under one unified platform.'
  },
  footer: {
    cta_title: 'Ready to Get Started?',
    cta_description: 'Join thousands of users who trust Oryno for their everyday service needs across Cameroon',
    contact_email: 'info@oryno.com',
    contact_phone: '+237 6XX XXX XXX'
  }
};

export default function ContentManager() {
  const [content, setContent] = useState(defaultContent);
  const [editingSection, setEditingSection] = useState(null);
  const [tempContent, setTempContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await contentApi.getAll();
      if (data && data.length > 0) {
        const contentMap = {};
        data.forEach(item => {
          contentMap[item.section] = item.content;
        });
        setContent(prev => ({ ...prev, ...contentMap }));
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setTempContent(content[section]);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempContent({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await contentApi.updateSection(editingSection, tempContent);
      setContent(prev => ({ ...prev, [editingSection]: tempContent }));
      setEditingSection(null);
      setTempContent({});
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setTempContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('This will populate the database with initial data. Continue?')) return;
    
    setSeeding(true);
    try {
      const result = await seedDatabase();
      alert(result.message);
      loadContent();
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  const sections = [
    { key: 'hero', title: 'Hero Section', fields: ['title', 'subtitle', 'badge'] },
    { key: 'about', title: 'About Section', fields: ['title', 'description'] },
    { key: 'footer', title: 'Footer Section', fields: ['cta_title', 'cta_description', 'contact_email', 'contact_phone'] }
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Content Manager</h1>
          <p className="text-gray-600">Edit landing page content</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadContent} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button onClick={handleSeedDatabase} variant="outline" size="sm" disabled={seeding}>
            {seeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Initialize Data
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{section.title}</h2>
              {editingSection !== section.key ? (
                <Button
                  onClick={() => handleEdit(section.key)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button onClick={handleSave} size="sm" className="bg-[#082c59]" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field.replace(/_/g, ' ')}
                  </label>
                  {editingSection === section.key ? (
                    field.includes('description') || field.includes('subtitle') ? (
                      <Textarea
                        value={tempContent[field] || ''}
                        onChange={(e) => handleChange(field, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={tempContent[field] || ''}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    )
                  ) : (
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">
                      {content[section.key]?.[field] || 'Not set'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
