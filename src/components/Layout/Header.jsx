import React, { useState } from 'react';
import { 
  Bars3Icon, 
  BellIcon, 
  ChevronDownIcon, 
  ArrowRightOnRectangleIcon, 
  UserCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UsersIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SmartSearch } from '../Common/SmartSearch';

export const Header = ({ user, onMenuToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">SB</span>
                  </div>
                  <span className="font-bold text-lg text-gray-900">Surakshit Bharat</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Smart Search - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SmartSearch userRole={user?.role} />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Admin Quick Access */}
            {user?.role === 'admin' && (
              <div className="hidden md:flex items-center space-x-2">
                <button 
                  onClick={() => navigate('/admin-dashboard')}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Admin Dashboard"
                >
                  <ChartBarIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => navigate('/user-management')}
                  className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                  title="User Management"
                >
                  <UsersIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => navigate('/system-settings')}
                  className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                  title="System Settings"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
              </div>
            )}
            
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {user.avatar ? (
                    <div className="relative">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                      {user.role === 'admin' && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white flex items-center justify-center">
                          <ShieldCheckIcon className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center relative ${
                      user.role === 'admin' ? 'bg-red-100' : 'bg-gray-300'
                    }`}>
                      <UserCircleIcon className={`h-6 w-6 ${
                        user.role === 'admin' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      {user.role === 'admin' && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white flex items-center justify-center">
                          <ShieldCheckIcon className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                  )}
                  <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className={`text-xs capitalize font-medium ${
                          user.role === 'admin' ? 'text-red-600' : 
                          user.role === 'teacher' ? 'text-blue-600' : 
                          'text-green-600'
                        }`}>
                          {user.role === 'admin' && '🛡️ '}{user.role}
                        </p>
                      </div>
                      
                      {/* Admin-specific menu items */}
                      {user.role === 'admin' && (
                        <>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/admin-dashboard');
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ChartBarIcon className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/user-management');
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <UsersIcon className="h-4 w-4 mr-2" />
                            User Management
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/system-settings');
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Cog6ToothIcon className="h-4 w-4 mr-2" />
                            System Settings
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                        </>
                      )}
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/profile');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserCircleIcon className="h-4 w-4 mr-2" />
                        Profile Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleSignOut();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop for mobile menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};
