import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  UsersIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  ClockIcon,
  TrophyIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PuzzlePieceIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export const HomePage = () => {
  const recentModules = [
    { id: 1, title: 'Earthquake Safety', progress: 75, type: 'Natural Disasters' },
    { id: 2, title: 'Fire Prevention', progress: 90, type: 'Fire Safety' },
    { id: 3, title: 'Flood Response', progress: 45, type: 'Natural Disasters' }
  ];

  const stats = [
    { label: 'Modules Completed', value: '12', icon: BookOpenIcon, color: 'bg-green-100 text-green-600' },
    { label: 'Current Streak', value: '7 days', icon: TrophyIcon, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Safety Score', value: '85%', icon: ShieldCheckIcon, color: 'bg-blue-100 text-blue-600' },
    { label: 'Resources Used', value: '24', icon: DocumentTextIcon, color: 'bg-purple-100 text-purple-600' }
  ];

  const emergencyNumbers = [
    { label: 'Emergency Services', number: '112', color: 'text-red-600' },
    { label: 'Disaster Hotline', number: '+91-11-26701728', color: 'text-orange-600' }
  ];

  const portals = [
    {
      title: 'Learning Modules',
      description: 'Access interactive disaster-preparedness courses and track your progress',
      icon: AcademicCapIcon,
      link: '/modules',
      buttonText: 'Start Learning',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Community Hub',
      description: 'Connect and collaborate with others on disaster resilience projects',
      icon: UsersIcon,
      link: '/community',
      buttonText: 'Join Community',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Resource Library',
      description: 'Access emergency guides, training videos, interactive games, and contact information',
      icon: BookOpenIcon,
      link: '/resources',
      buttonText: 'Browse Resources',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Emergency Drills',
      description: 'Practice emergency procedures and response protocols',
      icon: ShieldCheckIcon,
      link: '/drills',
      buttonText: 'Practice Drills',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Student!</h1>
        <p className="text-gray-600">Continue your disaster preparedness learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Quick Dial */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-red-800">Emergency Quick Dial</h2>
          <Link 
            to="/resources"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View All Contacts →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyNumbers.map((contact, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg border border-red-100">
              <div>
                <h3 className="font-medium text-gray-900">{contact.label}</h3>
                <p className={`text-xl font-bold ${contact.color}`}>{contact.number}</p>
              </div>
              <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                <PhoneIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Modules */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-500">{module.type}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{module.progress}% complete</p>
                  </div>
                </div>
                <Link 
                  to="/modules"
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Resources */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Quick Access Resources</h2>
            <Link 
              to="/resources"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Resources →
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <DocumentTextIcon className="h-8 w-8 text-red-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Emergency Kit Checklist</h3>
                <p className="text-sm text-gray-500">Essential items guide</p>
              </div>
              <Link 
                to="/resources"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View
              </Link>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <PuzzlePieceIcon className="h-8 w-8 text-purple-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Disaster Master Game</h3>
                <p className="text-sm text-gray-500">Interactive training</p>
              </div>
              <a 
                href="https://www.ready.gov/kids/games/data/dm-english/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Play
              </a>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <PhoneIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Emergency Contacts</h3>
                <p className="text-sm text-gray-500">Quick dial numbers</p>
              </div>
              <Link 
                to="/resources"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portals.map((portal, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-lg border-2 ${portal.color} p-6 hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <portal.icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{portal.title}</h3>
                <p className="text-gray-600 mb-4">{portal.description}</p>
                <Link
                  to={portal.link}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {portal.buttonText}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};