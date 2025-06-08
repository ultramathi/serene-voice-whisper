
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceSelector from './VoiceSelector';
import VideoCarousel from './VideoCarousel';
import ConnectionStatus from './ConnectionStatus';
import ApiKeyInput from './ApiKeyInput';
import ConnectionControls from './ConnectionControls';
import SessionStatus from './SessionStatus';
import { useVapiConnection } from '../hooks/useVapiConnection';

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
    startCall,
    endCall,
    toggleMute,
  } = useVapiConnection();

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
      
      <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgent;
