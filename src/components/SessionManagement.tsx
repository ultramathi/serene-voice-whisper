
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSessionManager } from '../hooks/useSessionManager';
import SessionGoals from './SessionGoals';
import MeditationJournal from './MeditationJournal';
import MoodSelector from './MoodSelector';
import { MoodLevel } from '../types/session';

interface SessionManagementProps {
  isSessionActive?: boolean;
  currentSessionId?: string;
  onSessionStart?: (sessionId: string) => void;
  onSessionEnd?: () => void;
}

const SessionManagement: React.FC<SessionManagementProps> = ({
  isSessionActive = false,
  currentSessionId,
  onSessionStart,
  onSessionEnd
}) => {
  const {
    sessions,
    goals,
    journalEntries,
    startSession,
    endSession,
    createGoal,
    addJournalEntry,
    deleteJournalEntry,
    getSessionStats
  } = useSessionManager();

  const [preSessionMood, setPreSessionMood] = useState<MoodLevel | undefined>();
  const [postSessionMood, setPostSessionMood] = useState<MoodLevel | undefined>();
  const [sessionNotes, setSessionNotes] = useState('');

  const stats = getSessionStats();

  const handleMoodTracking = (sessionId: string, afterMood: MoodLevel) => {
    endSession(sessionId, afterMood, sessionNotes);
    setPostSessionMood(undefined);
    setSessionNotes('');
    onSessionEnd?.();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="mt-6">
            <SessionGoals 
              goals={goals} 
              onCreateGoal={createGoal}
            />
          </TabsContent>

          <TabsContent value="journal" className="mt-6">
            <MeditationJournal
              entries={journalEntries}
              onAddEntry={addJournalEntry}
              onDeleteEntry={deleteJournalEntry}
            />
          </TabsContent>

          <TabsContent value="mood" className="mt-6">
            <div className="space-y-6">
              {!isSessionActive && (
                <MoodSelector
                  title="How are you feeling right now?"
                  selectedMood={preSessionMood}
                  onMoodSelect={setPreSessionMood}
                />
              )}

              {isSessionActive && currentSessionId && (
                <div className="space-y-4">
                  <MoodSelector
                    title="How do you feel after your meditation?"
                    selectedMood={postSessionMood}
                    onMoodSelect={(mood) => {
                      setPostSessionMood(mood);
                      handleMoodTracking(currentSessionId, mood);
                    }}
                  />
                </div>
              )}

              {preSessionMood && !isSessionActive && (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300">
                    Mood tracked! Start your meditation session when you're ready.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SessionManagement;
