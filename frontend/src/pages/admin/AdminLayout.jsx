import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Briefcase, Settings, 
  LogOut, Menu, X, ChevronDown, Bell, Package, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/api/adminAuth';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Content', icon: FileText, path: '/admin/content' },
  { label: 'Team', icon: Users, path: '/admin/team' },
  { label: 'Blog Posts', icon: FileText, path: '/admin/blog' },
  { label: 'Job Applications', icon: Briefcase, path: '/admin/applications' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAdminAuth();

  const getUserInitials = () => {
    if (!user?.name) return 'A';
    return user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#082c59] z-50 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#082c59]" />
            </div>
            <div>
              <h1 className="text-white font-bold">Oryno Admin</h1>
              <p className="text-white/60 text-xs">Content Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-white text-[#082c59]' 
                      : 'text-white/80 hover:bg-white/10'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 transition-colors"
          >
            <Package className="w-5 h-5" />
            Back to Website
          </Link>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#082c59] to-[#0a3d7a] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{getUserInitials()}</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="text-sm font-medium text-gray-700 block">{user?.name || 'Admin'}</span>
                    <span className="text-xs text-gray-500">{user?.role || 'Administrator'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/admin/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
