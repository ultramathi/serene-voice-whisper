
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Clock, Mic, TrendingUp } from 'lucide-react';
import { MeditationSession, SessionStats } from '../types/session';

interface SessionHistoryProps {
  sessions: MeditationSession[];
  stats: SessionStats;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, stats }) => {
  const completedSessions = sessions.filter(s => s.endTime);
  const recentSessions = [...completedSessions]
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 10);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getMoodColor = (moodValue: number) => {
    if (moodValue <= 3) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    if (moodValue <= 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (moodValue <= 7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalSessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.totalMinutes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes Meditated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.currentStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(stats.averageSessionLength)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {stats.completedGoals}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Goals Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentSessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No completed sessions yet. Start your first meditation!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatDuration(session.duration)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mic className="w-4 h-4" />
                      {session.voiceUsed}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getMoodColor(session.mood.before.value)}>
                        Before: {session.mood.before.value}/10
                      </Badge>
                      {session.mood.after && (
                        <Badge className={getMoodColor(session.mood.after.value)}>
                          After: {session.mood.after.value}/10
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(session.startTime)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionHistory;
