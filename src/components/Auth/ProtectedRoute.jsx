import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../services/authService';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

export const ProtectedRoute = ({ children, requiredRole = null, fallbackPath = '/login' }) => {
  const { user, userProfile, loading, hasRole } = useAuth();
  const location = useLocation();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Add timeout for loading state to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.warn('Auth loading timeout reached');
        setLoadingTimeout(true);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timer);
  }, [loading]);

  // Show loading spinner while checking authentication
  if (loading && !loadingTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          <p className="text-xs text-gray-500 mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Handle loading timeout
  if (loadingTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldExclamationIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Issue</h2>
          <p className="text-gray-600 mb-4">
            We're having trouble loading your session. Please try refreshing the page.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <ShieldExclamationIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this area. 
            {requiredRole && ` Required role: ${requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)}`}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Your current role: {userProfile?.role || 'Not assigned'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export const RoleRoute = ({ children, allowedRoles = [], fallbackPath = '/login' }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  const userRole = userProfile?.role || USER_ROLES.STUDENT;
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <ShieldExclamationIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this area.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Your role: {userRole} | Required: {allowedRoles.join(' or ')}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Higher-order component for protecting components
export const withAuth = (Component, requiredRole = null) => {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Hook to check if user can access a specific feature
export const usePermissions = () => {
  const { userProfile, hasRole } = useAuth();
  
  return {
    canAccessAdmin: hasRole(USER_ROLES.ADMIN),
    canAccessTeacher: hasRole(USER_ROLES.TEACHER),
    canAccessStudent: hasRole(USER_ROLES.STUDENT),
    isAdmin: userProfile?.role === USER_ROLES.ADMIN,
    isTeacher: userProfile?.role === USER_ROLES.TEACHER,
    isStudent: userProfile?.role === USER_ROLES.STUDENT,
    userRole: userProfile?.role || USER_ROLES.STUDENT
  };
};