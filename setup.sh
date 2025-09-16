#!/bin/bash

# ===========================================
# Surakshi Bharat - Quick Setup Script
# ===========================================

echo "🚀 Setting up Surakshi Bharat Development Environment..."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please update the following in your .env file:"
    echo "   - VITE_SUPABASE_URL (from your Supabase dashboard)"
    echo "   - VITE_SUPABASE_ANON_KEY (from your Supabase dashboard)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Supabase is configured
echo ""
echo "🔧 Checking Supabase configuration..."
if grep -q "your-project-id" .env; then
    echo "⚠️  Supabase not configured yet!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://supabase.com/dashboard"
    echo "2. Create a new project or select existing one"
    echo "3. Go to Settings > API"
    echo "4. Copy Project URL and anon key to .env file"
    echo "5. Set up OAuth providers in Authentication > Providers"
    echo "6. Create the profiles table (see README.md for SQL)"
    echo ""
else
    echo "✅ Supabase configuration looks good!"
fi

echo "🎯 Setup complete! Run 'npm run dev' to start the development server."
echo ""
echo "📚 For detailed setup instructions, see README.md"