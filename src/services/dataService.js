import { authService } from './authService';

// Data service for all database operations
export const dataService = {
  // =============================================
  // USER PROFILE OPERATIONS
  // =============================================
  
  async getUserProfile(userId) {
    return await authService.getUserProfile(userId);
  },

  async updateUserProfile(userId, updates) {
    return await authService.updateUserProfile(userId, updates);
  },

  async createUserProfile(userId, profileData) {
    return await authService.createUserProfile(userId, profileData);
  },

  // =============================================
  // LEARNING MODULE OPERATIONS
  // =============================================
  
  async getLearningModules(filters = {}) {
    return await authService.getLearningModules(filters);
  },

  async getUserProgress(userId) {
    return await authService.getUserProgress(userId);
  },

  async updateModuleProgress(userId, moduleId, progressData) {
    return await authService.updateModuleProgress(userId, moduleId, progressData);
  },

  async completeModule(userId, moduleId, completionData = {}) {
    const progressData = {
      status: 'completed',
      progress_percentage: 100,
      completed_at: new Date().toISOString(),
      ...completionData
    };
    return await this.updateModuleProgress(userId, moduleId, progressData);
  },

  async bookmarkModule(userId, moduleId, bookmarked = true) {
    return await this.updateModuleProgress(userId, moduleId, { bookmarked });
  },

  // =============================================
  // EMERGENCY DRILLS OPERATIONS
  // =============================================
  
  async getEmergencyDrills(filters = {}) {
    try {
      let query = authService.supabase
        .from('emergency_drills')
        .select('*')
        .eq('is_active', true);

      if (filters.type) {
        query = query.eq('drill_type', filters.type);
      }
      if (filters.difficulty) {
        query = query.eq('difficulty_level', filters.difficulty);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUserDrillParticipation(userId) {
    try {
      const { data, error } = await authService.supabase
        .from('user_drill_participation')
        .select(`
          *,
          emergency_drills (
            id,
            title,
            drill_type,
            difficulty_level
          )
        `)
        .eq('user_id', userId);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async recordDrillParticipation(userId, drillId, participationData) {
    try {
      const { data, error } = await authService.supabase
        .from('user_drill_participation')
        .insert({
          user_id: userId,
          drill_id: drillId,
          ...participationData
        })
        .select()
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // COMMUNITY OPERATIONS
  // =============================================
  
  async getCommunityPosts(filters = {}) {
    return await authService.getCommunityPosts(filters);
  },

  async createCommunityPost(authorId, postData) {
    return await authService.createCommunityPost(authorId, postData);
  },

  async getCommunityReplies(postId) {
    try {
      const { data, error } = await authService.supabase
        .from('community_replies')
        .select(`
          *,
          profiles!community_replies_author_id_fkey (
            id,
            full_name,
            avatar_url,
            role
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createCommunityReply(authorId, postId, content, parentReplyId = null) {
    try {
      const { data, error } = await authService.supabase
        .from('community_replies')
        .insert({
          author_id: authorId,
          post_id: postId,
          content,
          parent_reply_id: parentReplyId
        })
        .select()
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updatePostEngagement(postId, action) {
    try {
      const { data, error } = await authService.supabase.rpc('update_post_engagement', {
        post_id: postId,
        action_type: action // 'upvote', 'downvote', 'view'
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // RESOURCE OPERATIONS
  // =============================================
  
  async getResources(filters = {}) {
    return await authService.getResources(filters);
  },

  async incrementResourceView(resourceId) {
    try {
      const { data, error } = await authService.supabase.rpc('increment_resource_view', {
        resource_id: resourceId
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async incrementResourceDownload(resourceId) {
    try {
      const { data, error } = await authService.supabase.rpc('increment_resource_download', {
        resource_id: resourceId
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async rateResource(userId, resourceId, rating) {
    try {
      // This would need a user_resource_ratings table
      const { data, error } = await authService.supabase
        .from('user_resource_ratings')
        .upsert({
          user_id: userId,
          resource_id: resourceId,
          rating
        })
        .select()
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // ACHIEVEMENT OPERATIONS
  // =============================================
  
  async getUserAchievements(userId) {
    return await authService.getUserAchievements(userId);
  },

  async addUserAchievement(userId, achievementData) {
    return await authService.addUserAchievement(userId, achievementData);
  },

  async checkAndAwardAchievements(userId) {
    try {
      // Get user statistics
      const { data: profile } = await this.getUserProfile(userId);
      const { data: progress } = await this.getUserProgress(userId);
      
      if (!profile || !progress) return;

      const achievements = [];

      // Check for module completion achievements
      const completedModules = progress.filter(p => p.status === 'completed').length;
      if (completedModules >= 5 && !profile.achievement_badges?.includes('module_master_5')) {
        achievements.push({
          achievement_type: 'module_completion',
          achievement_data: { modules_completed: completedModules },
          points_earned: 50,
          badge_awarded: 'module_master_5'
        });
      }

      // Check for streak achievements
      if (profile.current_streak_days >= 7 && !profile.achievement_badges?.includes('streak_week')) {
        achievements.push({
          achievement_type: 'streak_milestone',
          achievement_data: { streak_days: profile.current_streak_days },
          points_earned: 30,
          badge_awarded: 'streak_week'
        });
      }

      // Award achievements
      for (const achievement of achievements) {
        await this.addUserAchievement(userId, achievement);
      }

      return { data: achievements, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // ANALYTICS AND DASHBOARD DATA
  // =============================================
  
  async getUserDashboardData(userId) {
    try {
      const [
        profileResult,
        progressResult,
        achievementsResult,
        drillsResult
      ] = await Promise.all([
        this.getUserProfile(userId),
        this.getUserProgress(userId),
        this.getUserAchievements(userId),
        this.getUserDrillParticipation(userId)
      ]);

      const dashboard = {
        profile: profileResult.data,
        progress: progressResult.data || [],
        achievements: achievementsResult.data || [],
        drills: drillsResult.data || [],
        statistics: {
          modulesCompleted: progressResult.data?.filter(p => p.status === 'completed').length || 0,
          totalProgress: progressResult.data?.length || 0,
          achievementCount: achievementsResult.data?.length || 0,
          drillsCompleted: drillsResult.data?.filter(d => d.status === 'completed').length || 0,
          totalCredits: profileResult.data?.academic_credits || 0,
          currentStreak: profileResult.data?.current_streak_days || 0
        }
      };

      return { data: dashboard, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getAdminAnalytics() {
    try {
      const { data, error } = await authService.supabase.rpc('get_admin_analytics');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getTeacherAnalytics(teacherId) {
    try {
      const { data, error } = await authService.supabase.rpc('get_teacher_analytics', {
        teacher_id: teacherId
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // SESSION MANAGEMENT
  // =============================================
  
  async recordUserSession(userId, sessionData) {
    return await authService.recordUserSession(userId, sessionData);
  },

  async updateUserActivity(userId) {
    return await authService.updateUserActivity(userId);
  },

  async getUserSessions(userId, limit = 10) {
    try {
      const { data, error } = await authService.supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // =============================================
  // SEARCH OPERATIONS
  // =============================================
  
  async searchAll(query, filters = {}) {
    try {
      const searchPromises = [];

      // Search modules
      if (!filters.type || filters.type === 'modules') {
        searchPromises.push(
          authService.supabase
            .from('learning_modules')
            .select('id, title, description, category, module_type')
            .or(`title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
            .eq('is_published', true)
            .limit(5)
        );
      }

      // Search resources
      if (!filters.type || filters.type === 'resources') {
        searchPromises.push(
          authService.supabase
            .from('resources')
            .select('id, title, description, category, resource_type')
            .or(`title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
            .limit(5)
        );
      }

      // Search community posts
      if (!filters.type || filters.type === 'community') {
        searchPromises.push(
          authService.supabase
            .from('community_posts')
            .select('id, title, content, post_type')
            .or(`title.ilike.%${query}%, content.ilike.%${query}%`)
            .limit(5)
        );
      }

      const results = await Promise.all(searchPromises);
      
      const combinedResults = {
        modules: results[0]?.data || [],
        resources: results[1]?.data || [],
        community: results[2]?.data || []
      };

      return { data: combinedResults, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

export default dataService;