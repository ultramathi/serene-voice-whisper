
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceSelector from './VoiceSelector';
import VideoCarousel from './VideoCarousel';
import ConnectionStatus from './ConnectionStatus';
import ApiKeyInput from './ApiKeyInput';
import ConnectionControls from './ConnectionControls';
import SessionStatus from './SessionStatus';
import ChatWindow from './ChatWindow';
import { useVapiConnection } from '../hooks/useVapiConnection';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const VoiceAgent = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Hana');
  const [messages, setMessages] = useState<Message[]>([]);
  
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
    sendMessage,
    setOnMessageReceived,
  } = useVapiConnection();

  // Set up the message handler when component mounts
  useEffect(() => {
    setOnMessageReceived((messageText: string) => {
      handleAgentMessage(messageText);
    });
  }, []);

  const handleStartCall = () => {
    startCall(apiKey, selectedVoice);
    setMessages([]); // Clear previous messages when starting a new session
  };

  const handleSendMessage = (messageText: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Send message through Vapi
    if (sendMessage) {
      sendMessage(messageText);
    }
  };

  const handleAgentMessage = (messageText: string) => {
    // Add agent message to chat
    const agentMessage: Message = {
      id: Date.now().toString() + '_agent',
      text: messageText,
      sender: 'agent',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, agentMessage]);
  };

  return (
    <div>
      <VideoCarousel />
      
      <VoiceSelector
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        disabled={isConnected}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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

        <ChatWindow
          isConnected={isConnected}
          onSendMessage={handleSendMessage}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default VoiceAgent;
