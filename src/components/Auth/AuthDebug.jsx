import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const AuthDebug = () => {
  const { user, userProfile, loading, error, isAuthenticated } = useAuth();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔍 Auth Debug Info</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? '✅' : '❌'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>User ID: {user?.id || 'None'}</div>
        <div>User Email: {user?.email || 'None'}</div>
        <div>Profile Role: {userProfile?.role || 'None'}</div>
        <div>Error: {error || 'None'}</div>
        <div>Timestamp: {new Date().toLocaleTimeString()}</div>
      </div>
      <button
        onClick={() => {
          console.log('Auth State:', { user, userProfile, loading, error, isAuthenticated });
        }}
        className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-xs"
      >
        Log to Console
      </button>
    </div>
  );
};