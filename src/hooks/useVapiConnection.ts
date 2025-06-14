import { useState, useRef, useEffect } from 'react';
import type { VapiInstance } from '../types/vapi';
import { createAssistantOptions } from '../config/assistantConfig';

export const useVapiConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const vapiRef = useRef<VapiInstance | null>(null);

  // Initialize Vapi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@vapi-ai/web').then((module) => {
        console.log('Vapi SDK loaded successfully');
      }).catch(error => {
        console.error('Failed to load Vapi SDK:', error);
      });
    }
  }, []);

  const startCall = async (apiKey: string, selectedVoice: string) => {
    if (!apiKey.trim()) {
      setErrorMessage('Please enter your Vapi.ai API key first');
      return;
    }

    try {
      setConnectionStatus('connecting');
      setErrorMessage('');
      console.log('Starting meditation session with Vapi.ai...');

      // Import and initialize Vapi
      const { default: Vapi } = await import('@vapi-ai/web');
      const vapiInstance = new Vapi(apiKey);
      vapiRef.current = vapiInstance;

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        setSessionStartTime(new Date());
        console.log('Connected to meditation agent');
      });

      vapiInstance.on('call-end', () => {
        setIsConnected(false);
        setConnectionStatus('disconnected');
        setIsSpeaking(false);
        setSessionStartTime(null);
        console.log('Meditation session ended');
      });

      vapiInstance.on('speech-start', () => {
        setIsSpeaking(true);
        console.log('Agent started speaking');
      });

      vapiInstance.on('speech-end', () => {
        setIsSpeaking(false);
        console.log('Agent stopped speaking');
      });

      vapiInstance.on('volume-level', (level: number) => {
        setVolumeLevel(level);
      });

      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setConnectionStatus('error');
        setIsConnected(false);
        
        // Handle specific error types
        if (error?.error?.type === 'ejected') {
          setErrorMessage('Session was ended unexpectedly. This might be due to configuration issues or account limits.');
        } else if (error?.error?.message?.includes('card details')) {
          setErrorMessage('Payment required. Visit the Vapi dashboard to set up your payment method.');
        } else if (error?.error?.statusCode === 401 || error?.error?.statusCode === 403) {
          setErrorMessage('API key is invalid. Please check your API key.');
        } else {
          setErrorMessage(error?.error?.message || error?.errorMsg || 'An error occurred during the session');
        }
      });

      // Start the call with the selected voice
      const assistantOptions = createAssistantOptions(selectedVoice);
      await vapiInstance.start(assistantOptions);

    } catch (error) {
      console.error('Failed to start meditation session:', error);
      setConnectionStatus('error');
      setErrorMessage('Failed to connect. Please check your API key and try again.');
    }
  };

  const endCall = () => {
    console.log('Ending meditation session...');
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setSessionStartTime(null);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
    
    if (vapiRef.current) {
      vapiRef.current.setMuted(newMutedState);
    }
  };

  return {
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
  };
};
