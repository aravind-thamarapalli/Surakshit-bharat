import React from 'react';
import { StatCard } from '../Dashboard/StatCard';
import { recentActivities } from '../../data/mockData';
import { 
  UsersIcon, 
  ChartBarIcon, 
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const platformData = [
  { name: 'Active Users', value: 85 },
  { name: 'Inactive Users', value: 15 }
];

const COLORS = ['#22c55e', '#d1d5db'];

const performanceData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 85 },
  { name: 'Apr', value: 78 },
  { name: 'May', value: 88 }
];

export const AdminDashboard = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'Failed':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard Overview</h1>
        <p className="text-gray-600">Centralized control panel for system management, monitoring key metrics, and ensuring platform compliance.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Registrations This Year"
          value="2.5K"
          icon={UsersIcon}
          color="blue"
          trend="up"
          trendValue="15%"
        />
        <StatCard
          title="Drill Participation Rate"
          value="78%"
          icon={ChartBarIcon}
          color="green"
        />
        <StatCard
          title="Module Completion Level"
          value="324"
          icon={AcademicCapIcon}
          color="purple"
        />
        <StatCard
          title="User Satisfaction"
          value="4.8"
          subtitle="Out of 5.0"
          icon={ChartBarIcon}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Platform Usage Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform User Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Platform Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Integrations & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portal Integrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">MS Student Portal Integration</h4>
                <p className="text-sm text-gray-500">Student Portal → Core API</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Government Compliance API</h4>
                <p className="text-sm text-gray-500">Compliance → Government Portal</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Pending
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h3>
          <div className="space-y-3">
            {recentActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                {getStatusIcon(activity.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.type}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400">
                    {activity.user} • {activity.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activity.status === 'Success' ? 'bg-green-100 text-green-800' :
                  activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Reporting Hub */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprehensive Reporting Hub</h3>
        <p className="text-gray-600 mb-6">Generate detailed reports on user progress, module completion, and engagement metrics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Student Progress Report</h4>
            <p className="text-sm text-gray-500 mb-4">Comprehensive overview of individual student learning progress.</p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
              Generate Report
            </button>
          </div>
          <div className="border rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Drill Performance Analysis</h4>
            <p className="text-sm text-gray-500 mb-4">Analyze drill participation and effectiveness metrics.</p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
              Generate Report
            </button>
          </div>
          <div className="border rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Module Completion Statistics</h4>
            <p className="text-sm text-gray-500 mb-4">Track module engagement and completion rates.</p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};