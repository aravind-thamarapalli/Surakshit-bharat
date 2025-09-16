import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  FireIcon,
  BookOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export const SmartSearch = ({ userRole = 'student', onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Comprehensive search data
  const searchData = [
    // Learning Modules
    { title: 'Earthquake Safety Basics', type: 'module', category: 'Emergency Response', href: '/modules/earthquake', keywords: ['earthquake', 'tremor', 'safety', 'shelter'] },
    { title: 'Fire Emergency Response', type: 'module', category: 'Emergency Response', href: '/modules/fire', keywords: ['fire', 'evacuation', 'extinguisher', 'smoke'] },
    { title: 'Flood Preparedness', type: 'module', category: 'Natural Disasters', href: '/modules/flood', keywords: ['flood', 'water', 'evacuation', 'sandbags'] },
    { title: 'Tsunami Warning Systems', type: 'module', category: 'Natural Disasters', href: '/modules/tsunami', keywords: ['tsunami', 'warning', 'evacuation', 'coastal'] },
    { title: 'First Aid Training', type: 'module', category: 'Medical Response', href: '/modules/first-aid', keywords: ['first aid', 'medical', 'cpr', 'bandage'] },
    
    // Resources
    { title: 'Emergency Kit Checklist', type: 'resource', category: 'Preparedness', href: '/resources/emergency-kit', keywords: ['kit', 'supplies', 'checklist', 'preparation'] },
    { title: 'Emergency Contact Numbers', type: 'resource', category: 'Contact Info', href: '/resources/contacts', keywords: ['contact', 'phone', 'emergency', 'help'] },
    { title: 'Evacuation Route Maps', type: 'resource', category: 'Maps', href: '/resources/evacuation-maps', keywords: ['map', 'route', 'evacuation', 'exit'] },
    { title: 'Family Emergency Plan Template', type: 'resource', category: 'Planning', href: '/resources/family-plan', keywords: ['family', 'plan', 'template', 'preparation'] },
    
    // Community
    { title: 'Discussion Forums', type: 'community', category: 'Discussion', href: '/community/forums', keywords: ['forum', 'discussion', 'chat', 'community'] },
    { title: 'Local Emergency Groups', type: 'community', category: 'Groups', href: '/community/groups', keywords: ['group', 'local', 'volunteer', 'community'] },
    { title: 'Success Stories', type: 'community', category: 'Stories', href: '/community/stories', keywords: ['story', 'success', 'experience', 'share'] },
    
    // Role-specific content
    ...(userRole === 'teacher' ? [
      { title: 'Student Progress Reports', type: 'dashboard', category: 'Reports', href: '/teacher/reports', keywords: ['progress', 'report', 'student', 'performance'] },
      { title: 'Assignment Creator', type: 'tool', category: 'Tools', href: '/teacher/assignments', keywords: ['assignment', 'create', 'homework', 'task'] },
      { title: 'Class Management', type: 'dashboard', category: 'Management', href: '/teacher/classes', keywords: ['class', 'manage', 'student', 'group'] }
    ] : []),
    
    ...(userRole === 'admin' ? [
      { title: 'User Management', type: 'admin', category: 'Management', href: '/admin/users', keywords: ['user', 'manage', 'account', 'role'] },
      { title: 'System Analytics', type: 'admin', category: 'Analytics', href: '/admin/analytics', keywords: ['analytics', 'data', 'statistics', 'metrics'] },
      { title: 'Content Moderation', type: 'admin', category: 'Moderation', href: '/admin/moderation', keywords: ['content', 'moderate', 'review', 'approve'] }
    ] : [])
  ];

  // Search function with intelligent matching
  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const categoryMatch = item.category.toLowerCase().includes(query);
      const keywordMatch = item.keywords.some(keyword => keyword.includes(query));
      const typeMatch = item.type.toLowerCase().includes(query);
      
      return titleMatch || categoryMatch || keywordMatch || typeMatch;
    }).slice(0, 8); // Limit results
  };

  // Handle search
  useEffect(() => {
    const results = performSearch(query);
    setResults(results);
  }, [query]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const saveRecentSearch = (searchTerm) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearchSelect = (item) => {
    saveRecentSearch(query);
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getTypeIcon = (type) => {
    const icons = {
      module: BookOpenIcon,
      resource: ClockIcon,
      community: UserGroupIcon,
      dashboard: FireIcon,
      tool: FireIcon,
      admin: FireIcon
    };
    return icons[type] || BookOpenIcon;
  };

  const getTypeColor = (type) => {
    const colors = {
      module: 'text-blue-600 bg-blue-50',
      resource: 'text-green-600 bg-green-50',
      community: 'text-purple-600 bg-purple-50',
      dashboard: 'text-orange-600 bg-orange-50',
      tool: 'text-red-600 bg-red-50',
      admin: 'text-gray-600 bg-gray-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search modules, resources, community..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {query && results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Search Results
              </div>
              {results.map((result, index) => {
                const Icon = getTypeIcon(result.type);
                return (
                  <NavLink
                    key={index}
                    to={result.href}
                    onClick={() => handleSearchSelect(result)}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-md group"
                  >
                    <div className={`p-1.5 rounded-md ${getTypeColor(result.type)} mr-3`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 group-hover:text-green-600">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.category} • {result.type}
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <div className="text-sm">No results found for "{query}"</div>
              <div className="text-xs mt-1">Try searching for modules, resources, or community content</div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Recent Searches
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                >
                  <ClockIcon className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Quick Suggestions */}
          {!query && recentSearches.length === 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Quick Suggestions
              </div>
              {['earthquake safety', 'emergency kit', 'first aid', 'evacuation routes'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};