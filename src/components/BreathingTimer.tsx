
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingPattern {
  id: string;
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdEmpty?: number;
}

const breathingPatterns: BreathingPattern[] = [
  { id: '478', name: '4-7-8 Relaxing', inhale: 4, hold: 7, exhale: 8 },
  { id: 'box', name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 },
  { id: 'simple', name: 'Simple (4-4)', inhale: 4, hold: 0, exhale: 4 },
  { id: 'energizing', name: 'Energizing (6-2-6)', inhale: 6, hold: 2, exhale: 6 },
];

const BreathingTimer = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (phase === 'inhale' && selectedPattern.hold > 0) {
        setPhase('hold');
        setTimeLeft(selectedPattern.hold);
      } else if (phase === 'inhale' && selectedPattern.hold === 0) {
        setPhase('exhale');
        setTimeLeft(selectedPattern.exhale);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setTimeLeft(selectedPattern.exhale);
      } else if (phase === 'exhale' && selectedPattern.holdEmpty) {
        setPhase('holdEmpty');
        setTimeLeft(selectedPattern.holdEmpty);
      } else {
        // Complete cycle
        setPhase('inhale');
        setTimeLeft(selectedPattern.inhale);
        setCycle(c => c + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, selectedPattern]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setCycle(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'holdEmpty': return 'Hold Empty';
      default: return 'Breathe In';
    }
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-110';
    if (phase === 'exhale') return 'scale-75';
    return 'scale-100';
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Breathing Guide</h3>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedPattern.id}
              onValueChange={(value) => {
                const pattern = breathingPatterns.find(p => p.id === value);
                if (pattern) {
                  setSelectedPattern(pattern);
                  setPhase('inhale');
                  setTimeLeft(pattern.inhale);
                  setIsActive(false);
                  setCycle(0);
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {breathingPatterns.map((pattern) => (
                  <SelectItem key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={isActive ? pauseTimer : startTimer}
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition-transform duration-1000 ease-in-out ${getCircleScale()}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">{timeLeft}</div>
                  <div className="text-sm">{getPhaseText()}</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <div>Cycle: {cycle}</div>
              <div className="mt-1">
                Pattern: {selectedPattern.inhale}
                {selectedPattern.hold > 0 && `-${selectedPattern.hold}`}
                -{selectedPattern.exhale}
                {selectedPattern.holdEmpty && `-${selectedPattern.holdEmpty}`}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingTimer;
