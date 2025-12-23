import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/api/adminAuth';
import { Loader2, ShieldAlert, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WEBAPP_URLS } from '@/api/publicApi';

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading, error, redirectToWebappLogin } = useAdminAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#082c59] mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show login required page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#082c59]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-[#082c59]" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Access Required
          </h1>
          
          <p className="text-gray-600 mb-6">
            You need to be logged in as an administrator to access this page.
            Please sign in through the Oryno webapp.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={redirectToWebappLogin}
              className="w-full bg-[#082c59] hover:bg-[#0a3d7a] text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in via Oryno Webapp
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Don't have admin access?{' '}
            <a href={`${WEBAPP_URLS.base}/contact`} className="text-[#082c59] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return children;
}
