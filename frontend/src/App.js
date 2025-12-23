import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/App.css';

// Pages
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import Faqs from '@/pages/Faqs';
import AboutUs from '@/pages/AboutUs';
import Careers from '@/pages/Careers';
import CareersApplication from '@/pages/CareersApplication';
import Blog from '@/pages/Blog';
import Legal from '@/pages/Legal';
import TestimonialsPage from '@/pages/TestimonialsPage';
import Departments from '@/pages/Departments';

// Admin Pages
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ContentManager from '@/pages/admin/ContentManager';
import BlogManager from '@/pages/admin/BlogManager';
import TeamManager from '@/pages/admin/TeamManager';
import ApplicationsManager from '@/pages/admin/ApplicationsManager';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminLogin from '@/pages/admin/AdminLogin';

// Admin Auth
import { AdminAuthProvider } from '@/api/adminAuth';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Wrapper component for admin routes with auth
function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    </AdminAuthProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply/:jobId" element={<CareersApplication />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/departments" element={<Departments />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />}>
              <Route index element={<AdminDashboard />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="applications" element={<ApplicationsManager />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
