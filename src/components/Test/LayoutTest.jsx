import React from 'react';

const LayoutTest = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Layout Test Page</h1>
        <p className="text-gray-600 mb-4">
          This page tests the layout structure to ensure proper spacing and navigation positioning.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Desktop Layout</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Navigation: Fixed sidebar (320px width)</li>
              <li>• Header: Fixed top (64px height)</li>
              <li>• Content: Left margin 320px, top padding 64px</li>
              <li>• No overlap between elements</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Mobile Layout</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Navigation: Slide-in overlay</li>
              <li>• Header: Full width with menu button</li>
              <li>• Content: Full width below header</li>
              <li>• Backdrop when nav is open</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Responsive Breakpoints</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Mobile: &lt; 1024px (lg)</li>
              <li>• Desktop: ≥ 1024px (lg)</li>
              <li>• Navigation auto-hidden on mobile</li>
              <li>• Menu button only on mobile</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Layout Dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Header</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Height: 64px (h-16)</li>
              <li>Position: Fixed top</li>
              <li>Z-index: 40</li>
              <li>Full width</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Navigation</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Width: 320px (w-80)</li>
              <li>Height: calc(100vh - 64px)</li>
              <li>Position: Fixed left</li>
              <li>Top: 64px</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Area</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            This content should be properly positioned without being hidden behind the navigation or header.
          </p>
          
          <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">📐</div>
              <p className="text-lg font-medium text-gray-900">Content Area</p>
              <p className="text-sm text-gray-600">Properly positioned and accessible</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📄</div>
                <p className="text-sm font-medium">Item {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">⚠️ Layout Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Desktop (≥1024px)</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✅ Navigation visible by default</li>
              <li>✅ Content starts at 320px from left</li>
              <li>✅ No hamburger menu button</li>
              <li>✅ Header spans full width</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Mobile (&lt;1024px)</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✅ Navigation hidden by default</li>
              <li>✅ Content uses full width</li>
              <li>✅ Hamburger menu button visible</li>
              <li>✅ Backdrop when nav is open</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-96 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Scroll Test Area</h2>
        <p className="text-gray-600 mb-4">
          This section tests scrolling behavior. The navigation should remain fixed while content scrolls.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded border">
              <h3 className="font-medium">Section {i + 1}</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutTest;