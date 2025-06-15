
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface PreSessionGameProps {
  onComplete: () => void;
}

const PreSessionGame: React.FC<PreSessionGameProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  const totalCycles = 5;
  const phases = {
    inhale: { duration: 4, next: 'hold' as const, color: 'from-blue-400 to-cyan-500' },
    hold: { duration: 2, next: 'exhale' as const, color: 'from-purple-400 to-indigo-500' },
    exhale: { duration: 6, next: 'inhale' as const, color: 'from-green-400 to-emerald-500' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !gameComplete) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            const currentPhaseData = phases[currentPhase];
            const nextPhase = currentPhaseData.next;
            
            if (currentPhase === 'exhale') {
              const newCycle = cycle + 1;
              setCycle(newCycle);
              setScore(prev => prev + 10);
              
              if (newCycle >= totalCycles) {
                setIsPlaying(false);
                setGameComplete(true);
                return 0;
              }
            }
            
            setCurrentPhase(nextPhase);
            return phases[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentPhase, cycle, gameComplete]);

  const startGame = () => {
    setIsPlaying(true);
    setCurrentPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
    setScore(0);
    setGameComplete(false);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
    setScore(0);
    setGameComplete(false);
  };

  const getCircleSize = () => {
    const baseSize = 120;
    const maxSize = 200;
    
    if (currentPhase === 'inhale') {
      const progress = (phases.inhale.duration - timeLeft) / phases.inhale.duration;
      return baseSize + (maxSize - baseSize) * progress;
    } else if (currentPhase === 'exhale') {
      const progress = timeLeft / phases.exhale.duration;
      return baseSize + (maxSize - baseSize) * progress;
    }
    
    return maxSize; // hold phase
  };

  const getInstructions = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          Mindful Breathing Game
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Follow the breathing circle to prepare for your meditation
        </p>

        {!isPlaying && !gameComplete && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Complete {totalCycles} breathing cycles to begin your session
              </p>
              <Button onClick={startGame} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <Play className="w-4 h-4 mr-2" />
                Start Breathing Exercise
              </Button>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className="space-y-6">
            {/* Breathing Circle */}
            <div className="flex justify-center items-center h-64">
              <div
                className={`rounded-full bg-gradient-to-br ${phases[currentPhase].color} transition-all duration-1000 ease-in-out flex items-center justify-center shadow-lg`}
                style={{
                  width: `${getCircleSize()}px`,
                  height: `${getCircleSize()}px`,
                }}
              >
                <div className="text-white font-medium text-lg">
                  {timeLeft}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-xl font-medium text-gray-800 dark:text-white">
                {getInstructions()}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cycle {cycle + 1} of {totalCycles}
              </p>
            </div>

            {/* Progress */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((cycle + 1) / totalCycles) * 100}%` }}
              />
            </div>
          </div>
        )}

        {gameComplete && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🧘‍♀️</div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Well Done!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                You've completed the breathing exercise
              </p>
              <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                Score: {score} points
              </p>
              
              <div className="flex space-x-3 justify-center">
                <Button onClick={resetGame} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Button onClick={onComplete} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  Start Meditation
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreSessionGame;
