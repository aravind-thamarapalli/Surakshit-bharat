-- =============================================
-- Supabase Database Schema for Surakshi Bharat
-- Disaster Preparedness Learning Platform
-- =============================================

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- =============================================
-- 1. USER PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT GENERATED ALWAYS AS (COALESCE(first_name || ' ' || last_name, email)) STORED,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    
    -- Role and permissions
    role TEXT CHECK (role IN ('admin', 'teacher', 'student')) DEFAULT 'student',
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    -- Academic information
    academic_credits INTEGER DEFAULT 0 CHECK (academic_credits >= 0),
    institution TEXT,
    grade_level TEXT,
    subject_interests TEXT[], -- Array of subjects
    
    -- Location and emergency contacts
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relationship TEXT,
    
    -- Platform preferences
    language_preference TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'Asia/Kolkata',
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
    theme_preference TEXT DEFAULT 'light' CHECK (theme_preference IN ('light', 'dark', 'auto')),
    
    -- Progress and statistics
    modules_completed INTEGER DEFAULT 0,
    drills_completed INTEGER DEFAULT 0,
    total_learning_hours DECIMAL(10,2) DEFAULT 0.00,
    achievement_badges TEXT[], -- Array of badge IDs
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    last_activity_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 2. LEARNING MODULES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.learning_modules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB, -- Stores structured module content
    module_type TEXT CHECK (module_type IN ('video', 'interactive', 'quiz', 'simulation', 'reading')),
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration INTEGER, -- In minutes
    credits_awarded INTEGER DEFAULT 1,
    
    -- Categorization
    category TEXT NOT NULL, -- e.g., 'earthquake', 'fire', 'flood', 'first-aid'
    tags TEXT[], -- Array of tags for search
    prerequisites TEXT[], -- Array of module IDs that must be completed first
    
    -- Content URLs and resources
    video_url TEXT,
    thumbnail_url TEXT,
    resource_files JSONB, -- Array of file objects {name, url, type}
    
    -- Status and metadata
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id),
    version INTEGER DEFAULT 1,
    total_enrollments INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. USER MODULE PROGRESS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_module_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.learning_modules(id) ON DELETE CASCADE,
    
    -- Progress tracking
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'paused')) DEFAULT 'not_started',
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Completion data
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Assessment results
    quiz_score INTEGER, -- Percentage score if module has quiz
    quiz_attempts INTEGER DEFAULT 0,
    quiz_passed BOOLEAN DEFAULT false,
    
    -- Learning data
    bookmarked BOOLEAN DEFAULT false,
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(user_id, module_id)
);

-- =============================================
-- 4. EMERGENCY DRILLS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.emergency_drills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    drill_type TEXT NOT NULL, -- 'fire', 'earthquake', 'flood', 'medical', etc.
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration INTEGER, -- In minutes
    
    -- Drill configuration
    instructions JSONB, -- Structured drill instructions
    success_criteria JSONB, -- What constitutes successful completion
    safety_guidelines TEXT[],
    required_equipment TEXT[],
    
    -- Scheduling
    is_scheduled BOOLEAN DEFAULT false,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    max_participants INTEGER,
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id),
    is_active BOOLEAN DEFAULT true,
    total_participants INTEGER DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 5. USER DRILL PARTICIPATION TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_drill_participation (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    drill_id UUID REFERENCES public.emergency_drills(id) ON DELETE CASCADE,
    
    -- Participation data
    status TEXT CHECK (status IN ('registered', 'completed', 'missed', 'cancelled')) DEFAULT 'registered',
    participation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completion_time_seconds INTEGER,
    
    -- Performance metrics
    score INTEGER CHECK (score >= 0 AND score <= 100),
    performance_data JSONB, -- Detailed performance metrics
    feedback_received TEXT,
    feedback_given TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(user_id, drill_id, participation_date::date)
);

-- =============================================
-- 6. COMMUNITY INTERACTIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    post_type TEXT CHECK (post_type IN ('discussion', 'question', 'announcement', 'resource_share', 'success_story')),
    
    -- Content metadata
    tags TEXT[],
    attachments JSONB, -- Array of file objects
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    
    -- Engagement metrics
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 7. COMMUNITY REPLIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.community_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_reply_id UUID REFERENCES public.community_replies(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    
    -- Engagement
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    is_solution BOOLEAN DEFAULT false, -- For questions
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. RESOURCE LIBRARY TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT CHECK (resource_type IN ('document', 'video', 'image', 'audio', 'link', 'toolkit')),
    category TEXT NOT NULL,
    
    -- File information
    file_url TEXT,
    file_size INTEGER, -- In bytes
    file_format TEXT,
    thumbnail_url TEXT,
    
    -- Content metadata
    tags TEXT[],
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    language TEXT DEFAULT 'en',
    is_downloadable BOOLEAN DEFAULT true,
    
    -- Access control
    access_level TEXT CHECK (access_level IN ('public', 'authenticated', 'student', 'teacher', 'admin')) DEFAULT 'authenticated',
    
    -- Engagement metrics
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating_sum INTEGER DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id),
    is_featured BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 9. USER ACHIEVEMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL, -- 'module_completion', 'drill_mastery', 'streak_milestone', etc.
    achievement_data JSONB, -- Flexible data for different achievement types
    points_earned INTEGER DEFAULT 0,
    badge_awarded TEXT,
    
    -- Timestamps
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate achievements
    UNIQUE(user_id, achievement_type, achievement_data)
);

-- =============================================
-- 10. USER SESSIONS TABLE (for analytics)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    
    -- Session data
    ip_address INET,
    user_agent TEXT,
    device_type TEXT,
    pages_visited TEXT[],
    actions_performed JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON public.profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_profiles_last_activity ON public.profiles(last_activity_date);

