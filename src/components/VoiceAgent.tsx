
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceSelector from './VoiceSelector';
import VideoCarousel from './VideoCarousel';
import ConnectionStatus from './ConnectionStatus';
import ApiKeyInput from './ApiKeyInput';
import ConnectionControls from './ConnectionControls';
import SessionStatus from './SessionStatus';
import VolumeControl from './VolumeControl';
import { useVapiConnection } from '../hooks/useVapiConnection';
import { useVolumeControl } from '../hooks/useVolumeControl';

const VoiceAgent = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Hana');
  
  const {
    isConnected,
    isMuted,
    connectionStatus,
    isSpeaking,
    volumeLevel,
    errorMessage,
    sessionStartTime,
    startCall,
    endCall,
    toggleMute,
  } = useVapiConnection();

  const masterVolume = useVolumeControl('master', 80);
  const voiceVolume = useVolumeControl('voice', 70);

  const handleStartCall = () => {
    startCall(apiKey, selectedVoice);
  };

  return (
    <div>
      <VideoCarousel />
      
      <VoiceSelector
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        disabled={isConnected}
      />

      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <VolumeControl
            label="Master Volume"
            volume={masterVolume.volume}
            onVolumeChange={masterVolume.setVolume}
            muted={masterVolume.muted}
            onMuteToggle={masterVolume.toggleMute}
          />
          <VolumeControl
            label="Voice Volume"
            volume={voiceVolume.volume}
            onVolumeChange={voiceVolume.setVolume}
            muted={voiceVolume.muted}
            onMuteToggle={voiceVolume.toggleMute}
          />
        </div>
      )}
      
      <div className="flex justify-center mb-8">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm max-w-md w-full">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <ConnectionStatus connectionStatus={connectionStatus} />
                
                {!isConnected && (
                  <ApiKeyInput
                    apiKey={apiKey}
                    onApiKeyChange={setApiKey}
                    errorMessage={errorMessage}
                  />
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <ConnectionControls
                  isConnected={isConnected}
                  isMuted={isMuted}
                  connectionStatus={connectionStatus}
                  onStartCall={handleStartCall}
                  onEndCall={endCall}
                  onToggleMute={toggleMute}
                />
              </div>

              <SessionStatus
                isConnected={isConnected}
                isSpeaking={isSpeaking}
                volumeLevel={volumeLevel}
                sessionStartTime={sessionStartTime}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAgent;
