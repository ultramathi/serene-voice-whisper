
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { useVapiConnection } from '../hooks/useVapiConnection';
import { voices } from './VoiceSelector';

interface SessionPhase {
  id: string;
  name: string;
  duration: number; // in seconds
  type: 'breathing' | 'transition' | 'meditation';
}

const sessionTemplates = [
  {
    id: 'quick',
    name: 'Quick Session (5 min)',
    phases: [
      { id: 'breathing', name: 'Breathing Preparation', duration: 60, type: 'breathing' as const },
      { id: 'transition', name: 'Settling In', duration: 30, type: 'transition' as const },
      { id: 'meditation', name: 'Guided Meditation', duration: 210, type: 'meditation' as const }
    ]
  },
  {
    id: 'standard',
    name: 'Standard Session (10 min)',
    phases: [
      { id: 'breathing', name: 'Breathing Preparation', duration: 120, type: 'breathing' as const },
      { id: 'transition', name: 'Settling In', duration: 60, type: 'transition' as const },
      { id: 'meditation', name: 'Guided Meditation', duration: 420, type: 'meditation' as const }
    ]
  },
  {
    id: 'extended',
    name: 'Extended Session (15 min)',
    phases: [
      { id: 'breathing', name: 'Breathing Preparation', duration: 180, type: 'breathing' as const },
      { id: 'transition', name: 'Settling In', duration: 90, type: 'transition' as const },
      { id: 'meditation', name: 'Guided Meditation', duration: 630, type: 'meditation' as const }
    ]
  }
];

interface UnifiedSessionProps {
  apiKey: string;
  selectedVoice: string;
  onSessionStart?: () => void;
  onSessionComplete?: () => void;
}

const UnifiedSession: React.FC<UnifiedSessionProps> = ({
  apiKey,
  selectedVoice,
  onSessionStart,
  onSessionComplete
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(sessionTemplates[0]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  const { startCall, endCall, isConnected } = useVapiConnection();

  const currentPhase = selectedTemplate.phases[currentPhaseIndex];
  const totalSessionTime = selectedTemplate.phases.reduce((sum, phase) => sum + phase.duration, 0);
  const elapsedSessionTime = selectedTemplate.phases
    .slice(0, currentPhaseIndex)
    .reduce((sum, phase) => sum + phase.duration, 0) + 
    (currentPhase ? currentPhase.duration - phaseTimeLeft : 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSessionActive && !isPaused && phaseTimeLeft > 0) {
      interval = setInterval(() => {
        setPhaseTimeLeft(time => time - 1);
      }, 1000);
    } else if (isSessionActive && !isPaused && phaseTimeLeft === 0) {
      // Move to next phase
      if (currentPhaseIndex < selectedTemplate.phases.length - 1) {
        const nextPhaseIndex = currentPhaseIndex + 1;
        const nextPhase = selectedTemplate.phases[nextPhaseIndex];
        
        setCurrentPhaseIndex(nextPhaseIndex);
        setPhaseTimeLeft(nextPhase.duration);

        // Start voice meditation when we reach that phase
        if (nextPhase.type === 'meditation' && !isConnected) {
          startCall(apiKey, selectedVoice);
        }
      } else {
        // Session complete
        completeSession();
      }
    }

    return () => clearInterval(interval);
  }, [isSessionActive, isPaused, phaseTimeLeft, currentPhaseIndex, selectedTemplate, apiKey, selectedVoice, isConnected, startCall]);

  // Breathing animation timer
  useEffect(() => {
    let breathingInterval: NodeJS.Timeout;

    if (isSessionActive && currentPhase?.type === 'breathing' && !isPaused) {
      breathingInterval = setInterval(() => {
        setBreathingCount(count => {
          if (count === 1) {
            setBreathingPhase(phase => phase === 'inhale' ? 'exhale' : 'inhale');
            return 4;
          }
          return count - 1;
        });
      }, 1000);
    }

    return () => clearInterval(breathingInterval);
  }, [isSessionActive, currentPhase?.type, isPaused]);

  const startSession = () => {
    setIsSessionActive(true);
    setCurrentPhaseIndex(0);
    setPhaseTimeLeft(selectedTemplate.phases[0].duration);
    setIsPaused(false);
    onSessionStart?.();
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
  };

  const skipPhase = () => {
    if (currentPhaseIndex < selectedTemplate.phases.length - 1) {
      const nextPhaseIndex = currentPhaseIndex + 1;
      const nextPhase = selectedTemplate.phases[nextPhaseIndex];
      
      setCurrentPhaseIndex(nextPhaseIndex);
      setPhaseTimeLeft(nextPhase.duration);

      if (nextPhase.type === 'meditation' && !isConnected) {
        startCall(apiKey, selectedVoice);
      }
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    setIsSessionActive(false);
    setCurrentPhaseIndex(0);
    setPhaseTimeLeft(0);
    if (isConnected) {
      endCall();
    }
    onSessionComplete?.();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getBreathingScale = () => {
    if (breathingPhase === 'inhale') return 'scale-110';
    return 'scale-75';
  };

  const renderPhaseContent = () => {
    if (!currentPhase) return null;

    switch (currentPhase.type) {
      case 'breathing':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition-transform duration-1000 ease-in-out ${getBreathingScale()}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">{breathingCount}</div>
                  <div className="text-sm capitalize">{breathingPhase}</div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Focus on your breath to prepare for meditation
            </p>
          </div>
        );

      case 'transition':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse" />
            <p className="text-center text-gray-600 dark:text-gray-300">
              Take a moment to settle into your meditation space
            </p>
          </div>
        );

      case 'meditation':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Your meditation guide is now with you
            </p>
            {isConnected && (
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-auto mb-2"></div>
                <span className="text-green-600 dark:text-green-400 text-sm">Connected to guide</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isSessionActive) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Unified Meditation Session
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Choose Session Length</label>
              <Select
                value={selectedTemplate.id}
                onValueChange={(value) => {
                  const template = sessionTemplates.find(t => t.id === value);
                  if (template) setSelectedTemplate(template);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sessionTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Session Flow:</h4>
              {selectedTemplate.phases.map((phase, index) => (
                <div key={phase.id} className="flex justify-between text-sm">
                  <span>{phase.name}</span>
                  <span>{formatTime(phase.duration)}</span>
                </div>
              ))}
            </div>

            <Button onClick={startSession} className="w-full" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Start Unified Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{currentPhase.name}</h3>
            <div className="text-3xl font-mono mb-2">{formatTime(phaseTimeLeft)}</div>
            <Progress 
              value={(elapsedSessionTime / totalSessionTime) * 100} 
              className="w-full mb-4" 
            />
            <div className="text-sm text-gray-500">
              Phase {currentPhaseIndex + 1} of {selectedTemplate.phases.length}
            </div>
          </div>

          {renderPhaseContent()}

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={pauseSession}>
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
            <Button variant="outline" onClick={skipPhase}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="destructive" onClick={completeSession}>
              End Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedSession;
