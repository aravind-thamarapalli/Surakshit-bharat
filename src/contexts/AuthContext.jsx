import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, USER_ROLES } from '../services/authService';
import { dataService } from '../services/dataService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if authService is properly initialized
  if (!authService || !authService.supabase) {
    console.error('AuthService not properly initialized');
    return null;
  }
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true; // Add mounted flag to prevent state updates after unmount
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { session, error } = await authService.getSession();
        if (error) throw error;
        
        if (mounted && session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else if (mounted) {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = authService.supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return; // Prevent updates if component unmounted
        
        try {
          if (session?.user) {
            setUser(session.user);
            await loadUserProfile(session.user.id);
          } else {
            setUser(null);
            setUserProfile(null);
          }
          setLoading(false);
        } catch (error) {
          console.error('Auth state change error:', error);
          if (mounted) {
            setUser(null);
            setUserProfile(null);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false; // Mark as unmounted
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array to prevent re-runs

  const loadUserProfile = async (userId) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile load timeout')), 10000)
      );
      
      const profilePromise = authService.getUserProfile(userId);
      const { data, error } = await Promise.race([profilePromise, timeoutPromise]);
      
      if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
        throw error;
      }

      // If no profile exists, create one with default values
      if (!data) {
        const user = await authService.getCurrentUser();
        if (user.user) {
          const newProfile = {
            email: user.user.email,
            full_name: user.user.user_metadata?.full_name || user.user.email.split('@')[0],
            role: USER_ROLES.STUDENT,
            avatar_url: user.user.user_metadata?.avatar_url || '',
            profile_completion: 20,
            academic_credits: 0,
            current_streak_days: 0,
            last_active: new Date().toISOString()
          };
          
          const { data: createdProfile, error: createError } = await authService.createUserProfile(userId, newProfile);
          if (!createError && createdProfile) {
            setUserProfile(createdProfile);
            
            // Load dashboard data for new user
            const { data: dashboard } = await dataService.getUserDashboardData(userId);
            if (dashboard) {
              setDashboardData(dashboard);
            }
            return;
          }
        }
      }
      
      setUserProfile(data || { role: USER_ROLES.STUDENT }); // Default to student role
      
      // Load comprehensive dashboard data
      const { data: dashboard } = await dataService.getUserDashboardData(userId);
      if (dashboard) {
        setDashboardData(dashboard);
      }
      
      // Update user activity and record session
      await authService.updateUserActivity(userId);
      await authService.recordUserSession(userId, {
        device_info: navigator.userAgent,
        ip_address: 'auto' // Supabase will handle this
      });
      
      // Check for new achievements
      await dataService.checkAndAwardAchievements(userId);
      
    } catch (err) {
      console.error('Error loading user profile:', err);
      setUserProfile({ role: USER_ROLES.STUDENT }); // Fallback to student
    }
  };

  const signInWithOAuth = async (provider) => {
    try {
      setError(null);
      const { data, error } = await authService.signInWithOAuth(provider);
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true); // Add loading state during logout
      
      // Clear local state first
      setUser(null);
      setUserProfile(null);
      setDashboardData(null);
      setUserProfile(null);
      
      // Then clear Supabase session
      const { error } = await authService.signOut();
      if (error) throw error;
      
      // Clear any cached data
      localStorage.removeItem('recentSearches');
      sessionStorage.clear();
      
      setLoading(false);
      return { error: null };
    } catch (err) {
      setError(err.message);
      return { error: err };
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      setError(null);
      const { data, error } = await authService.updateUserProfile(user.id, updates);
      if (error) throw error;
      setUserProfile(data);
      
      // Refresh dashboard data after profile update
      const { data: dashboard } = await dataService.getUserDashboardData(user.id);
      if (dashboard) {
        setDashboardData(dashboard);
      }
      
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err };
    }
  };

  const refreshDashboard = async () => {
    if (!user) return;
    
    try {
      const { data: dashboard } = await dataService.getUserDashboardData(user.id);
      if (dashboard) {
        setDashboardData(dashboard);
      }
    } catch (err) {
      console.error('Error refreshing dashboard:', err);
    }
  };

  const hasRole = (requiredRole) => {
    if (!userProfile) return false;
    return authService.hasRole(userProfile.role, requiredRole);
  };

  const getRedirectPath = (role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return '/admin';
      case USER_ROLES.TEACHER:
        return '/teacher';
      case USER_ROLES.STUDENT:
        return '/student';
      default:
        return '/student';
    }
  };

  const value = {
    user,
    userProfile,
    dashboardData,
    loading,
    error,
    signInWithOAuth,
    signOut,
    updateProfile,
    refreshDashboard,
    hasRole,
    getRedirectPath,
    isAuthenticated: !!user,
    role: userProfile?.role || USER_ROLES.STUDENT
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};