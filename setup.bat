@echo off
REM ===========================================
REM Surakshi Bharat - Quick Setup Script (Windows)
REM ===========================================

echo 🚀 Setting up Surakshi Bharat Development Environment...
echo.

REM Check if .env exists
if not exist ".env" (
    echo 📄 Creating .env file from template...
    copy ".env.example" ".env"
    echo ✅ .env file created!
    echo.
    echo ⚠️  IMPORTANT: Please update the following in your .env file:
    echo    - VITE_SUPABASE_URL (from your Supabase dashboard)
    echo    - VITE_SUPABASE_ANON_KEY (from your Supabase dashboard)
    echo.
) else (
    echo ✅ .env file already exists
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if Supabase is configured
echo.
echo 🔧 Checking Supabase configuration...
findstr "your-project-id" .env >nul
if %errorlevel%==0 (
    echo ⚠️  Supabase not configured yet!
    echo.
    echo 📋 Next steps:
    echo 1. Go to https://supabase.com/dashboard
    echo 2. Create a new project or select existing one
    echo 3. Go to Settings ^> API
    echo 4. Copy Project URL and anon key to .env file
    echo 5. Set up OAuth providers in Authentication ^> Providers
    echo 6. Create the profiles table (see README.md for SQL)
    echo.
) else (
    echo ✅ Supabase configuration looks good!
)

echo 🎯 Setup complete! Run 'npm run dev' to start the development server.
echo.
echo 📚 For detailed setup instructions, see README.md
pause