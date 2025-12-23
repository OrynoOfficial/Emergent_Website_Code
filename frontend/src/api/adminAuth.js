import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './adminApi';
import { WEBAPP_URLS } from './publicApi';

// Admin Auth Context
const AdminAuthContext = createContext(null);

// Storage keys
const TOKEN_KEY = 'oryno_admin_token';
const USER_KEY = 'oryno_admin_user';

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid
          const response = await api.post('/api/admin/verify', {}, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          
          if (response.data.valid) {
            setToken(storedToken);
            setUser(response.data.user);
          } else {
            // Token invalid, clear storage
            clearAuth();
          }
        } catch (err) {
          console.error('Token verification failed:', err);
          clearAuth();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Check for login callback from webapp
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const callbackToken = params.get('token');
    const userId = params.get('user_id');
    const userEmail = params.get('user_email');
    const userName = params.get('user_name');
    const webappToken = params.get('webapp_token');

    if (callbackToken && userId && userEmail) {
      // Coming back from webapp with credentials
      handleWebappCallback(userId, userEmail, userName || 'Admin', webappToken || callbackToken);
      
      // Clean URL
      const cleanUrl = location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [location]);

  const handleWebappCallback = async (userId, userEmail, userName, webappToken) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/admin/login', {
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
        webapp_token: webappToken
      });

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        
        setToken(newToken);
        setUser(newUser);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.response?.data?.detail || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const logout = async () => {
    if (token) {
      try {
        await api.post('/api/admin/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    clearAuth();
    navigate('/');
  };

  const redirectToWebappLogin = useCallback(() => {
    // Get current URL for callback
    const currentUrl = window.location.origin + '/admin';
    const loginUrl = `${WEBAPP_URLS.login}?redirect_to=${encodeURIComponent(currentUrl)}&admin_access=true`;
    window.location.href = loginUrl;
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token && !!user,
    logout,
    redirectToWebappLogin,
    clearError: () => setError(null)
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export default AdminAuthContext;
