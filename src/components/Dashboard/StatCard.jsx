import React from 'react';

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'green',
  trend,
  trendValue 
}) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {Icon && (
            <div className={`flex items-center justify-center h-8 w-8 rounded-md ${colorClasses[color]}`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              {trend && trendValue && (
                <div className={`ml-2 flex items-baseline text-sm ${trendColors[trend]}`}>
                  <svg className={`self-center flex-shrink-0 h-5 w-5 ${trend === 'up' ? '' : 'transform rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                  {trendValue}
                </div>
              )}
            </dd>
            {subtitle && (
              <dd className="text-sm text-gray-500">{subtitle}</dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};