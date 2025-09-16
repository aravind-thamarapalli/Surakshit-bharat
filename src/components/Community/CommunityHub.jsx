import React, { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FireIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [likedPosts, setLikedPosts] = useState(new Set([1, 3]));

  const discussions = [
    {
      id: 1,
      title: 'Best Practices for School Earthquake Drills',
      author: 'Sarah Johnson',
      avatar: '👩‍🏫',
      category: 'Emergency Drills',
      replies: 12,
      likes: 24,
      lastActivity: '2 hours ago',
      content: 'What are your top tips for conducting effective earthquake drills? I\'ve noticed students sometimes panic during the alarm...',
      tags: ['earthquake', 'school-safety', 'drills'],
      isHot: true
    },
    {
      id: 2,
      title: 'Community Emergency Response Team Formation',
      author: 'Mike Chen',
      avatar: '👨‍🚒',
      category: 'Community Prep',
      replies: 8,
      likes: 15,
      lastActivity: '4 hours ago',
      content: 'Looking to start a neighborhood emergency response team. Has anyone gone through this process before?',
      tags: ['community', 'response-team', 'organization']
    },
    {
      id: 3,
      title: 'Flood Preparedness in Urban Areas',
      author: 'Dr. Emily Rodriguez',
      avatar: '👩‍⚕️',
      category: 'Natural Disasters',
      replies: 20,
      likes: 35,
      lastActivity: '6 hours ago',
      content: 'Urban flooding presents unique challenges. Let\'s discuss effective preparation strategies for city residents...',
      tags: ['flood', 'urban', 'preparedness'],
      isHot: true
    },
    {
      id: 4,
      title: 'Mental Health Support During Emergencies',
      author: 'Alex Thompson',
      avatar: '👨‍⚕️',
      category: 'Psychological Support',
      replies: 16,
      likes: 28,
      lastActivity: '1 day ago',
      content: 'How do we provide psychological first aid during disaster situations? Sharing resources and experiences...',
      tags: ['mental-health', 'psychological-support', 'trauma']
    }
  ];

  const sharedResources = [
    {
      id: 1,
      title: 'Emergency Communication Plan Template',
      author: 'Jennifer Liu',
      type: 'Document',
      downloads: 156,
      rating: 4.8,
      description: 'Family emergency communication plan template with contact forms',
      uploadDate: '3 days ago'
    },
    {
      id: 2,
      title: 'Disaster Supply Kit Checklist',
      author: 'Robert Kim',
      type: 'Checklist',
      downloads: 203,
      rating: 4.9,
      description: 'Comprehensive 72-hour emergency kit checklist for families',
      uploadDate: '1 week ago'
    },
    {
      id: 3,
      title: 'School Evacuation Route Planner',
      author: 'Maria Santos',
      type: 'Tool',
      downloads: 89,
      rating: 4.6,
      description: 'Interactive tool for planning and mapping school evacuation routes',
      uploadDate: '2 weeks ago'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Community Emergency Preparedness Workshop',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Community Center',
      attendees: 45,
      type: 'Workshop',
      organizer: 'Local Emergency Management'
    },
    {
      id: 2,
      title: 'Virtual Disaster Response Training',
      date: '2024-02-02',
      time: '10:00 AM',
      location: 'Online',
      attendees: 128,
      type: 'Training',
      organizer: 'Red Cross Chapter'
    },
    {
      id: 3,
      title: 'Neighborhood Safety Walk',
      date: '2024-02-10',
      time: '9:00 AM',
      location: 'Riverside District',
      attendees: 23,
      type: 'Community Event',
      organizer: 'Neighborhood Watch'
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Emergency Drills': 'bg-red-100 text-red-800',
      'Community Prep': 'bg-blue-100 text-blue-800',
      'Natural Disasters': 'bg-yellow-100 text-yellow-800',
      'Psychological Support': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: ChatBubbleLeftRightIcon },
    { id: 'resources', label: 'Shared Resources', icon: DocumentTextIcon },
    { id: 'events', label: 'Community Events', icon: UserGroupIcon }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
        <p className="text-gray-600">Connect with others, share knowledge, and collaborate on disaster preparedness</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Active Discussions</p>
              <p className="text-2xl font-bold text-blue-900">{discussions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Community Members</p>
              <p className="text-2xl font-bold text-green-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Shared Resources</p>
              <p className="text-2xl font-bold text-purple-900">{sharedResources.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-yellow-900">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Community Discussions</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Start Discussion</span>
            </button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{discussion.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                          {discussion.isHot && (
                            <span className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              <FireIcon className="h-3 w-3" />
                              <span>Hot</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{discussion.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.lastActivity}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(discussion.category)}`}>
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        {discussion.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(discussion.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          {likedPosts.has(discussion.id) ? (
                            <HeartIconSolid className="h-5 w-5 text-red-500" />
                          ) : (
                            <HeartIcon className="h-5 w-5" />
                          )}
                          <span>{discussion.likes + (likedPosts.has(discussion.id) ? 1 : 0)}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <ChatBubbleLeftRightIcon className="h-5 w-5" />
                          <span>{discussion.replies}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                          <ShareIcon className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Shared Resources</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Share Resource</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>by {resource.author}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {resource.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{resource.downloads} downloads</p>
                    <p>⭐ {resource.rating}</p>
                    <p>{resource.uploadDate}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Community Events</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Create Event</span>
            </button>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                      <p>📍 {event.location}</p>
                      <p>👥 {event.attendees} attending</p>
                      <p>🎯 Organized by {event.organizer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {event.type}
                    </span>
                    <div className="mt-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};