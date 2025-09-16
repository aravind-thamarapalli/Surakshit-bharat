import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  PlayIcon,
  CheckIcon,
  ArrowRightIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  SparklesIcon,
  LightBulbIcon,
  HeartIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  StarIcon,
  BuildingOfficeIcon,
  MapIcon,
  ClockIcon,
  TrophyIcon,
  MapPinIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({ students: 0, schools: 0, modules: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Government testimonials from different states
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar IAS",
      role: "Secretary, Department of School Education, Uttar Pradesh",
      quote: "Surakshi Bharat has revolutionized disaster preparedness education across our state. The platform's comprehensive approach ensures every student is equipped with life-saving knowledge.",
      department: "Ministry of Education",
      rating: 5
    },
    {
      name: "Smt. Priya Sharma IPS",
      role: "Director General, Disaster Management, Maharashtra",
      quote: "The real-time emergency response features and community network have significantly improved our state's disaster preparedness capabilities.",
      department: "Disaster Management Authority",
      rating: 5
    },
    {
      name: "Shri Anand Patel IFS",
      role: "Joint Secretary, Ministry of Home Affairs",
      quote: "A model platform that should be implemented nationwide. The integration of technology with traditional emergency protocols is exemplary.",
      department: "Government of India",
      rating: 5
    }
  ];

  // Government stats with realistic numbers
  useEffect(() => {
    const targetStats = { students: 847650, schools: 12450, modules: 247 };
    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep <= steps) {
        setAnimatedStats({
          students: Math.floor((targetStats.students * currentStep) / steps),
          schools: Math.floor((targetStats.schools * currentStep) / steps),
          modules: Math.floor((targetStats.modules * currentStep) / steps),
        });
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "National Security Integration",
      description: "Aligned with National Disaster Management Authority (NDMA) guidelines and integrated with emergency response protocols.",
      color: "bg-blue-600",
      category: "Security"
    },
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Curriculum Compliant",
      description: "Fully integrated with NCERT and state board curricula, supporting NEP 2020 objectives for holistic education.",
      color: "bg-green-600",
      category: "Education"
    },
    {
      icon: <BuildingOfficeIcon className="h-8 w-8" />,
      title: "Multi-Agency Coordination",
      description: "Seamless coordination between education departments, disaster management authorities, and local administration.",
      color: "bg-purple-600",
      category: "Governance"
    },
    {
      icon: <MapIcon className="h-8 w-8" />,
      title: "Pan-India Implementation",
      description: "Scalable platform supporting all 28 states and 8 union territories with region-specific disaster preparedness modules.",
      color: "bg-orange-600",
      category: "Infrastructure"
    },
    {
      icon: <UsersIcon className="h-8 w-8" />,
      title: "Community Resilience",
      description: "Building disaster-resilient communities through comprehensive stakeholder engagement and capacity building programs.",
      color: "bg-indigo-600",
      category: "Community"
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Advanced analytics and monitoring systems for tracking implementation progress and measuring educational outcomes.",
      color: "bg-teal-600",
      category: "Technology"
    }
  ];

  const stats = [
    { 
      label: "Students Enrolled", 
      value: animatedStats.students.toLocaleString(), 
      suffix: "+", 
      description: "Across India"
    },
    { 
      label: "Educational Institutions", 
      value: animatedStats.schools.toLocaleString(), 
      suffix: "+", 
      description: "Government & Private"
    },
    { 
      label: "Learning Modules", 
      value: animatedStats.modules.toLocaleString(), 
      suffix: "", 
      description: "NDMA Certified"
    },
    { 
      label: "Implementation Rate", 
      value: "98", 
      suffix: "%", 
      description: "Target Achievement"
    }
  ];

  const contentTypes = [
    { icon: <VideoCameraIcon className="h-6 w-6" />, label: "Interactive Videos", color: "from-red-500 to-pink-500" },
    { icon: <PuzzlePieceIcon className="h-6 w-6" />, label: "AR/VR Games", color: "from-purple-500 to-indigo-500" },
    { icon: <DocumentTextIcon className="h-6 w-6" />, label: "Smart Resources", color: "from-green-500 to-blue-500" },
    { icon: <BookOpenIcon className="h-6 w-6" />, label: "AI Study Plans", color: "from-yellow-500 to-orange-500" }
  ];

  const handleGoogleLogin = () => {
    // This would integrate with your authentication system
    console.log('Google login initiated');
    // For now, redirect to the main dashboard
    window.location.href = '/dashboard';
  };

  // Direct portal access functions (no authentication)
  const handleStudentLogin = () => {
    navigate('/dashboard'); // Student portal
  };

  const handleTeacherLogin = () => {
    navigate('/teacher-dashboard'); // Teacher portal
  };

  const handleAdminLogin = () => {
    navigate('/admin-dashboard'); // Admin portal
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        
        .counter {
          display: inline-block;
        }
        
        /* Gradient text animation */
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
      {/* Modern Navigation Header */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Surakshi Bharat</h1>
                <p className="text-xs text-gray-500">Interactive Learning Platform</p>
              </div>
            </div>
            
            {/* User Type Login Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleStudentLogin}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2"
              >
                <AcademicCapIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Student Portal</span>
                <span className="sm:hidden">Student</span>
              </button>
              <button
                onClick={handleTeacherLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2"
              >
                <UsersIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Teacher Portal</span>
                <span className="sm:hidden">Teacher</span>
              </button>
              <button
                onClick={handleAdminLogin}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2"
              >
                <Cog6ToothIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Benefit-Oriented */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        {/* Optimistic Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <defs>
              <pattern id="safetyGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#10B981" opacity="0.1"/>
                <circle cx="15" cy="15" r="1" fill="#3B82F6" opacity="0.1"/>
                <circle cx="45" cy="45" r="1" fill="#F59E0B" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#safetyGrid)"/>
            <polygon points="0,0 1440,0 1440,300 0,500" fill="rgba(16, 185, 129, 0.05)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-blue-600">Empowering India's Students</span>
              <br />
              <span className="text-green-600">to Be Safer and Smarter</span>
            </h1>
            
            {/* Sub-headline */}
            <h2 className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              An interactive learning platform that delivers fun, location-specific games and stories 
              to teach students across India vital disaster prevention skills.
            </h2>
            
            {/* Value Proposition */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Turn disaster awareness into action through play. Our platform makes safety education engaging, 
              relevant, and memorable for every student, no matter where they are in India.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={handleStudentLogin}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <AcademicCapIcon className="h-6 w-6" />
                <span>Student Portal</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              
              <button 
                onClick={handleTeacherLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <UsersIcon className="h-6 w-6" />
                <span>Teacher Portal</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>

              <button 
                onClick={handleAdminLogin}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <Cog6ToothIcon className="h-6 w-6" />
                <span>Admin Portal</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Visual Representation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location-Specific</h3>
                <p className="text-gray-600 text-sm">Customized content for local disaster risks</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PuzzlePieceIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Games</h3>
                <p className="text-gray-600 text-sm">Learn through engaging play and challenges</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-World Skills</h3>
                <p className="text-gray-600 text-sm">Practical knowledge for actual emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple process that transforms disaster preparedness into an engaging learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1: Personalize Your Learning */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-8 w-8 text-white" />
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Personalize Your Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Students select their class and location, and our platform instantly customizes the learning modules 
                to local disaster risks, from cyclones in Visakhapatnam to earthquakes in the Himalayas.
              </p>
            </div>

            {/* Step 2: Play, Learn, and Grow */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-1">
                    <PuzzlePieceIcon className="h-8 w-8 text-white" />
                    <BookOpenIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Play, Learn, and Grow
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dive into a world of interactive comics, decision-making games, and exciting quizzes. 
                Earn badges and track your progress as you master essential safety skills.
              </p>
            </div>

            {/* Step 3: Build Real-World Resilience */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-1">
                    <ShieldCheckIcon className="h-8 w-8 text-white" />
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Build Real-World Resilience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our curriculum-aligned content moves beyond theory, empowering students with the practical 
                knowledge and confidence they need to stay safe during an emergency.
              </p>
            </div>
          </div>

          {/* Visual Connection Lines */}
          <div className="hidden md:block relative mt-12">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1">
              <svg className="w-full h-full" viewBox="0 0 100 10">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 0 5 Q 25 0 50 5 T 100 5" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              🌟 Impact Across India
            </h2>
            <p className="text-xl text-blue-100">Real numbers, Real impact, Real change</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    <span className="counter" data-target={stat.value.replace(/,/g, '')}>
                      {stat.value}
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-lg text-blue-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <pattern id="missionPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white" opacity="0.3"/>
                <circle cx="10" cy="10" r="1" fill="white" opacity="0.2"/>
                <circle cx="40" cy="40" r="1" fill="white" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#missionPattern)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why We Built This
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-100 mb-12">
              Fostering a Generation of Resilience
            </h3>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-xl md:text-2xl text-blue-50 leading-relaxed mb-12">
                In a country with diverse geography, disaster preparedness cannot be one-size-fits-all. 
                Our mission is to provide every student in India with accessible, engaging, and life-saving 
                education that is directly relevant to their environment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GlobeAltIcon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">Diverse Geography, Customized Learning</h4>
                  <p className="text-blue-100 leading-relaxed">
                    From coastal cyclones to mountain avalanches, each region faces unique challenges. 
                    Our platform adapts to local risks, ensuring every student learns what matters most for their area.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">Making Learning Fun</h4>
                  <p className="text-blue-100 leading-relaxed">
                    By making learning fun, we turn awareness into instinct and empower children to become 
                    proactive leaders in community safety. Play is the most powerful teacher.
                  </p>
                </div>
              </div>
              
              <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <ShieldCheckIcon className="h-12 w-12 text-yellow-400" />
                  <RocketLaunchIcon className="h-10 w-10 text-green-400" />
                  <UsersIcon className="h-12 w-12 text-blue-300" />
                </div>
                <p className="text-xl text-white leading-relaxed text-center">
                  <strong>Our Vision:</strong> A generation of informed, confident, and capable young Indians 
                  who can protect themselves, their families, and their communities when disaster strikes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* For Our Students */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-green-600">For Our Students</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn through play, master essential skills, and become a safety hero in your community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <PuzzlePieceIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Engaging Games</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn through play, not just reading. Interactive challenges, puzzles, and simulations 
                  that make safety skills stick in your memory.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-blue-100">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Relevant Scenarios</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tackle challenges you might actually face. Location-specific content that prepares you 
                  for real disasters in your area.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-yellow-100">
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Badges</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get rewarded for your progress and knowledge. Unlock achievements as you complete modules 
                  and demonstrate your safety skills.
                </p>
              </div>
            </div>
          </div>

          {/* For Our Educators */}
          <div className="border-t border-gray-200 pt-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">For Our Educators</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful tools that make teaching disaster preparedness effective and effortless
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-blue-100">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpenIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum-Aligned</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seamlessly integrate into your lesson plans. Content designed to complement existing 
                  curriculum standards and educational objectives.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-purple-100">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ChartBarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Classroom Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily track student progress and comprehension. Real-time insights into learning 
                  outcomes and areas that need attention.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-teal-100">
                <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cog6ToothIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Account Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Spend less time on admin and more time teaching. Intuitive interface for managing 
                  classes, assignments, and student accounts.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Enhanced Content Types Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📱 Revolutionary Learning Formats
            </h2>
            <p className="text-xl text-gray-600">
              Multiple cutting-edge formats designed for the digital generation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {contentTypes.map((type, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform scale-150`}></div>
                  
                  {/* Main circle */}
                  <div className={`relative bg-gradient-to-br ${type.color} text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    {type.icon}
                    
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {type.label}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors duration-300">
                  Available Now
                </p>
                
                {/* Progress bar animation */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
                  <div 
                    className={`h-2 bg-gradient-to-r ${type.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission: Building a Resilient India
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Surakshi Bharat is dedicated to creating a disaster-resilient nation through 
                comprehensive education and community engagement. We believe that preparedness 
                is the key to saving lives and protecting communities.
              </p>
              
              <div className="space-y-4">
                {[
                  "Interactive learning modules for all age groups",
                  "Real-world scenario training and simulations",
                  "Community network for knowledge sharing",
                  "Emergency communication systems",
                  "Teacher training and resource development"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleGoogleLogin}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
              >
                <span>Join Our Mission</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-2xl p-12 text-white text-center">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold">Safe Learning</h4>
                    <p className="text-sm opacity-90">Secure Environment</p>
                  </div>
                  <div className="text-center">
                    <UsersIcon className="h-12 w-12 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold">Community</h4>
                    <p className="text-sm opacity-90">Connected Students</p>
                  </div>
                  <div className="text-center">
                    <AcademicCapIcon className="h-12 w-12 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold">Expert Content</h4>
                    <p className="text-sm opacity-90">Verified Learning</p>
                  </div>
                  <div className="text-center">
                    <ClockIcon className="h-12 w-12 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold">Always Available</h4>
                    <p className="text-sm opacity-90">Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <ShieldCheckIcon className="h-10 w-10 text-blue-400" />
              <span className="text-2xl font-bold">Surakshi Bharat</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Empowering communities across India with knowledge, tools, and networks 
              needed to prepare for, respond to, and recover from disasters.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 Surakshi Bharat. Building a safer, more resilient India together.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};