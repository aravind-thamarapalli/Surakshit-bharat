import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const getBreadcrumbs = (pathname) => {
    if (customBreadcrumbs) return customBreadcrumbs;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', href: '/', icon: HomeIcon }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      const breadcrumbMap = {
        '/modules': 'Learning Modules',
        '/drills': 'Emergency Drills',
        '/resources': 'Resource Library',
        '/community': 'Community Hub',
        '/student': 'Student Portal',
        '/teacher': 'Teacher Dashboard',
        '/admin': 'Admin Dashboard',
        '/profile': 'Profile Settings'
      };
      
      // Handle dynamic routes like /modules/earthquake
      const basePath = `/${pathSegments[0]}`;
      if (breadcrumbMap[basePath] && index === 0) {
        breadcrumbs.push({ name: breadcrumbMap[basePath], href: basePath });
      }
      
      // Add sub-page breadcrumbs
      if (index > 0) {
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.push({ name: title, href: currentPath });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              )}
              <NavLink
                to={crumb.href}
                className={`flex items-center hover:text-green-600 transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 font-medium cursor-default'
                    : 'text-gray-500 hover:text-green-600'
                }`}
                onClick={(e) => {
                  if (index === breadcrumbs.length - 1) {
                    e.preventDefault();
                  }
                }}
              >
                {crumb.icon && (
                  <crumb.icon className="h-4 w-4 mr-1" />
                )}
                {crumb.name}
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};