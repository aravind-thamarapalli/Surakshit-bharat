import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Initialize Supabase client with error handling
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Create a mock client for development
  supabase = {
    auth: {
      signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
}

export { supabase };

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

// OAuth providers
export const OAUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
  MICROSOFT: 'azure'
};

// Authentication functions
export const authService = {
  // Expose supabase client
  supabase,

  // Sign in with OAuth
  async signInWithOAuth(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get user profile with role
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates })
      .select()
      .single();
    return { data, error };
  },

  // Create initial user profile
  async createUserProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: profileData.email,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        role: profileData.role || USER_ROLES.STUDENT,
        avatar_url: profileData.avatar_url,
        ...profileData
      })
      .select()
      .single();
    return { data, error };
  },

  // Get user progress data
  async getUserProgress(userId) {
    const { data, error } = await supabase
      .from('user_module_progress')
      .select(`
        *,
        learning_modules (
          id,
          title,
          category,
          difficulty_level,
          estimated_duration
        )
      `)
      .eq('user_id', userId);
    return { data, error };
  },

  // Update module progress
  async updateModuleProgress(userId, moduleId, progressData) {
    const { data, error } = await supabase
      .from('user_module_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        ...progressData,
        last_accessed_at: new Date().toISOString()
      })
      .select()
      .single();
    return { data, error };
  },

  // Get learning modules
  async getLearningModules(filters = {}) {
    let query = supabase
      .from('learning_modules')
      .select('*')
      .eq('is_published', true);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  // Get user achievements
  async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });
    return { data, error };
  },

  // Add user achievement
  async addUserAchievement(userId, achievementData) {
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        ...achievementData
      })
      .select()
      .single();
    return { data, error };
  },

  // Get community posts
  async getCommunityPosts(filters = {}) {
    let query = supabase
      .from('community_posts')
      .select(`
        *,
        profiles!community_posts_author_id_fkey (
          id,
          full_name,
          avatar_url,
          role
        )
      `);

    if (filters.type) {
      query = query.eq('post_type', filters.type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  // Create community post
  async createCommunityPost(authorId, postData) {
    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        author_id: authorId,
        ...postData
      })
      .select()
      .single();
    return { data, error };
  },

  // Get resources
  async getResources(filters = {}) {
    let query = supabase
      .from('resources')
      .select('*');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.type) {
      query = query.eq('resource_type', filters.type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  // Record user session
  async recordUserSession(userId, sessionData) {
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        user_id: userId,
        ...sessionData
      })
      .select()
      .single();
    return { data, error };
  },

  // Update user activity
  async updateUserActivity(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        last_activity_date: new Date().toISOString() 
      })
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Check if user has required role
  hasRole(userRole, requiredRole) {
    if (requiredRole === USER_ROLES.ADMIN) {
      return userRole === USER_ROLES.ADMIN;
    }
    if (requiredRole === USER_ROLES.TEACHER) {
      return userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.TEACHER;
    }
    return true; // Students can access student content
  }
};