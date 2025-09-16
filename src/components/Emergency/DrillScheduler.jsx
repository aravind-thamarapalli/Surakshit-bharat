import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UsersIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

export const DrillScheduler = () => {
  const [drills, setDrills] = useState([
    {
      id: 1,
      title: 'Fire Evacuation Drill',
      type: 'Fire Safety',
      date: new Date('2024-01-15T10:00:00'),
      duration: 15,
      location: 'Main Building',
      participants: 120,
      status: 'Scheduled',
      description: 'Practice fire evacuation procedures for all floors of the main building.',
      instructions: [
        'Alarm will sound at 10:00 AM',
        'Exit via designated fire exits',
        'Assemble at Fire Assembly Point A',
        'Wait for all-clear signal'
      ]
    },
    {
      id: 2,
      title: 'Earthquake Drop, Cover, Hold',
      type: 'Earthquake',
      date: new Date('2024-01-22T14:30:00'),
      duration: 10,
      location: 'All Classrooms',
      participants: 300,
      status: 'Scheduled',
      description: 'Practice earthquake safety response in all learning spaces.',
      instructions: [
        'When alarm sounds, immediately DROP',
        'Take COVER under desk/table',
        'HOLD ON to your shelter',
        'Stay in position until all-clear'
      ]
    },
    {
      id: 3,
      title: 'Flood Response Simulation',
      type: 'Flood',
      date: new Date('2024-01-10T09:00:00'),
      duration: 30,
      location: 'Sports Complex',
      participants: 85,
      status: 'Completed',
      description: 'Simulated flood scenario with evacuation to higher ground.',
      instructions: [
        'Move to designated higher ground',
        'Bring emergency kit',
        'Account for all team members',
        'Wait for evacuation assistance'
      ]
    }
  ]);

  const [selectedDrill, setSelectedDrill] = useState(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const startSimulation = (drill) => {
    setSelectedDrill(drill);
    setShowSimulation(true);
    setSimulationStep(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Fire Safety':
        return '🔥';
      case 'Earthquake':
        return '🌍';
      case 'Flood':
        return '💧';
      default:
        return '⚠️';
    }
  };

  const renderSimulation = () => {
    if (!selectedDrill) return null;

    const steps = [
      {
        title: 'Pre-Drill Briefing',
        content: 'Review safety procedures and ensure all participants understand their roles.',
        action: 'Begin Drill',
        duration: 2
      },
      {
        title: 'Alarm Activation',
        content: 'Emergency alarm system activated. All participants should respond immediately.',
        action: 'Activate Response',
        duration: 1
      },
      {
        title: 'Emergency Response',
        content: selectedDrill.instructions.join(' → '),
        action: 'Execute Procedures',
        duration: selectedDrill.duration - 5
      },
      {
        title: 'Assembly & Headcount',
        content: 'All participants assemble at designated safety points for headcount.',
        action: 'Complete Assembly',
        duration: 3
      },
      {
        title: 'All Clear Signal',
        content: 'Drill complete. Debrief participants and document lessons learned.',
        action: 'End Drill',
        duration: 2
      }
    ];

    const currentStep = steps[simulationStep];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="bg-red-600 text-white p-4">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <h2 className="text-xl font-bold">
                EMERGENCY DRILL IN PROGRESS: {selectedDrill.title}
              </h2>
            </div>
            <p className="text-red-100 mt-1">{selectedDrill.type} Response Simulation</p>
          </div>

          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {simulationStep + 1} of {steps.length}</span>
                <span>Est. Duration: {currentStep.duration} minutes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((simulationStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentStep.title}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {currentStep.content}
              </p>
              
              {simulationStep < steps.length - 1 ? (
                <button
                  onClick={() => setSimulationStep(simulationStep + 1)}
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200"
                >
                  {currentStep.action}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowSimulation(false);
                    setSelectedDrill(null);
                    // Update drill status to completed
                    setDrills(prev => prev.map(drill => 
                      drill.id === selectedDrill.id 
                        ? { ...drill, status: 'Completed' }
                        : drill
                    ));
                  }}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Complete Drill
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Emergency Procedures:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {selectedDrill.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            <button
              onClick={() => {
                setShowSimulation(false);
                setSelectedDrill(null);
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel Drill
            </button>
            <div className="text-sm text-gray-500">
              Location: {selectedDrill.location} | Participants: {selectedDrill.participants}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Emergency Drill Scheduler</h1>
        <p className="text-gray-600">Schedule, manage, and simulate emergency response drills</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-900">
                {drills.filter(d => d.status === 'Scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">
                {drills.filter(d => d.status === 'Completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Total Participants</p>
              <p className="text-2xl font-bold text-purple-900">
                {drills.reduce((sum, drill) => sum + drill.participants, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-600">Avg Duration</p>
              <p className="text-2xl font-bold text-yellow-900">
                {Math.round(drills.reduce((sum, drill) => sum + drill.duration, 0) / drills.length)} min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.map((drill) => (
          <div key={drill.id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(drill.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{drill.title}</h3>
                    <p className="text-sm text-gray-500">{drill.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(drill.status)}`}>
                  {drill.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{drill.description}</p>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{drill.date.toLocaleDateString()} at {drill.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>{drill.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{drill.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-4 w-4" />
                  <span>{drill.participants} participants</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {drill.status === 'Scheduled' && (
                  <button
                    onClick={() => startSimulation(drill)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <PlayIcon className="h-4 w-4" />
                    <span>Start Drill</span>
                  </button>
                )}
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition duration-200">
                  {drill.status === 'Completed' ? 'View Report' : 'Edit Drill'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Drill Button */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
          Schedule New Drill
        </button>
      </div>

      {/* Simulation Modal */}
      {showSimulation && renderSimulation()}
    </div>
  );
};