
import { useState, useEffect } from 'react';

export const useSessionTimer = () => {
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const startSession = () => {
    setSessionStartTime(new Date());
    setElapsedTime(0);
  };

  const endSession = () => {
    setSessionStartTime(null);
    setElapsedTime(0);
  };

  return {
    sessionStartTime,
    elapsedTime,
    startSession,
    endSession,
  };
};
