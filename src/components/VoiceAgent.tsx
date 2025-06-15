
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceSelector from './VoiceSelector';
import VideoCarousel from './VideoCarousel';
import ConnectionStatus from './ConnectionStatus';
import ApiKeyConfig from './ApiKeyConfig';
import ConnectionControls from './ConnectionControls';
import SessionStatus from './SessionStatus';
import VolumeControl from './VolumeControl';
import AmbientAudio from './AmbientAudio';
import SessionManagement from './SessionManagement';
import UnifiedSession from './UnifiedSession';
import { useVapiConnection } from '../hooks/useVapiConnection';
import { useVolumeControl } from '../hooks/useVolumeControl';
import { useSessionManager } from '../hooks/useSessionManager';
import { useApiKeyStorage } from '../hooks/useApiKeyStorage';
import { MoodLevel } from '../types/session';

const VoiceAgent = () => {
  const [selectedVoice, setSelectedVoice] = useState('Hana');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [preSessionMood, setPreSessionMood] = useState<MoodLevel | undefined>();
  const [useUnifiedSession, setUseUnifiedSession] = useState(false);
  
  const {
    apiKey,
    useCustomKey,
    customApiKey,
    updateCustomKey,
    toggleCustomKey,
    isValidKey,
    hasValidKey,
  } = useApiKeyStorage();
  
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

  const { startSession, endSession } = useSessionManager();

  const masterVolume = useVolumeControl('master', 80);
  const voiceVolume = useVolumeControl('voice', 70);

  const handleStartCall = () => {
    if (!hasValidKey) {
      return;
    }

    // Start the meditation session tracking
    if (preSessionMood) {
      const sessionId = startSession(selectedVoice, preSessionMood);
      setCurrentSessionId(sessionId);
    }
    
    // Start the actual voice call
    startCall(apiKey, selectedVoice);
  };

  const handleEndCall = () => {
    endCall();
    setCurrentSessionId(null);
  };

  const handleUnifiedSessionStart = () => {
    if (preSessionMood) {
      const sessionId = startSession(selectedVoice, preSessionMood);
      setCurrentSessionId(sessionId);
    }
  };

  const handleUnifiedSessionComplete = () => {
    setCurrentSessionId(null);
  };

  return (
    <div>
      <VideoCarousel />
      
      <AmbientAudio />

      <VoiceSelector
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        disabled={isConnected || useUnifiedSession}
      />

      {/* Session Type Toggle */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setUseUnifiedSession(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !useUnifiedSession 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Manual Session
            </button>
            <button
              onClick={() => setUseUnifiedSession(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                useUnifiedSession 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Unified Session
            </button>
          </div>
        </CardContent>
      </Card>

      {useUnifiedSession ? (
        <UnifiedSession
          apiKey={apiKey}
          selectedVoice={selectedVoice}
          onSessionStart={handleUnifiedSessionStart}
          onSessionComplete={handleUnifiedSessionComplete}
        />
      ) : (
        <>
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
            {isConnected ? (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm max-w-md w-full">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <ConnectionStatus connectionStatus={connectionStatus} />

                    <div className="flex justify-center space-x-4">
                      <ConnectionControls
                        isConnected={isConnected}
                        isMuted={isMuted}
                        connectionStatus={connectionStatus}
                        onStartCall={handleStartCall}
                        onEndCall={handleEndCall}
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
            ) : (
              <ApiKeyConfig
                useCustomKey={useCustomKey}
                customApiKey={customApiKey}
                onToggleCustomKey={toggleCustomKey}
                onCustomKeyChange={updateCustomKey}
                onStartSession={handleStartCall}
                isValidKey={hasValidKey}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </>
      )}

      {/* Session Management */}
      <div className="mb-8">
        <SessionManagement
          isSessionActive={isConnected}
          currentSessionId={currentSessionId}
          onSessionStart={(sessionId) => setCurrentSessionId(sessionId)}
          onSessionEnd={() => setCurrentSessionId(null)}
        />
      </div>
    </div>
  );
};

export default VoiceAgent;
