export const currentUser = {
  id: '1',
  name: 'Ms. Anya Sharma',
  email: 'anya.sharma@school.edu',
  role: 'teacher',
  avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'
};

export const learningModules = [
  {
    id: '8',
    title: 'Expert Video: Disaster Preparedness Training',
    description: 'Watch this comprehensive video tutorial on disaster preparedness strategies and emergency response protocols.',
    category: 'Natural Disasters',
    imageUrl: 'https://img.youtube.com/vi/HaEmIakO7f4/maxresdefault.jpg',
    duration: '25 mins',
    difficulty: 'Intermediate',
    featured: true,
    completionRate: 0,
    type: 'video',
    videoId: 'HaEmIakO7f4',
    videoUrl: 'https://www.youtube.com/embed/HaEmIakO7f4'
  },
  {
    id: '9',
    title: 'Emergency Response Techniques',
    description: 'Learn essential emergency response techniques and life-saving procedures from experienced professionals.',
    category: 'Emergency Response',
    imageUrl: 'https://img.youtube.com/vi/eeZ0GJTFYKw/maxresdefault.jpg',
    duration: '18 mins',
    difficulty: 'Beginner',
    featured: true,
    completionRate: 0,
    type: 'video',
    videoId: 'eeZ0GJTFYKw',
    videoUrl: 'https://www.youtube.com/embed/eeZ0GJTFYKw'
  },
  {
    id: '10',
    title: 'Advanced Safety Protocols',
    description: 'Comprehensive guide to advanced safety protocols and emergency management strategies for communities.',
    category: 'Safety Protocols',
    imageUrl: 'https://img.youtube.com/vi/6MOE8Pt6qOs/maxresdefault.jpg',
    duration: '32 mins',
    difficulty: 'Advanced',
    featured: true,
    completionRate: 0,
    type: 'video',
    videoId: '6MOE8Pt6qOs',
    videoUrl: 'https://www.youtube.com/embed/6MOE8Pt6qOs'
  },
  {
    "id": "11",
    "title": "Community Emergency Preparedness",
    "description": "Detailed walkthrough on preparing communities for emergencies, focusing on readiness, resilience, and response strategies.",
    "category": "Safety Protocols",
    "imageUrl": "https://img.youtube.com/vi/0MO2ohX2Iao/maxresdefault.jpg",
    "duration": "28 mins",
    "difficulty": "Intermediate",
    "featured": true,
    "completionRate": 0,
    "type": "video",
    "videoId": "0MO2ohX2Iao",
    "videoUrl": "https://www.youtube.com/embed/0MO2ohX2Iao"
  },
  {
    id: '3',
    title: 'Earthquake Safety Protocols',
    description: 'Essential earthquake preparedness, during-event safety measures, and post-earthquake response procedures.',
    category: 'Natural Disasters',
    imageUrl: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '60 mins',
    difficulty: 'Advanced',
    featured: false,
    completionRate: 78
  },
  {
    id: '4',
    title: 'Fire Prevention & Response',
    description: 'Fire safety basics, prevention strategies, evacuation procedures, and proper use of firefighting equipment.',
    category: 'Fire Safety',
    imageUrl: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '40 mins',
    difficulty: 'Beginner',
    featured: false,
    completionRate: 88
  },
  {
    id: '5',
    title: 'Understanding Climate Change',
    description: 'Climate science fundamentals, impact assessment, and community adaptation strategies for environmental changes.',
    category: 'Environmental',
    imageUrl: 'https://images.pexels.com/photos/1436130/pexels-photo-1436130.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '50 mins',
    difficulty: 'Intermediate',
    featured: false,
    completionRate: 75
  },
  {
    id: '6',
    title: 'Community Disaster Drills',
    description: 'Organizing and conducting effective disaster preparedness drills for schools and communities.',
    category: 'Community Training',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '35 mins',
    difficulty: 'Advanced',
    featured: false,
    completionRate: 82
  },
  {
    id: '7',
    title: 'Basic First Aid & CPR',
    description: 'Essential first aid techniques, CPR procedures, and emergency medical response for disaster situations.',
    category: 'First Aid',
    imageUrl: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '75 mins',
    difficulty: 'Intermediate',
    featured: false,
    completionRate: 90
  },
  {
    id: '8',
    title: 'Shelter Management & Safety',
    description: 'Emergency shelter setup, management protocols, and safety procedures for displaced populations.',
    category: 'Emergency Response',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '55 mins',
    difficulty: 'Advanced',
    featured: false,
    completionRate: 73
  },
  {
    id: '9',
    title: 'Crisis Communication Skills',
    description: 'Effective communication strategies during emergencies, media relations, and public information management.',
    category: 'Communication',
    imageUrl: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '40 mins',
    difficulty: 'Intermediate',
    featured: false,
    completionRate: 86
  },
  {
    id: '12',
    title: 'Disaster Master Interactive Game',
    description: 'Interactive game with 7 disaster scenarios including wildfire, tornado, hurricane, home fire, winter storm, tsunami/earthquake, and thunderstorm. Make the right decisions to become a Disaster Master!',
    category: 'Interactive Learning',
    imageUrl: 'https://www.ready.gov/kids/games/data/dm-english/imgs/disaster-master.png',
    duration: '45 mins',
    difficulty: 'Beginner',
    featured: true,
    completionRate: 0,
    type: 'interactive',
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

export const upcomingDrills = [
  {
    id: '1',
    title: 'School Fire Evacuation Drill',
    type: 'Fire Safety',
    date: new Date('2024-01-15T10:00:00'),
    location: 'Main Building',
    status: 'Scheduled'
  },
  {
    id: '2',
    title: 'Earthquake Drop, Cover, Hold Practice',
    type: 'Earthquake',
    date: new Date('2024-01-22T14:30:00'),
    location: 'All Classrooms',
    status: 'Scheduled'
  }
];

export const recentActivities = [
  {
    id: '1',
    type: 'Module Completion',
    description: 'Student completed Flood Preparedness module',
    user: 'Rahul Patel',
    timestamp: new Date('2024-01-10T09:15:00'),
    status: 'Success'
  },
  {
    id: '2',
    type: 'Drill Scheduled',
    description: 'Fire evacuation drill scheduled for next week',
    user: 'Admin User',
    timestamp: new Date('2024-01-09T16:30:00'),
    status: 'Success'
  },
  {
    id: '3',
    type: 'Resource Upload',
    description: 'New emergency contact list uploaded',
    user: 'Priya Singh',
    timestamp: new Date('2024-01-08T11:45:00'),
    status: 'Success'
  }
];

export const categories = [
  'All', 'First Aid', 'Fire Safety', 'Professional Training', 'Natural Disasters',
  'Psychological', 'Community Training', 'Environmental', 'Emergency Response', 'Communication', 'Safety Protocols', 'Interactive Learning'
];

export const moduleCompletionData = [
  { name: 'A. Earthquake Prep', completion: [85, 92, 78, 88, 75] },
  { name: 'B. Fire Response', completion: [78, 85, 82, 90, 88] },
  { name: 'C. Flood Safety', completion: [92, 88, 85, 78, 82] },
  { name: 'D. First Aid', completion: [88, 75, 90, 85, 92] },
  { name: 'E. Psychological', completion: [75, 82, 88, 92, 85] }
];