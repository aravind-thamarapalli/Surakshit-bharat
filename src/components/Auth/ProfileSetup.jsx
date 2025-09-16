import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../services/authService';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, updateProfile, getRedirectPath } = useAuth();
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.STUDENT);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    phone: '',
    role: USER_ROLES.STUDENT
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roleOptions = [
    {
      value: USER_ROLES.STUDENT,
      title: 'Student',
      description: 'I want to learn about disaster preparedness and safety',
      icon: AcademicCapIcon,
      features: ['Access learning modules', 'Track progress', 'Join community discussions', 'Earn certificates'],
      color: 'border-green-300 bg-green-50'
    },
    {
      value: USER_ROLES.TEACHER,
      title: 'Teacher/Educator',
      description: 'I want to teach and manage disaster preparedness education',
      icon: UserGroupIcon,
      features: ['Create and manage content', 'Monitor student progress', 'Conduct drills', 'Access teaching resources'],
      color: 'border-blue-300 bg-blue-50'
    },
    {
      value: USER_ROLES.ADMIN,
      title: 'Administrator',
      description: 'I need administrative access to manage the platform',
      icon: Cog6ToothIcon,
      features: ['User management', 'System configuration', 'Analytics dashboard', 'Content moderation'],
      color: 'border-purple-300 bg-purple-50'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({
      ...prev,
      role: role
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const profileData = {
        ...formData,
        role: selectedRole,
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await updateProfile(profileData);
      if (error) throw error;

      // Redirect to appropriate dashboard
      const redirectPath = getRedirectPath(selectedRole);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us customize your Surakshi Bharat experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization/School
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-gray-600 mb-6">Select the role that best describes how you'll use the platform:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedRole === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleRoleSelect(option.value)}
                    className={`
                      relative p-6 border-2 rounded-lg text-left transition-all duration-200
                      ${isSelected 
                        ? `${option.color} border-current shadow-md` 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      </div>
                    )}
                    
                    <div className="flex items-center mb-3">
                      <Icon className={`h-8 w-8 mr-3 ${isSelected ? 'text-current' : 'text-gray-600'}`} />
                      <h3 className={`text-lg font-semibold ${isSelected ? 'text-current' : 'text-gray-900'}`}>
                        {option.title}
                      </h3>
                    </div>
                    
                    <p className={`text-sm mb-4 ${isSelected ? 'text-current opacity-80' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                    
                    <ul className={`text-xs space-y-1 ${isSelected ? 'text-current opacity-70' : 'text-gray-500'}`}>
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !formData.firstName || !formData.lastName}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Setting up your account...
                </div>
              ) : (
                'Complete Setup'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Note: Your role selection will be reviewed by administrators. 
            You may be contacted for verification if you select Teacher or Administrator roles.
          </p>
        </div>
      </div>
    </div>
  );
};