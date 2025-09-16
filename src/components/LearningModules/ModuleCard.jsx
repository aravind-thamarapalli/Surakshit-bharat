import React from 'react';
import { ClockIcon, StarIcon, PlayIcon, VideoCameraIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

export const ModuleCard = ({ module, featured = false, onStartModule }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isVideoModule = module.type === 'video';
  const isGameModule = module.type === 'interactive';

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'border-2 border-green-200' : ''}`}>
      {featured && (
        <div className="bg-green-100 px-3 py-1">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-xs font-medium text-green-800">Featured</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        <img
          src={module.imageUrl}
          alt={module.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Video Module Indicator */}
        {isVideoModule && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
              <PlayIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Game Module Indicator */}
        {isGameModule && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-purple-600 rounded-full p-3 hover:bg-purple-700 transition-colors">
              <PuzzlePieceIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Video Duration Badge */}
        {isVideoModule && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
            {module.duration}
          </div>
        )}
        
        {/* Game Duration Badge */}
        {isGameModule && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
            {module.duration}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
              {module.difficulty}
            </span>
            {isVideoModule && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <VideoCameraIcon className="h-3 w-3 mr-1" />
                Video
              </span>
            )}
            {isGameModule && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <PuzzlePieceIcon className="h-3 w-3 mr-1" />
                Interactive Game
              </span>
            )}
          </div>
          {!isVideoModule && !isGameModule && (
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              {module.duration}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
              <span>Progress</span>
              <span>{module.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${module.completionRate}%` }}
              ></div>
            </div>
          </div>
          <button 
            onClick={() => onStartModule && onStartModule(module)}
            className={`ml-4 px-4 py-2 text-white text-sm font-medium rounded-md transition duration-200 flex items-center space-x-2 ${
              isVideoModule 
                ? 'bg-red-600 hover:bg-red-700'
                : isGameModule
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <PlayIcon className="h-4 w-4" />
            <span>
              {isVideoModule 
                ? (module.completionRate > 0 ? 'Continue Video' : 'Watch Video')
                : isGameModule
                ? (module.completionRate > 0 ? 'Continue Game' : 'Play Game')
                : (module.completionRate > 0 ? 'Continue' : 'Start Learning')
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};