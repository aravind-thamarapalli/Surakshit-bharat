import React from 'react';
import { StatCard } from '../Dashboard/StatCard';
import { upcomingDrills, moduleCompletionData } from '../../data/mockData';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  ChartBarIcon,
  PlusIcon,
  DocumentTextIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TeacherDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Ms. Anya Sharma!</h1>
        <p className="text-gray-600">Your central hub for managing disaster preparedness education</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Students Managed"
          value="120"
          subtitle="Across all classes"
          icon={UserGroupIcon}
          color="blue"
          trend="up"
          trendValue="5%"
        />
        <StatCard
          title="Courses Taught"
          value="3"
          subtitle="Active this semester"
          icon={AcademicCapIcon}
          color="green"
        />
        <StatCard
          title="Avg. Completion Rate"
          value="85%"
          subtitle="Student progress"
          icon={ChartBarIcon}
          color="purple"
          trend="up"
          trendValue="12%"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Lesson Plan
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Student Resources
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
            <UsersIcon className="h-5 w-5 mr-2" />
            New Student Roster
          </button>
        </div>
      </div>

      {/* Lesson Planning & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Planning & Resources</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Earthquake Preparedness Basics</h4>
                  <p className="text-sm text-gray-500">Individual</p>
                </div>
                <span className="text-xs text-gray-400">Published</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">First Aid for Minor Injuries</h4>
                  <p className="text-sm text-gray-500">Individual</p>
                </div>
                <span className="text-xs text-gray-400">In Review</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Understanding Weather Alerts</h4>
                  <p className="text-sm text-gray-500">Individual</p>
                </div>
                <span className="text-xs text-gray-400">Draft</span>
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
              <div>
                <h4 className="font-medium text-gray-900">Psychological Resilience After Disasters</h4>
                <p className="text-sm text-gray-500">Individual</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Disaster Drills</h3>
          <div className="space-y-4">
            {upcomingDrills.map((drill) => (
              <div key={drill.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{drill.title}</h4>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {drill.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{drill.type}</p>
                <p className="text-sm text-gray-500">
                  {drill.date.toLocaleDateString()} at {drill.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {drill.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Performance Analytics */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Performance Analytics</h3>
        <p className="text-sm text-gray-600 mb-6">Module Completion</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completion.0" fill="#22c55e" />
              <Bar dataKey="completion.1" fill="#3b82f6" />
              <Bar dataKey="completion.2" fill="#f59e0b" />
              <Bar dataKey="completion.3" fill="#ef4444" />
              <Bar dataKey="completion.4" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Psychosocial Support Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coping with Stress Teacher's Guide</h3>
          <p className="text-sm text-gray-600 mb-4">Access Resource</p>
          <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-200">
            Access Resource
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Emotional Support Handbook</h3>
          <p className="text-sm text-gray-600 mb-4">Access Resource</p>
          <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-200">
            Access Resource
          </button>
        </div>
      </div>
    </div>
  );
};