import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: user?.role || 'student',
    academicCredits: user?.academic_credits || 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      role: user?.role || 'student',
      academicCredits: user?.academic_credits || 0
    });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'admin': return 'Full system access and user management';
      case 'teacher': return 'Course management and student tracking';
      case 'student': return 'Learning modules and progress tracking';
      default: return 'Basic access';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8">
          <div className="flex items-center">
            {user.avatar ? (
              <img
                className="h-20 w-20 rounded-full border-4 border-white"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center border-4 border-white">
                <UserCircleIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-green-100">{user.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleBadgeColor(user.role)}`}>
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  {getRoleDescription(formData.role)}
                </p>
              </div>

              <div>
                <label htmlFor="academicCredits" className="block text-sm font-medium text-gray-700">
                  Academic Bank of Credits
                </label>
                <input
                  type="number"
                  id="academicCredits"
                  value={formData.academicCredits}
                  onChange={(e) => setFormData({ ...formData, academicCredits: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  min="0"
                  placeholder="Enter total credits earned"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Total credits earned from completed courses and certifications
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="mt-1 flex items-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    {getRoleDescription(user.role)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Academic Bank of Credits</label>
                <div className="mt-1 flex items-center">
                  <span className="text-lg font-semibold text-blue-600">{user.academic_credits || 0}</span>
                  <span className="ml-2 text-sm text-gray-500">credits earned</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Credits from completed courses and certifications</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Account Statistics */}
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Modules Completed</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+3 this week</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-2">12</p>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Drills Participated</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Latest: Fire</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-2">8</p>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Credits Earned</p>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">ABC Bank</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-2">{user?.academic_credits || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Community Posts</p>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-2xl font-bold text-orange-600 mt-2">24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};