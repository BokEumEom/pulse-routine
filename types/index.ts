// Routine Types
export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type RoutineTemplate = {
  id: string;
  name: string;
  duration: number; // in minutes
  tasks: Task[];
  icon: string;
};

// Emotion Types
export type EmotionType = 
  | 'happy' 
  | 'excited' 
  | 'content' 
  | 'calm' 
  | 'anxious' 
  | 'sad' 
  | 'angry' 
  | 'frustrated'
  | 'motivated'
  | 'optimistic'
  | 'grateful'
  | 'overwhelmed';

export type EmotionEntry = {
  id: string;
  date: Date;
  primaryEmotion: EmotionType;
  secondaryEmotions?: EmotionType[];
  notes?: string;
  relatedTo: {
    personId: string;
    type: 'person' | 'event';
  } | null;
};

// User Types
export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  teams?: Team[];
};

export type Team = {
  id: string;
  name: string;
  members: string[]; // user IDs
};