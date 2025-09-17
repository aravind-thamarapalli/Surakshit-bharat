import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  VideoCameraIcon, 
  PhotoIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

export const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const emergencyContacts = [
    {
      id: 1,
      name: 'National Emergency Services',
      number: '112',
      type: 'Emergency',
      description: 'Fire, Police, Medical emergencies'
    },
    {
      id: 2,
      name: 'Disaster Management Authority',
      number: '+91-11-26701728',
      type: 'Disaster',
      description: 'Natural disaster response and coordination'
    },
    {
      id: 3,
      name: 'School Emergency Coordinator',
      number: '+91 123-4567',
      type: 'School',
      description: 'Internal emergency response team'
    },
    {
      id: 4,
      name: 'Local Hospital',
      number: '+91 987-6543',
      type: 'Medical',
      description: 'Emergency medical services'
    },
    {
      id: 5,
      name: 'Weather Alert Service',
      number: '+91-555-246-8135',
      type: 'Weather',
      description: 'Severe weather warnings and updates'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Emergency Evacuation Plan Template',
      type: 'document',
      category: 'Planning',
      format: 'PDF',
      size: '2.4 MB',
      downloadUrl: '#',
      description: 'Comprehensive template for creating building evacuation plans',
      dateAdded: '2024-01-10',
      downloads: 245
    },
    {
      id: 2,
      title: 'Flood Safety Procedures Video',
      type: 'video',
      category: 'Training',
      format: 'MP4',
      size: '45.2 MB',
      downloadUrl: '#',
      description: 'Step-by-step flood response training video',
      dateAdded: '2024-01-08',
      downloads: 156
    },
    {
      id: 3,
      title: 'Emergency Kit Checklist',
      type: 'document',
      category: 'Preparation',
      format: 'PDF',
      size: '1.1 MB',
      downloadUrl: '#',
      description: 'Complete checklist for emergency preparedness kits',
      dateAdded: '2024-01-12',
      downloads: 389
    },
    {
      id: 4,
      title: 'Fire Drill Instructions Poster',
      type: 'image',
      category: 'Training',
      format: 'PNG',
      size: '3.7 MB',
      downloadUrl: '#',
      description: 'Visual guide for fire evacuation procedures',
      dateAdded: '2024-01-05',
      downloads: 178
    },
    {
      id: 5,
      title: 'Earthquake Response Guide',
      type: 'document',
      category: 'Training',
      format: 'PDF',
      size: '5.8 MB',
      downloadUrl: '#',
      description: 'Comprehensive guide to earthquake preparedness and response',
      dateAdded: '2024-01-15',
      downloads: 267
    },
    {
      id: 6,
      title: 'CPR Training Video Series',
      type: 'video',
      category: 'Medical',
      format: 'MP4',
      size: '120.5 MB',
      downloadUrl: '#',
      description: 'Complete CPR and first aid training videos',
      dateAdded: '2024-01-03',
      downloads: 445
    },
    {
      id: 7,
      title: 'Disaster Master Interactive Game',
      type: 'interactive',
      category: 'Interactive',
      format: 'Web App',
      size: 'Online',
      downloadUrl: 'https://www.ready.gov/kids/games/data/dm-english/index.html',
      description: 'Interactive game with 7 disaster scenarios: wildfire, tornado, hurricane, home fire, winter storm, tsunami/earthquake, and thunderstorm. Make decisions to become a Disaster Master!',
      dateAdded: '2024-01-16',
      downloads: 89,
      gameUrl: 'https://www.ready.gov/kids/games/data/dm-english/index.html',
      provider: 'Ready.gov',
      levels: [
        'Wildfire Response',
        'Tornado Safety', 
        'Hurricane/Blackout',
        'Home Fire Safety',
        'Winter Storm/Extreme Cold',
        'Tsunami/Earthquake',
        'Thunderstorm/Lightning',
        'The Hot Seat Challenge'
      ]
    }
  ];

  const categories = ['All', 'Planning', 'Training', 'Preparation', 'Medical', 'Interactive'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    // Handle tab filtering with special case for interactive
    let matchesTab = activeTab === 'all';
    if (!matchesTab) {
      if (activeTab === 'interactive') {
        matchesTab = resource.type === 'interactive';
      } else {
        matchesTab = resource.type === activeTab.slice(0, -1); // remove 's' from plural for other types
      }
    }
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const getResourceIcon = (type, format) => {
    switch (type) {
      case 'document':
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
      case 'video':
        return <VideoCameraIcon className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <PhotoIcon className="h-8 w-8 text-green-500" />;
      case 'interactive':
        return <PuzzlePieceIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'Emergency':
        return '🚨';
      case 'Disaster':
        return '🌪️';
      case 'School':
        return '🏫';
      case 'Medical':
        return '🏥';
      case 'Weather':
        return '🌦️';
      default:
        return '📞';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'documents', label: 'Documents', count: resources.filter(r => r.type === 'document').length },
    { id: 'videos', label: 'Videos', count: resources.filter(r => r.type === 'video').length },
    { id: 'images', label: 'Images', count: resources.filter(r => r.type === 'image').length },
    { id: 'interactive', label: 'Interactive Games', count: resources.filter(r => r.type === 'interactive').length },
    { id: 'contacts', label: 'Emergency Contacts', count: emergencyContacts.length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
        <p className="text-gray-600">Access emergency preparedness resources, guides, and contact information</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Emergency Contacts Tab */}
      {activeTab === 'contacts' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{getContactIcon(contact.type)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-xl font-bold text-blue-600">{contact.number}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{contact.description}</p>
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mt-3">
                      {contact.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2">
                    <PhoneIcon className="h-4 w-4" />
                    <span>Call Now</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab !== 'contacts' && (
        <div>
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    {getResourceIcon(resource.type, resource.format)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="uppercase font-medium">{resource.format}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                  {/* Game Levels for Interactive Resources */}
                  {resource.type === 'interactive' && resource.levels && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Game Levels:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {resource.levels.slice(0, 4).map((level, index) => (
                          <div key={index} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded text-center">
                            Level {index + 1}
                          </div>
                        ))}
                      </div>
                      {resource.levels.length > 4 && (
                        <p className="text-xs text-gray-500 mt-1">+{resource.levels.length - 4} more levels</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <TagIcon className="h-4 w-4" />
                      <span>{resource.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{resource.downloads} {resource.type === 'interactive' ? 'plays' : 'downloads'}</span>
                    {resource.type === 'interactive' ? (
                      <a
                        href={resource.gameUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 flex items-center space-x-2"
                      >
                        <PuzzlePieceIcon className="h-4 w-4" />
                        <span>Play Game</span>
                      </a>
                    ) : (
                      <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center space-x-2">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};