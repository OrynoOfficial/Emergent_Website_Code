import axios from 'axios';

// API Base URL from environment
const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// TEAM MEMBERS API
// ============================================

export const teamApi = {
  getAll: async () => {
    const response = await api.get('/api/team');
    return response.data;
  },
  
  getHomeMembers: async () => {
    const response = await api.get('/api/team/home');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/team/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/team', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/api/team/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/team/${id}`);
    return response.data;
  }
};

// ============================================
// BLOG POSTS API
// ============================================

export const blogApi = {
  getAll: async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get('/api/blog', { params });
    return response.data;
  },
  
  getPublished: async () => {
    const response = await api.get('/api/blog/published');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/blog/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/blog', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/api/blog/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/blog/${id}`);
    return response.data;
  }
};

// ============================================
// SITE CONTENT API
// ============================================

export const contentApi = {
  getAll: async () => {
    const response = await api.get('/api/content');
    return response.data;
  },
  
  getSection: async (section) => {
    const response = await api.get(`/api/content/${section}`);
    return response.data;
  },
  
  updateSection: async (section, content) => {
    const response = await api.put(`/api/content/${section}`, { content });
    return response.data;
  }
};

// ============================================
// MEDIA ASSETS API
// ============================================

export const mediaApi = {
  getAll: async (category = null) => {
    const params = category ? { category } : {};
    const response = await api.get('/api/media', { params });
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/media', data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/media/${id}`);
    return response.data;
  }
};

// ============================================
// TESTIMONIALS API
// ============================================

export const testimonialsApi = {
  getAll: async () => {
    const response = await api.get('/api/testimonials');
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/testimonials', data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/testimonials/${id}`);
    return response.data;
  }
};

// ============================================
// SEED DATABASE
// ============================================

export const seedDatabase = async () => {
  const response = await api.post('/api/seed');
  return response.data;
};

export default api;
