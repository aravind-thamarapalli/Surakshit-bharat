import React, { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { useAuth } from '../../contexts/AuthContext';
import { EnvironmentSetup } from '../Auth/EnvironmentSetup';

export const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile } = useAuth();

  // Format user data for components
  const userData = user ? {
    id: user.id,
    name: userProfile?.firstName && userProfile?.lastName 
      ? `${userProfile.firstName} ${userProfile.lastName}`
      : user.email || 'User',
    email: user.email,
    role: userProfile?.role || 'student',
    avatar: user.user_metadata?.avatar_url || userProfile?.avatar_url
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <EnvironmentSetup />
      
      {/* Fixed Header */}
      <Header user={userData} onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      {/* Navigation Sidebar */}
      <Navigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        userRole={userData?.role}
      />
      
      {/* Main Content Area */}
      <main className="lg:ml-80 pt-16 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
