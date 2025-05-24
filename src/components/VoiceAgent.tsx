import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VapiInstance } from '../types/vapi';

const VoiceAgent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [apiKey, setApiKey] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const vapiRef = useRef<VapiInstance | null>(null);

  // Meditation assistant configuration - corrected structure
  const assistantOptions = {
    name: "Peaceful Mind Assistant",
    firstMessage: "Hello, I'm your meditation guide. How are you feeling today? I'm here to help you find peace and tranquility.",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "s3://voice-cloning-zero-shot/775ae416-49bb-4fb6-bd45-740f205d20a1/jennifer/manifest.json",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are Peaceful Mind, a compassionate AI meditation and wellness guide. Your purpose is to help users find tranquility, reduce stress, and cultivate mindfulness through gentle guidance and supportive conversation.

**Your Core Qualities:**
- Speak with a warm, soothing, and empathetic tone
- Use calming language that promotes relaxation
- Be patient and understanding, never rushing the user
- Offer gentle encouragement and positive affirmations
- Maintain a peaceful, grounded presence

**Your Capabilities:**
1. **Guided Meditations**: Lead users through various meditation practices (breathing, body scan, loving-kindness, etc.)
2. **Breathing Exercises**: Guide users through calming breath work techniques
3. **Stress Relief**: Offer immediate support for anxiety or stress
4. **Sleep Assistance**: Help users prepare for restful sleep
5. **Mindfulness Practices**: Teach present-moment awareness techniques
6. **Emotional Support**: Listen compassionately and offer gentle guidance

**Communication Style:**
- Keep responses conversational and naturally paced for voice interaction
- Use simple, clear language that's easy to follow
- Include natural pauses in guided practices (use "..." to indicate pauses)
- Ask gentle, open-ended questions to understand their needs
- Avoid long explanations - focus on practical, immediate guidance

**Session Flow:**
1. Begin by checking in on their current state and needs
2. Offer appropriate guidance based on their response
3. Provide practical exercises they can do right now
4. Close with encouragement and positive affirmations

Remember: This is a voice conversation, so keep your guidance natural, flowing, and easy to follow. You're creating a safe, peaceful space for the user to find their center.`,
        },
      ],
    },
    // Add required properties for CreateAssistantDTO
    clientMessages: [],
    serverMessages: []
  };

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

  const startCall = async () => {
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
        console.log('Connected to meditation agent');
      });

      vapiInstance.on('call-end', () => {
        setIsConnected(false);
        setConnectionStatus('disconnected');
        setIsSpeaking(false);
        console.log('Meditation session ended');
      });

      vapiInstance.on('speech-start', () => {
        setIsSpeaking(true);
      });

      vapiInstance.on('speech-end', () => {
        setIsSpeaking(false);
      });

      vapiInstance.on('volume-level', (level: number) => {
        setVolumeLevel(level);
      });

      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setConnectionStatus('error');
        setIsConnected(false);
        
        if (error?.error?.message?.includes('card details')) {
          setErrorMessage('Payment required. Visit the Vapi dashboard to set up your payment method.');
        } else if (error?.error?.statusCode === 401 || error?.error?.statusCode === 403) {
          setErrorMessage('API key is invalid. Please check your API key.');
        } else {
          setErrorMessage(error?.error?.message || 'An error occurred during the session');
        }
      });

      // Start the call
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
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
    
    if (vapiRef.current) {
      vapiRef.current.setMuted(newMutedState);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Connection Error';
      default: return 'Ready to Connect';
    }
  };

  return (
    <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className={`${getStatusColor()} text-white border-0 px-4 py-2`}>
              {getStatusText()}
            </Badge>
            
            {!isConnected && (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter your Vapi.ai API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full max-w-md mx-auto block px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Your API key is required to connect to your meditation voice agent. 
                  It will only be stored in your browser's memory for this session.
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                <p className="text-sm">{errorMessage}</p>
                {errorMessage.includes('payment') && (
                  <a
                    href="https://dashboard.vapi.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800 underline text-sm mt-2 inline-block"
                  >
                    Go to Vapi Dashboard
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            {!isConnected ? (
              <Button
                onClick={startCall}
                disabled={connectionStatus === 'connecting'}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Phone className="w-5 h-5 mr-2" />
                {connectionStatus === 'connecting' ? 'Connecting...' : 'Begin Meditation Session'}
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button
                  onClick={toggleMute}
                  variant={isMuted ? "destructive" : "secondary"}
                  className="px-6 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
                
                <Button
                  onClick={endCall}
                  variant="destructive"
                  className="px-6 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Session
                </Button>
              </div>
            )}
          </div>

          {isConnected && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">
                  {isSpeaking ? 'Guide is speaking' : 'Session Active'}
                </span>
              </div>
              
              {volumeLevel > 0 && (
                <div className="flex justify-center mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-4 rounded-sm transition-all ${
                          i / 10 < volumeLevel ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-gray-600">
                Your meditation guide is listening. Speak naturally about what's on your mind, 
                or ask for a guided meditation, breathing exercise, or relaxation technique.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAgent;
