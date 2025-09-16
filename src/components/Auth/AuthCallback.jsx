import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../services/authService';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userProfile, getRedirectPath } = useAuth();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error in URL params
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (error) {
          setStatus('error');
          console.error('Auth error:', error, errorDescription);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Wait for user to be loaded
        if (user && userProfile) {
          setStatus('success');
          
          // Redirect based on user role
          const redirectPath = getRedirectPath(userProfile.role);
          setTimeout(() => navigate(redirectPath), 2000);
        } else if (user && !userProfile) {
          // User exists but no profile - might be first time login
          setStatus('profile_setup');
          setTimeout(() => navigate('/profile-setup'), 2000);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [user, userProfile, navigate, searchParams, getRedirectPath]);

  const renderStatus = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Signing you in...</h2>
            <p className="text-gray-600">Please wait while we set up your account.</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome to Surakshi Bharat!</h2>
            <p className="text-gray-600 mb-2">
              Successfully signed in as {userProfile?.role || 'user'}
            </p>
            <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
          </div>
        );
      
      case 'profile_setup':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome! Let's set up your profile</h2>
            <p className="text-gray-600 mb-2">
              First time signing in? We'll help you get started.
            </p>
            <p className="text-sm text-gray-500">Redirecting to profile setup...</p>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-2">
              There was an error signing you in. Please try again.
            </p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        {renderStatus()}
      </div>
    </div>
  );
};