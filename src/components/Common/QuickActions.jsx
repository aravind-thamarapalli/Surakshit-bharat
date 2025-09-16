import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  PlusIcon, 
  ClockIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export const QuickActions = ({ userRole = 'student' }) => {
  const getQuickActions = (role) => {
    const actions = {
      student: [
        {
          name: 'Continue Learning',
          description: 'Resume your last module',
          href: '/modules/continue',
          icon: ClockIcon,
          color: 'green'
        },
        {
          name: 'Take Emergency Drill',
          description: 'Practice emergency response',
          href: '/drills/practice',
          icon: AcademicCapIcon,
          color: 'blue'
        },
        {
          name: 'View Progress',
          description: 'Check your learning stats',
          href: '/student/progress',
          icon: ChartBarIcon,
          color: 'purple'
        }
      ],
      teacher: [
        {
          name: 'Create Assignment',
          description: 'Add new learning content',
          href: '/teacher/assignments/new',
          icon: PlusIcon,
          color: 'green'
        },
        {
          name: 'Student Progress',
          description: 'Monitor class performance',
          href: '/teacher/students',
          icon: UserGroupIcon,
          color: 'blue'
        },
        {
          name: 'Resource Upload',
          description: 'Add educational materials',
          href: '/teacher/resources/upload',
          icon: DocumentTextIcon,
          color: 'orange'
        }
      ],
      admin: [
        {
          name: 'System Overview',
          description: 'Platform health and metrics',
          href: '/admin/overview',
          icon: ChartBarIcon,
          color: 'blue'
        },
        {
          name: 'User Management',
          description: 'Manage user accounts',
          href: '/admin/users',
          icon: UserGroupIcon,
          color: 'green'
        },
        {
          name: 'Content Review',
          description: 'Review submitted content',
          href: '/admin/content',
          icon: DocumentTextIcon,
          color: 'orange'
        }
      ]
    };

    return actions[role] || actions.student;
  };

  const actions = getQuickActions(userRole);
  
  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
      blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700'
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <NavLink
            key={action.name}
            to={action.href}
            className={`block p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${getColorClasses(action.color)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <action.icon className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{action.name}</h3>
                <p className="text-sm opacity-75 mt-1">{action.description}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};