import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Eye, Save, X, Loader2, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPosts = [
  { id: 1, title: 'How Oryno is Transforming Travel', status: 'published', author: 'Jean-Pierre', date: '2025-01-15' },
  { id: 2, title: 'Top 10 Hotels in Douala', status: 'draft', author: 'Marie', date: '2025-01-10' },
  { id: 3, title: 'Mobile Money Payments Now Available', status: 'published', author: 'Paul', date: '2025-01-05' }
];

export default function BlogManager() {
  const [posts, setPosts] = useState(initialPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: '', status: 'draft' });
  const [saving, setSaving] = useState(false);

  const handleNew = () => {
    setEditingPost(null);
    setFormData({ title: '', content: '', category: '', status: 'draft' });
    setShowEditor(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: '', category: '', status: post.status });
    setShowEditor(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...formData } : p));
    } else {
      setPosts([...posts, {
        id: Date.now(),
        ...formData,
        author: 'Admin',
        date: new Date().toISOString().split('T')[0]
      }]);
    }
    
    setSaving(false);
    setShowEditor(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Manager</h1>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Button onClick={handleNew} className="bg-[#082c59]">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {/* Post Editor Modal */}
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
                <h2 className="text-xl font-bold">{editingPost ? 'Edit Post' : 'New Post'}</h2>
                <button onClick={() => setShowEditor(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select category</option>
                    <option value="Company News">Company News</option>
                    <option value="Travel Tips">Travel Tips</option>
                    <option value="Product Updates">Product Updates</option>
                    <option value="Guides">Guides</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    placeholder="Write your blog post content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowEditor(false)}>Cancel</Button>
                  <Button onClick={handleSave} className="bg-[#082c59]" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {editingPost ? 'Update' : 'Publish'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 hidden sm:table-cell">Author</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 hidden md:table-cell">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{post.title}</span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-gray-600 text-sm">{post.author}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-gray-600 text-sm">{post.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
