import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RouteTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const testRoutes = [
    { path: '/', label: 'Home' },
    { path: '/student', label: 'Student Portal' },
    { path: '/modules', label: 'Learning Modules' },
    { path: '/community', label: 'Community Hub' },
    { path: '/drills', label: 'Emergency Drills' },
    { path: '/resources', label: 'Resource Library' },
  ];

  const handleProgrammaticNavigation = (path) => {
    console.log('Navigating programmatically to:', path);
    navigate(path);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Route Testing Component</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold text-blue-900 mb-2">Current Route Information</h2>
        <p><strong>Pathname:</strong> {location.pathname}</p>
        <p><strong>Search:</strong> {location.search}</p>
        <p><strong>Hash:</strong> {location.hash}</p>
        <p><strong>State:</strong> {JSON.stringify(location.state)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-4 text-gray-900">Link Navigation (Declarative)</h2>
          <div className="space-y-2">
            {testRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`block px-3 py-2 rounded transition-colors ${
                  location.pathname === route.path
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                {route.label} ({route.path})
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-4 text-gray-900">Programmatic Navigation</h2>
          <div className="space-y-2">
            {testRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleProgrammaticNavigation(route.path)}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  location.pathname === route.path
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-600 hover:bg-green-50 border border-green-200'
                }`}
              >
                Navigate to {route.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="font-semibold text-yellow-900 mb-2">Routing Test Instructions</h2>
        <ol className="list-decimal list-inside space-y-1 text-yellow-800">
          <li>Try clicking the links above (declarative navigation)</li>
          <li>Try the programmatic navigation buttons</li>
          <li>Check if URL changes in browser address bar</li>
          <li>Try refreshing the page on different routes</li>
          <li>Check browser dev tools console for any errors</li>
        </ol>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="font-semibold text-red-900 mb-2">Common Routing Issues</h2>
        <ul className="list-disc list-inside space-y-1 text-red-800">
          <li><strong>Routes work on refresh but not on navigation:</strong> Check if BrowserRouter is properly configured</li>
          <li><strong>Routes work on navigation but not on refresh:</strong> Server needs historyApiFallback configuration</li>
          <li><strong>Some routes don't work:</strong> Check for typos in route definitions or missing components</li>
          <li><strong>Protected routes redirect unexpectedly:</strong> Check authentication state and loading states</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteTest;