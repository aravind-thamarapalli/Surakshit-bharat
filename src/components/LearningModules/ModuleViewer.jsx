import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, PlayIcon, QuestionMarkCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

export const ModuleViewer = ({ module, onComplete, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  // Check if this is a video module
  const isVideoModule = module.type === 'video' && module.videoId;
  
  // Check if this is an interactive game module
  const isGameModule = module.type === 'interactive' && module.gameUrl;

  // Create dynamic module content based on module type
  const moduleContent = isGameModule ? {
    sections: [
      {
        type: 'game',
        title: module.title,
        content: {
          gameUrl: module.gameUrl,
          description: module.description,
          duration: module.duration,
          difficulty: module.difficulty,
          provider: module.provider || 'Ready.gov',
          levels: module.levels || []
        }
      },
      {
        type: 'text',
        title: 'Game Learning Objectives',
        content: {
          text: `
            <h3>What You'll Learn Playing This Game</h3>
            <p>The Disaster Master game teaches essential emergency preparedness through interactive scenarios:</p>
            <ul>
              <li><strong>Quick Decision Making:</strong> Practice making rapid, informed decisions during emergencies</li>
              <li><strong>Scenario Recognition:</strong> Learn to identify different disaster types and appropriate responses</li>
              <li><strong>Safety Protocols:</strong> Master step-by-step safety procedures for various emergencies</li>
              <li><strong>Resource Management:</strong> Understand how to use available resources effectively during crises</li>
              <li><strong>Risk Assessment:</strong> Develop skills to evaluate danger levels and choose safe actions</li>
            </ul>
            
            <h3>Game Features</h3>
            <ul>
              <li><strong>7 Disaster Scenarios:</strong> Wildfire, tornado, hurricane, home fire, winter storm, tsunami/earthquake, and thunderstorm</li>
              <li><strong>Progressive Difficulty:</strong> Each level builds on previous knowledge</li>
              <li><strong>Interactive Story:</strong> Your choices determine the outcome</li>
              <li><strong>Educational Feedback:</strong> Learn from both correct and incorrect choices</li>
              <li><strong>Graphic Novel Elements:</strong> Print chapters as you complete levels</li>
            </ul>
            
            <h3>Tips for Success</h3>
            <ul>
              <li>Read each scenario carefully before making decisions</li>
              <li>Think about real-world emergency procedures you've learned</li>
              <li>Don't be afraid to replay levels to improve your score</li>
              <li>Print and share your graphic novel chapters with family</li>
            </ul>
          `
        }
      },
      {
        type: 'quiz',
        title: 'Game Reflection Quiz',
        content: {
          questions: [
            {
              id: 1,
              question: 'What is the most important skill the Disaster Master game helps develop?',
              options: ['Gaming skills', 'Quick decision making in emergencies', 'Computer literacy', 'Reading comprehension'],
              correct: 1,
              explanation: 'The game specifically focuses on developing quick, informed decision-making skills during emergency situations.'
            },
            {
              id: 2,
              question: 'How many disaster scenarios does the complete game include?',
              options: ['5 scenarios', '6 scenarios', '7 scenarios plus bonus', '10 scenarios'],
              correct: 2,
              explanation: 'The game includes 7 main disaster scenarios plus "The Hot Seat" bonus challenge.'
            },
            {
              id: 3,
              question: 'What can you print out as you progress through the game?',
              options: ['Certificates', 'Score sheets', 'Graphic novel chapters', 'Emergency plans'],
              correct: 2,
              explanation: 'The game allows you to print chapters of a graphic novel that tell your disaster preparedness story.'
            }
          ]
        }
      }
    ]
  } : isVideoModule ? {
    sections: [
      {
        type: 'video',
        title: module.title,
        content: {
          videoUrl: `https://www.youtube.com/embed/${module.videoId}?rel=0&modestbranding=1&showinfo=0`,
          description: module.description,
          duration: module.duration,
          videoId: module.videoId
        }
      },
      {
        type: 'text',
        title: 'Key Learning Points',
        content: {
          text: `
            <h3>What You'll Learn</h3>
            <p>This video module covers essential concepts in disaster preparedness:</p>
            <ul>
              <li><strong>Emergency Planning:</strong> How to create and maintain emergency response plans</li>
              <li><strong>Risk Assessment:</strong> Identifying potential hazards in your area</li>
              <li><strong>Resource Management:</strong> Organizing supplies and equipment for emergencies</li>
              <li><strong>Communication Strategies:</strong> Staying connected during disasters</li>
              <li><strong>Recovery Planning:</strong> Steps to take after an emergency event</li>
            </ul>
            
            <h3>Action Items</h3>
            <p>After watching this video, consider these action steps:</p>
            <ul>
              <li>Review your current emergency preparedness plan</li>
              <li>Update your emergency contact list</li>
              <li>Check your emergency supply kit</li>
              <li>Practice your emergency procedures with family members</li>
              <li>Connect with local emergency services and community groups</li>
            </ul>
          `
        }
      },
      {
        type: 'quiz',
        title: 'Video Comprehension Check',
        content: {
          questions: [
            {
              id: 1,
              question: 'What is the first step in emergency preparedness?',
              options: ['Buy supplies', 'Create a plan', 'Learn first aid', 'Install alarms'],
              correct: 1,
              explanation: 'Creating a comprehensive emergency plan is the foundation of all preparedness efforts.'
            },
            {
              id: 2,
              question: 'How often should you review and update your emergency plan?',
              options: ['Once a year', 'Every 6 months', 'Every 3 months', 'Monthly'],
              correct: 1,
              explanation: 'Emergency plans should be reviewed every 6 months or when circumstances change.'
            },
            {
              id: 3,
              question: 'What is the most important factor in emergency communication?',
              options: ['Having multiple devices', 'Redundancy and backup plans', 'Latest technology', 'Speed'],
              correct: 1,
              explanation: 'Having redundant communication methods ensures you can stay connected even if primary systems fail.'
            }
          ]
        }
      }
    ]
  } : {
    // Default module content structure for non-video modules
    sections: [
      {
        type: 'video',
        title: 'Introduction to Flood Safety',
        content: {
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample video
          description: 'Learn the basics of flood preparedness and safety measures.',
          duration: '5 minutes'
        }
      },
      {
        type: 'text',
        title: 'Understanding Flood Risks',
        content: {
          text: `
            <h3>What Causes Floods?</h3>
            <p>Floods can occur due to various factors:</p>
            <ul>
              <li><strong>Heavy Rainfall:</strong> Prolonged or intense rainfall that overwhelms drainage systems</li>
              <li><strong>River Overflow:</strong> When rivers exceed their capacity due to snowmelt or heavy rains</li>
              <li><strong>Dam Failure:</strong> Structural failure of dams or levees</li>
              <li><strong>Coastal Storms:</strong> Storm surges from hurricanes or cyclones</li>
            </ul>
            
            <h3>Flood Warning Signs</h3>
            <p>Be alert for these warning signs:</p>
            <ul>
              <li>Rising water levels in streams, rivers, or low-lying areas</li>
              <li>Heavy rainfall for extended periods</li>
              <li>Weather alerts and flood warnings from authorities</li>
              <li>Unusual animal behavior (animals seeking higher ground)</li>
            </ul>
          `
        }
      },
      {
        type: 'interactive',
        title: 'Emergency Kit Checklist',
        content: {
          items: [
            'Water (1 gallon per person per day for 3 days)',
            'Non-perishable food (3-day supply)',
            'Battery-powered radio',
            'Flashlight and extra batteries',
            'First aid kit',
            'Whistle for signaling help',
            'Dust masks and plastic sheeting',
            'Moist towelettes and garbage bags',
            'Wrench or pliers to turn off utilities',
            'Manual can opener',
            'Local maps',
            'Cell phone with chargers'
          ]
        }
      },
      {
        type: 'quiz',
        title: 'Knowledge Check',
        content: {
          questions: [
            {
              id: 1,
              question: 'How much water should you store per person per day in an emergency kit?',
              options: ['½ gallon', '1 gallon', '2 gallons', '3 gallons'],
              correct: 1,
              explanation: 'The recommended amount is 1 gallon per person per day for drinking, cooking, and sanitation.'
            },
            {
              id: 2,
              question: 'Which of these is NOT a common cause of floods?',
              options: ['Heavy rainfall', 'Earthquake', 'Dam failure', 'River overflow'],
              correct: 1,
              explanation: 'While earthquakes can cause tsunamis, they are not a direct cause of regular flooding.'
            },
            {
              id: 3,
              question: 'What should you do if you encounter flooding while driving?',
              options: ['Drive through quickly', 'Turn around and find another route', 'Stop and wait', 'Get out and walk'],
              correct: 1,
              explanation: 'Turn Around, Don\'t Drown! Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle.'
            }
          ]
        }
      }
    ]
  };

  const handleSectionComplete = () => {
    setCompletedSections(prev => new Set([...prev, currentSection]));
    if (currentSection < moduleContent.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
    handleSectionComplete();
  };

  const calculateQuizScore = () => {
    const questions = moduleContent.sections[currentSection].content.questions;
    const correct = questions.filter(q => quizAnswers[q.id] === q.correct).length;
    return Math.round((correct / questions.length) * 100);
  };

  const isModuleComplete = completedSections.size === moduleContent.sections.length;

  useEffect(() => {
    if (isModuleComplete && onComplete) {
      onComplete(module.id);
    }
  }, [isModuleComplete, module.id, onComplete]);

  const renderSection = () => {
    const section = moduleContent.sections[currentSection];

    switch (section.type) {
      case 'video':
        return (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={section.content.videoUrl}
                  title={section.title}
                  className="w-full h-full min-h-[300px] md:min-h-[400px]"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => {
                    // Track video loading
                    console.log('Video loaded successfully');
                  }}
                />
              </div>
              
              {/* Video Info Overlay */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                {section.content.duration}
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">About this Video</h3>
              <p className="text-gray-700 mb-3">{section.content.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <PlayIcon className="h-4 w-4" />
                  <span>Duration: {section.content.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🎯</span>
                  <span>Difficulty: {module.difficulty}</span>
                </span>
              </div>
            </div>

            {/* Learning Objectives */}
            {isVideoModule && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Learning Objectives</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Understand key disaster preparedness principles</li>
                  <li>• Learn practical emergency response strategies</li>
                  <li>• Develop skills for risk assessment and planning</li>
                  <li>• Apply knowledge to real-world scenarios</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setVideoWatched(true);
                  handleSectionComplete();
                }}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Mark as Watched</span>
              </button>
              
              <a
                href={`https://www.youtube.com/watch?v=${section.content.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content.text }}
            />
            <button
              onClick={handleSectionComplete}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon className="h-5 w-5" />
              <span>Mark as Read</span>
            </button>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Kit Items</h3>
            <p className="text-gray-600">Check off each item as you review it:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.content.items.map((item, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSectionComplete}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon className="h-5 w-5" />
              <span>Complete Checklist</span>
            </button>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
              <span>Knowledge Check</span>
            </h3>
            
            {section.content.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  {qIndex + 1}. {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={oIndex}
                        onChange={() => handleQuizAnswer(question.id, oIndex)}
                        className="h-4 w-4 text-blue-600"
                        disabled={showResults}
                      />
                      <span className={`text-sm ${
                        showResults
                          ? oIndex === question.correct
                            ? 'text-green-700 font-medium'
                            : quizAnswers[question.id] === oIndex
                            ? 'text-red-700'
                            : 'text-gray-700'
                          : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                      {showResults && oIndex === question.correct && (
                        <CheckCircleIconSolid className="h-4 w-4 text-green-600" />
                      )}
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            {!showResults ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < section.content.questions.length}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Quiz Complete!</h4>
                <p className="text-green-700">Your Score: {calculateQuizScore()}%</p>
              </div>
            )}
          </div>
        );

      case 'game':
        return (
          <div className="space-y-6">
            {/* Game Description */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>🎮</span>
                <span>Interactive Disaster Preparedness Game</span>
              </h3>
              <p className="text-gray-700 mb-4">{section.content.description}</p>
              
              {section.content.levels && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Game Levels:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {section.content.levels.map((level, index) => (
                      <div key={index} className="bg-white p-2 rounded border text-xs text-center">
                        Level {index + 1}: {level}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>Duration: {section.content.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🎯</span>
                  <span>Difficulty: {section.content.difficulty}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🏢</span>
                  <span>By: {section.content.provider}</span>
                </span>
              </div>
            </div>

            {/* Game Player */}
            <div className="relative">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '16/10' }}>
                <iframe
                  src={section.content.gameUrl}
                  title={section.title}
                  className="w-full h-full min-h-[400px] md:min-h-[500px]"
                  allowFullScreen
                  allow="fullscreen"
                  style={{ border: 'none' }}
                  onLoad={() => {
                    console.log('Game loaded successfully');
                  }}
                />
              </div>
              
              {/* Game Info Overlay */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                Interactive Game
              </div>
            </div>

            {/* Game Instructions */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">🎯 How to Play</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Make quick decisions during emergency scenarios</li>
                <li>• Complete all 7 disaster levels plus the hot seat challenge</li>
                <li>• Earn points for correct responses</li>
                <li>• Learn from mistakes and try again</li>
                <li>• Print chapters of your graphic novel as you progress</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleSectionComplete();
                }}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Mark as Completed</span>
              </button>
              
              <a
                href={section.content.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                </svg>
                <span>Open Full Screen</span>
              </a>
            </div>
          </div>
        );

      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{module.title}</h2>
            <p className="text-sm text-gray-600">
              Section {currentSection + 1} of {moduleContent.sections.length}: {moduleContent.sections[currentSection].title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              ({completedSections.size}/{moduleContent.sections.length} sections completed)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSections.size / moduleContent.sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {moduleContent.sections[currentSection].title}
          </h3>
          {renderSection()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {moduleContent.sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === currentSection
                    ? 'bg-blue-600 text-white'
                    : completedSections.has(index)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {completedSections.has(index) ? (
                  <CheckCircleIconSolid className="h-4 w-4 mx-auto" />
                ) : (
                  index + 1
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentSection(Math.min(moduleContent.sections.length - 1, currentSection + 1))}
            disabled={currentSection === moduleContent.sections.length - 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Completion Badge */}
        {isModuleComplete && (
          <div className="p-4 bg-green-50 border-t border-green-200">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <CheckCircleIconSolid className="h-6 w-6" />
              <span className="font-medium">Module Completed! 🎉</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};