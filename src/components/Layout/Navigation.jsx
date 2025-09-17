import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BookmarkIcon,
  ChevronRightIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const getNavigationForRole = (userRole) => {
  const commonNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon, description: 'Dashboard overview' },
    { name: 'Learning Modules', href: '/modules', icon: ClipboardDocumentListIcon, description: 'Interactive courses and lessons', badge: 3 },
    { name: 'Emergency Drills', href: '/drills', icon: ExclamationTriangleIcon, description: 'Safety training and simulations' },
    { name: 'Resource Library', href: '/resources', icon: DocumentTextIcon, description: 'Downloadable materials and guides' },
    { name: 'Community Hub', href: '/community', icon: UserGroupIcon, description: 'Forums and peer collaboration', badge: 12 },
  ];

  const roleSpecificNavigation = {
    student: [
      { name: 'Student Portal', href: '/student', icon: AcademicCapIcon, description: 'Personal learning dashboard' },
    ],
    teacher: [
      { name: 'Teacher Dashboard', href: '/teacher', icon: UserGroupIcon, description: 'Manage students and content', badge: 5 },
    ],
    admin: [
      { name: 'Admin Dashboard', href: '/admin', icon: Cog6ToothIcon, description: 'System management and analytics', badge: 2 },
      { name: 'Teacher Dashboard', href: '/teacher', icon: UserGroupIcon, description: 'Content and student management' },
    ]
  };

  return [
    ...commonNavigation,
    ...(roleSpecificNavigation[userRole] || roleSpecificNavigation.student)
  ];
};

// Search data for quick access
const getSearchableContent = (userRole) => {
  const baseContent = [
    { title: 'Earthquake Safety', type: 'module', href: '/modules/earthquake' },
    { title: 'Fire Emergency Response', type: 'module', href: '/modules/fire' },
    { title: 'Flood Preparedness', type: 'module', href: '/modules/flood' },
    { title: 'Emergency Kit Checklist', type: 'resource', href: '/resources/emergency-kit' },
    { title: 'Contact Emergency Services', type: 'resource', href: '/resources/contacts' },
    { title: 'Community Discussion', type: 'community', href: '/community/discussion' },
    { title: 'Profile Settings', type: 'profile', href: '/profile' },
  ];

  const roleSpecific = {
    teacher: [
      { title: 'Student Progress', type: 'dashboard', href: '/teacher/progress' },
      { title: 'Create Assignment', type: 'dashboard', href: '/teacher/assignments' },
    ],
    admin: [
      { title: 'User Management', type: 'admin', href: '/admin/users' },
      { title: 'System Analytics', type: 'admin', href: '/admin/analytics' },
    ]
  };

  return [...baseContent, ...(roleSpecific[userRole] || [])];
};

// Get breadcrumb trail
const getBreadcrumbs = (pathname) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', href: '/' }];
  
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const breadcrumbMap = {
      '/modules': 'Learning Modules',
      '/drills': 'Emergency Drills',
      '/resources': 'Resource Library',
      '/community': 'Community Hub',
      '/student': 'Student Portal',
      '/teacher': 'Teacher Dashboard',
      '/admin': 'Admin Dashboard',
      '/profile': 'Profile'
    };
    
    if (breadcrumbMap[currentPath]) {
      breadcrumbs.push({ name: breadcrumbMap[currentPath], href: currentPath });
    }
  });
  
  return breadcrumbs;
};

// Quick access shortcuts based on user activity
const getQuickAccessShortcuts = (userRole) => {
  const shortcuts = {
    student: [
      { name: 'Continue Learning', href: '/modules/current', icon: ClockIcon },
      { name: 'My Progress', href: '/student/progress', icon: AcademicCapIcon },
      { name: 'Bookmarks', href: '/student/bookmarks', icon: BookmarkIcon },
    ],
    teacher: [
      { name: 'Recent Students', href: '/teacher/students', icon: UserGroupIcon },
      { name: 'Pending Reviews', href: '/teacher/reviews', icon: ClockIcon },
      { name: 'Quick Assignment', href: '/teacher/quick-assign', icon: ClipboardDocumentListIcon },
    ],
    admin: [
      { name: 'System Health', href: '/admin/health', icon: ExclamationTriangleIcon },
      { name: 'Recent Users', href: '/admin/recent-users', icon: UserGroupIcon },
      { name: 'Quick Reports', href: '/admin/reports', icon: DocumentTextIcon },
    ]
  };
  
  return shortcuts[userRole] || shortcuts.student;
};

export const Navigation = ({ isOpen, onClose, userRole = 'student' }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  
  const navigation = getNavigationForRole(userRole);
  const searchableContent = getSearchableContent(userRole);
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const quickShortcuts = getQuickAccessShortcuts(userRole);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchableContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery, searchableContent]);

  const handleSearchSelect = (href) => {
    setSearchQuery('');
    setShowSearch(false);
    onClose();
  };
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Navigation sidebar */}
      <nav className={`
        fixed top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
        lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200 lg:z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Breadcrumb Navigation */}
          {breadcrumbs.length > 1 && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center text-sm text-gray-500 overflow-x-auto">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <NavLink
                      to={crumb.href}
                      className="hover:text-green-600 whitespace-nowrap"
                      onClick={() => onClose()}
                    >
                      {crumb.name}
                    </NavLink>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRightIcon className="h-4 w-4 mx-2 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Search Bar */}
          <div className="mb-6 relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search modules, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-60 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <NavLink
                    key={index}
                    to={result.href}
                    onClick={() => handleSearchSelect(result.href)}
                    className="block px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="font-medium text-sm text-gray-900">{result.title}</div>
                    <div className="text-xs text-gray-500 capitalize">{result.type}</div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Shortcuts */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Access</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickShortcuts.map((shortcut) => (
                <NavLink
                  key={shortcut.name}
                  to={shortcut.href}
                  className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                  onClick={() => onClose()}
                >
                  <shortcut.icon className="mr-2 h-4 w-4" />
                  {shortcut.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors group ${
                        isActive
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    onClick={() => onClose()}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      <div>
                        <div>{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 group-hover:text-gray-600">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Notification Center */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Notifications</h3>
              <BellIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <div className="px-3 py-2 rounded-md bg-blue-50 border-l-4 border-blue-400">
                <div className="text-xs font-medium text-blue-800">New module available</div>
                <div className="text-xs text-blue-600">Tsunami Safety Training</div>
              </div>
              {userRole === 'teacher' && (
                <div className="px-3 py-2 rounded-md bg-orange-50 border-l-4 border-orange-400">
                  <div className="text-xs font-medium text-orange-800">Assignment submissions</div>
                  <div className="text-xs text-orange-600">5 pending reviews</div>
                </div>
              )}
              {userRole === 'admin' && (
                <div className="px-3 py-2 rounded-md bg-green-50 border-l-4 border-green-400">
                  <div className="text-xs font-medium text-green-800">System update</div>
                  <div className="text-xs text-green-600">Platform upgraded successfully</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};