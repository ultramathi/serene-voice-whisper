
import { useState, useEffect } from 'react';
import { 
  MeditationSession, 
  SessionGoal, 
  JournalEntry, 
  SessionStats,
  MoodLevel 
} from '../types/session';

const STORAGE_KEYS = {
  SESSIONS: 'meditation_sessions',
  GOALS: 'meditation_goals',
  JOURNAL: 'meditation_journal'
};

export const useSessionManager = () => {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [goals, setGoals] = useState<SessionGoal[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
        const storedGoals = localStorage.getItem(STORAGE_KEYS.GOALS);
        const storedJournal = localStorage.getItem(STORAGE_KEYS.JOURNAL);

        if (storedSessions) {
          const parsedSessions = JSON.parse(storedSessions).map((session: any) => ({
            ...session,
            startTime: new Date(session.startTime),
            endTime: session.endTime ? new Date(session.endTime) : undefined,
            mood: {
              ...session.mood,
              timestamp: new Date(session.mood.timestamp)
            }
          }));
          setSessions(parsedSessions);
        }

        if (storedGoals) {
          const parsedGoals = JSON.parse(storedGoals).map((goal: any) => ({
            ...goal,
            createdAt: new Date(goal.createdAt),
            completedAt: goal.completedAt ? new Date(goal.completedAt) : undefined
          }));
          setGoals(parsedGoals);
        }

        if (storedJournal) {
          const parsedJournal = JSON.parse(storedJournal).map((entry: any) => ({
            ...entry,
            timestamp: new Date(entry.timestamp)
          }));
          setJournalEntries(parsedJournal);
        }
      } catch (error) {
        console.error('Error loading session data:', error);
      }
    };

    loadStoredData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalEntries));
  }, [journalEntries]);

  const startSession = (voiceUsed: string, beforeMood: MoodLevel): string => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: MeditationSession = {
      id: sessionId,
      startTime: new Date(),
      duration: 0,
      voiceUsed,
      mood: {
        before: beforeMood,
        timestamp: new Date()
      }
    };

    setSessions(prev => [...prev, newSession]);
    return sessionId;
  };

  const endSession = (sessionId: string, afterMood: MoodLevel, notes?: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);
        
        return {
          ...session,
          endTime,
          duration,
          mood: {
            ...session.mood,
            after: afterMood
          },
          notes
        };
      }
      return session;
    }));

    // Update goal progress
    updateGoalProgress();
  };

  const createGoal = (title: string, description: string, targetSessions: number): SessionGoal => {
    const newGoal: SessionGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      targetSessions,
      completedSessions: 0,
      createdAt: new Date()
    };

    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  const updateGoalProgress = () => {
    const completedSessionsCount = sessions.filter(s => s.endTime).length;
    
    setGoals(prev => prev.map(goal => {
      const newCompletedSessions = Math.min(completedSessionsCount, goal.targetSessions);
      const isCompleted = newCompletedSessions >= goal.targetSessions;
      
      return {
        ...goal,
        completedSessions: newCompletedSessions,
        completedAt: isCompleted && !goal.completedAt ? new Date() : goal.completedAt
      };
    }));
  };

  const addJournalEntry = (content: string, sessionId?: string) => {
    const newEntry: JournalEntry = {
      id: `journal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      timestamp: new Date(),
      sessionId
    };

    setJournalEntries(prev => [...prev, newEntry]);
    return newEntry;
  };

  const deleteJournalEntry = (entryId: string) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const getSessionStats = (): SessionStats => {
    const completedSessions = sessions.filter(s => s.endTime);
    const totalMinutes = completedSessions.reduce((sum, session) => sum + Math.floor(session.duration / 60), 0);
    const averageSessionLength = completedSessions.length > 0 ? totalMinutes / completedSessions.length : 0;

    // Calculate streaks
    const sortedSessions = completedSessions
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].startTime);
      sessionDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

      if (i === 0 && (daysDiff === 0 || daysDiff === 1)) {
        currentStreak = 1;
        tempStreak = 1;
      } else if (i > 0) {
        const prevSessionDate = new Date(sortedSessions[i - 1].startTime);
        prevSessionDate.setHours(0, 0, 0, 0);
        const prevDaysDiff = Math.floor((prevSessionDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

        if (prevDaysDiff === 1) {
          tempStreak++;
          if (i === currentStreak) currentStreak = tempStreak;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    return {
      totalSessions: completedSessions.length,
      totalMinutes,
      averageSessionLength,
      longestStreak,
      currentStreak,
      completedGoals: goals.filter(g => g.completedAt).length
    };
  };

  return {
    sessions,
    goals,
    journalEntries,
    startSession,
    endSession,
    createGoal,
    addJournalEntry,
    deleteJournalEntry,
    getSessionStats
  };
};
