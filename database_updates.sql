-- Surakshi Bharat Database Schema Updates
-- Add Academic Bank of Credits column

-- Add academic_credits column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS academic_credits INTEGER DEFAULT 0;

-- Add index for better performance on academic_credits queries
CREATE INDEX IF NOT EXISTS idx_profiles_academic_credits ON profiles(academic_credits);

-- Update existing users to have 0 academic credits if null
UPDATE profiles SET academic_credits = 0 WHERE academic_credits IS NULL;

-- Add constraint to ensure academic_credits is not negative
ALTER TABLE profiles ADD CONSTRAINT chk_academic_credits_positive CHECK (academic_credits >= 0);

-- Create a function to calculate total credits (for future use)
CREATE OR REPLACE FUNCTION calculate_user_credits(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    total_credits INTEGER;
BEGIN
    -- This function can be extended to calculate credits from completed courses
    -- For now, it just returns the stored academic_credits value
    SELECT COALESCE(academic_credits, 0) INTO total_credits 
    FROM profiles 
    WHERE id = user_id;
    
    RETURN COALESCE(total_credits, 0);
END;
$$ LANGUAGE plpgsql;

-- Example: Future course completion tracking table (optional)
-- Uncomment if you want to track individual course completions
/*
CREATE TABLE IF NOT EXISTS course_completions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    course_name TEXT NOT NULL,
    credits_earned INTEGER DEFAULT 0,
    completion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for course_completions
ALTER TABLE course_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course completions" ON course_completions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own course completions" ON course_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
*/