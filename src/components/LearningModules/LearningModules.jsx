import React, { useState } from 'react';
import { ModuleCard } from './ModuleCard';
import { ModuleViewer } from './ModuleViewer';
import { learningModules, categories } from '../../data/mockData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const LearningModules = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState(new Set());

  const handleStartModule = (module) => {
    setSelectedModule(module);
  };

  const handleModuleComplete = (moduleId) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
  };

  const filteredModules = learningModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredModules = learningModules.filter(module => module.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 bg-green-50 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Explore Our Learning Modules
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Dive into interactive content on disaster preparedness, psychological resilience, and climate 
          awareness to build a safer and more resilient community.
        </p>
        <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200">
          Start Your Learning Journey
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search modules..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Modules */}
      {featuredModules.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredModules.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                featured 
                onStartModule={handleStartModule}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          All Modules
          {selectedCategory !== 'All' && (
            <span className="text-lg text-gray-500 ml-2">- {selectedCategory}</span>
          )}
        </h2>
        
        {filteredModules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No modules found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModules.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                onStartModule={handleStartModule}
              />
            ))}
          </div>
        )}
      </div>

      {/* Module Viewer Modal */}
      {selectedModule && (
        <ModuleViewer
          module={selectedModule}
          onComplete={handleModuleComplete}
          onClose={handleCloseModule}
        />
      )}
    </div>
  );
};