-- Module progress indexes
CREATE INDEX IF NOT EXISTS idx_user_module_progress_user_id ON public.user_module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_module_progress_module_id ON public.user_module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_module_progress_status ON public.user_module_progress(status);

-- Learning modules indexes
CREATE INDEX IF NOT EXISTS idx_learning_modules_category ON public.learning_modules(category);
CREATE INDEX IF NOT EXISTS idx_learning_modules_difficulty ON public.learning_modules(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_learning_modules_published ON public.learning_modules(is_published);

-- Community posts indexes
CREATE INDEX IF NOT EXISTS idx_community_posts_author ON public.community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON public.community_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON public.community_posts(created_at);

-- Resources indexes
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_access_level ON public.resources(access_level);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_drill_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Public read access for published learning modules
CREATE POLICY "Anyone can view published modules" ON public.learning_modules
    FOR SELECT USING (is_published = true);

-- Users can view their own progress
CREATE POLICY "Users can view their own progress" ON public.user_module_progress
    FOR ALL USING (auth.uid() = user_id);

-- Public read access for resources based on access level
CREATE POLICY "Public resources visible to all" ON public.resources
    FOR SELECT USING (access_level = 'public' OR (auth.uid() IS NOT NULL AND access_level IN ('authenticated', 'student')));

-- Community posts visible to authenticated users
CREATE POLICY "Authenticated users can view community posts" ON public.community_posts
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create community posts" ON public.community_posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON public.community_posts
    FOR UPDATE USING (auth.uid() = author_id);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_modules_updated_at BEFORE UPDATE ON public.learning_modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_module_progress_updated_at BEFORE UPDATE ON public.user_module_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_drills_updated_at BEFORE UPDATE ON public.emergency_drills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update last_login_at on profile
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles 
    SET last_login_at = NOW() 
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to update last login time
CREATE TRIGGER on_auth_user_login
    AFTER UPDATE OF last_sign_in_at ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.update_last_login();

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample learning modules
INSERT INTO public.learning_modules (title, description, module_type, difficulty_level, estimated_duration, category, tags, is_published) VALUES
('Earthquake Safety Basics', 'Learn fundamental earthquake safety measures and preparedness techniques', 'interactive', 'beginner', 30, 'earthquake', ARRAY['safety', 'preparedness', 'basics'], true),
('Fire Emergency Response', 'Comprehensive guide to fire emergency procedures and evacuation', 'video', 'beginner', 25, 'fire', ARRAY['fire', 'emergency', 'evacuation'], true),
('Flood Preparedness Guide', 'Understanding flood risks and preparation strategies', 'reading', 'intermediate', 40, 'flood', ARRAY['flood', 'water', 'preparedness'], true),
('First Aid Fundamentals', 'Basic first aid techniques for emergency situations', 'interactive', 'beginner', 45, 'medical', ARRAY['first-aid', 'medical', 'emergency'], true),
('Tsunami Warning Systems', 'Understanding tsunami alerts and evacuation procedures', 'video', 'advanced', 35, 'tsunami', ARRAY['tsunami', 'warning', 'coastal'], true);

-- Insert sample emergency drills
INSERT INTO public.emergency_drills (title, description, drill_type, difficulty_level, estimated_duration, is_active) VALUES
('School Fire Evacuation', 'Practice fire evacuation procedures for educational institutions', 'fire', 'beginner', 15, true),
('Earthquake Drop Cover Hold', 'Practice the standard earthquake response technique', 'earthquake', 'beginner', 10, true),
('Medical Emergency Response', 'Simulate medical emergency scenarios and responses', 'medical', 'intermediate', 20, true),
('Flood Evacuation Drill', 'Practice evacuation procedures for flood scenarios', 'flood', 'intermediate', 25, true);

-- Insert sample resources
INSERT INTO public.resources (title, description, resource_type, category, tags, access_level, is_downloadable) VALUES
('Emergency Kit Checklist', 'Comprehensive checklist for emergency preparedness kit', 'document', 'preparedness', ARRAY['checklist', 'kit', 'emergency'], 'public', true),
('Emergency Contact Template', 'Template for organizing emergency contact information', 'document', 'contact', ARRAY['contacts', 'template', 'emergency'], 'public', true),
('Evacuation Route Planner', 'Guide for planning evacuation routes from home and workplace', 'document', 'evacuation', ARRAY['routes', 'planning', 'evacuation'], 'authenticated', true),
('Family Emergency Plan', 'Template for creating family emergency communication plan', 'document', 'planning', ARRAY['family', 'plan', 'communication'], 'authenticated', true);

-- =============================================
-- GRANTS AND PERMISSIONS
-- =============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select access to published content for anonymous users
GRANT SELECT ON public.learning_modules TO anon;
GRANT SELECT ON public.resources TO anon;

-- Grant full access to authenticated users for their own data
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.user_module_progress TO authenticated;
GRANT ALL ON public.user_drill_participation TO authenticated;
GRANT ALL ON public.community_posts TO authenticated;
GRANT ALL ON public.community_replies TO authenticated;
GRANT ALL ON public.user_achievements TO authenticated;
GRANT ALL ON public.user_sessions TO authenticated;

-- Grant read access to published content for authenticated users
GRANT SELECT ON public.learning_modules TO authenticated;
GRANT SELECT ON public.emergency_drills TO authenticated;
GRANT SELECT ON public.resources TO authenticated;

-- =============================================
-- COMPLETE SCHEMA CREATION
-- =============================================

-- Refresh the schema
NOTIFY pgrst, 'reload schema';