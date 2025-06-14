
import React from 'react';
import SessionTimer from './SessionTimer';

interface SessionStatusProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volumeLevel: number;
  sessionStartTime?: Date | null;
}

const SessionStatus: React.FC<SessionStatusProps> = ({ 
  isConnected, 
  isSpeaking, 
  volumeLevel, 
  sessionStartTime 
}) => {
  if (!isConnected) return null;

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-700 dark:text-green-400 font-medium">
          {isSpeaking ? 'Guide is speaking' : 'Session Active'}
        </span>
      </div>
      
      {sessionStartTime && (
        <div className="mb-3">
          <SessionTimer sessionStartTime={sessionStartTime} />
        </div>
      )}
      
      {volumeLevel > 0 && (
        <div className="flex justify-center mb-3">
          <div className="flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-4 rounded-sm transition-all ${
                  i / 10 < volumeLevel ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      <p className="text-gray-600 dark:text-gray-400">
        Your meditation guide is listening. Speak naturally about what's on your mind, 
        or ask for a guided meditation, breathing exercise, or relaxation technique.
      </p>
    </div>
  );
};

export default SessionStatus;
