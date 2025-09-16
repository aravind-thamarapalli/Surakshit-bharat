import React from 'react';
import { StatCard } from '../Dashboard/StatCard';
import { learningModules } from '../../data/mockData';
import { 
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export const StudentPortal = () => {
  const completedModules = learningModules.filter(m => m.completionRate === 100).length;
  const inProgressModules = learningModules.filter(m => m.completionRate > 0 && m.completionRate < 100).length;
  const totalCompletionRate = Math.round(learningModules.reduce((acc, m) => acc + m.completionRate, 0) / learningModules.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
        <p className="text-gray-600">Track your learning progress and access disaster preparedness resources</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Modules Completed"
          value={completedModules}
          subtitle={`Out of ${learningModules.length} modules`}
          icon={TrophyIcon}
          color="green"
        />
        <StatCard
          title="In Progress"
          value={inProgressModules}
          subtitle="Currently learning"
          icon={ClockIcon}
          color="blue"
        />
        <StatCard
          title="Overall Progress"
          value={`${totalCompletionRate}%`}
          subtitle="Completion rate"
          icon={ChartBarIcon}
          color="purple"
          trend="up"
          trendValue="5%"
        />
        <StatCard
          title="Learning Streak"
          value="7"
          subtitle="Days in a row"
          icon={AcademicCapIcon}
          color="yellow"
        />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
          <div className="space-y-4">
            {learningModules.slice(0, 3).map((module) => (
              <div key={module.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{module.title}</h4>
                  <span className="text-sm text-green-600">{module.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${module.completionRate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{module.category} • {module.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrophyIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Completed Flood Preparedness</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">7-day Learning Streak</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <ChartBarIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">50% Overall Progress</p>
                <p className="text-xs text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Modules */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningModules.slice(0, 3).map((module) => (
            <div key={module.id} className="border rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
              <img
                src={module.imageUrl}
                alt={module.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{module.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{module.duration}</span>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-200">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};