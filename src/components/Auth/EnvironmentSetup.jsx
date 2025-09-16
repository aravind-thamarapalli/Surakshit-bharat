import React from 'react';
import { ExclamationTriangleIcon, Cog6ToothIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const EnvironmentSetup = () => {
  const isProduction = import.meta.env.PROD;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const hasSupabaseConfig = 
    supabaseUrl && 
    supabaseKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co' && 
    supabaseKey !== 'your-supabase-anon-key-here';

  // Don't show in production or if properly configured
  if (isProduction || hasSupabaseConfig) {
    return null;
  }

  // Show configuration needed message
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            Development Mode: Supabase configuration needed
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cog6ToothIcon className="h-4 w-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              Update .env with your Supabase credentials
            </span>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-300 transition-colors"
          >
            Get Supabase Keys
          </a>
        </div>
      </div>
    </div>
  );
};