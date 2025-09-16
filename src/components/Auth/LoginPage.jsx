import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { OAUTH_PROVIDERS } from '../../services/authService';
import { 
  ShieldCheckIcon,
  AcademicCapIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export const LoginPage = () => {
  const { signInWithOAuth, loading, error } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  const handleOAuthSignIn = async (provider) => {
    setSigningIn(true);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      console.error('OAuth sign in error:', err);
    } finally {
      setSigningIn(false);
    }
  };

  const oauthButtons = [
    {
      provider: OAUTH_PROVIDERS.GOOGLE,
      name: 'Google',
      icon: '🔐',
      bgColor: 'bg-red-600 hover:bg-red-700',
      description: 'Sign in with your Google account'
    },
    {
      provider: OAUTH_PROVIDERS.GITHUB,
      name: 'GitHub',
      icon: '⚡',
      bgColor: 'bg-gray-800 hover:bg-gray-900',
      description: 'Sign in with your GitHub account'
    },
    {
      provider: OAUTH_PROVIDERS.MICROSOFT,
      name: 'Microsoft',
      icon: '🏢',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      description: 'Sign in with your Microsoft account'
    }
  ];

  const roleCards = [
    {
      role: 'student',
      title: 'Student Portal',
      description: 'Access learning modules, track progress, and join the community',
      icon: AcademicCapIcon,
      features: ['Interactive Learning', 'Progress Tracking', 'Community Access', 'Certificates'],
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      role: 'teacher',
      title: 'Teacher Portal',
      description: 'Manage students, create content, and monitor learning outcomes',
      icon: UserGroupIcon,
      features: ['Student Management', 'Content Creation', 'Analytics Dashboard', 'Drill Coordination'],
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      role: 'admin',
      title: 'Admin Portal',
      description: 'System administration, user management, and platform oversight',
      icon: Cog6ToothIcon,
      features: ['User Management', 'System Analytics', 'Content Moderation', 'Platform Settings'],
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShieldCheckIcon className="h-16 w-16 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Surakshi Bharat
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Disaster Preparedness Learning Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-6xl">
        {/* Role Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4">
          {roleCards.map((roleCard) => {
            const Icon = roleCard.icon;
            return (
              <div key={roleCard.role} className={`border-2 rounded-lg p-6 ${roleCard.color}`}>
                <div className="flex items-center mb-4">
                  <Icon className="h-8 w-8 mr-3" />
                  <h3 className="text-lg font-semibold">{roleCard.title}</h3>
                </div>
                <p className="text-sm mb-4 opacity-80">{roleCard.description}</p>
                <ul className="text-xs space-y-1">
                  {roleCard.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Authentication Section */}
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 mx-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sign in to access your portal
            </h3>
            <p className="text-sm text-gray-600">
              Choose your preferred authentication method
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            {oauthButtons.map((button) => (
              <button
                key={button.provider}
                onClick={() => handleOAuthSignIn(button.provider)}
                disabled={signingIn || loading}
                className={`
                  w-full flex items-center justify-center px-4 py-3 border border-transparent 
                  rounded-md shadow-sm text-white font-medium transition-colors duration-200
                  ${button.bgColor}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="text-xl mr-3">{button.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">Continue with {button.name}</div>
                  <div className="text-xs opacity-90">{button.description}</div>
                </div>
              </button>
            ))}
          </div>

          {signingIn && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Signing you in...
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy.
              Your role will be assigned by an administrator after registration.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 mx-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Platform Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl mb-2">📚</div>
              <h5 className="font-medium text-gray-900">Interactive Learning</h5>
              <p className="text-sm text-gray-600">Comprehensive disaster preparedness modules</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🚨</div>
              <h5 className="font-medium text-gray-900">Emergency Drills</h5>
              <p className="text-sm text-gray-600">Realistic simulation and training exercises</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">👥</div>
              <h5 className="font-medium text-gray-900">Community Hub</h5>
              <p className="text-sm text-gray-600">Connect and collaborate with others</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">📊</div>
              <h5 className="font-medium text-gray-900">Progress Tracking</h5>
              <p className="text-sm text-gray-600">Monitor learning outcomes and achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};