
import React from 'react';

interface SessionTimerProps {
  sessionStartTime: Date | null;
}

const SessionTimer: React.FC<SessionTimerProps> = ({ sessionStartTime }) => {
  const [elapsedTime, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    if (!sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!sessionStartTime) return null;

  return (
    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>Session time: {formatTime(elapsedTime)}</span>
    </div>
  );
};

export default SessionTimer;
