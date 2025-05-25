
import React from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConnectionControlsProps {
  isConnected: boolean;
  isMuted: boolean;
  connectionStatus: string;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
}

const ConnectionControls: React.FC<ConnectionControlsProps> = ({
  isConnected,
  isMuted,
  connectionStatus,
  onStartCall,
  onEndCall,
  onToggleMute,
}) => {
  if (!isConnected) {
    return (
      <Button
        onClick={onStartCall}
        disabled={connectionStatus === 'connecting'}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Phone className="w-5 h-5 mr-2" />
        {connectionStatus === 'connecting' ? 'Connecting...' : 'Begin Meditation Session'}
      </Button>
    );
  }

  return (
    <div className="flex space-x-4">
      <Button
        onClick={onToggleMute}
        variant={isMuted ? "destructive" : "secondary"}
        className="px-6 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>
      
      <Button
        onClick={onEndCall}
        variant="destructive"
        className="px-6 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        <PhoneOff className="w-5 h-5 mr-2" />
        End Session
      </Button>
    </div>
  );
};

export default ConnectionControls;
