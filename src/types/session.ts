
export interface MoodLevel {
  value: number; // 1-10 scale
  label: string;
}

export interface SessionGoal {
  id: string;
  title: string;
  description: string;
  targetSessions: number;
  completedSessions: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface MoodEntry {
  before: MoodLevel;
  after?: MoodLevel;
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  sessionId?: string;
}

export interface MeditationSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  voiceUsed: string;
  mood: MoodEntry;
  notes?: string;
  goals?: string[];
}

export interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number;
  longestStreak: number;
  currentStreak: number;
  completedGoals: number;
}
