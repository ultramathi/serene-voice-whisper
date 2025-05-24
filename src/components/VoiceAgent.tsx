
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VoiceAgent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [apiKey, setApiKey] = useState('');
  const vapiRef = useRef<any>(null);

  // Initialize Vapi
  useEffect(() => {
    if (typeof window !== 'undefined' && window.vapi) {
      console.log('Vapi SDK loaded');
    }
  }, []);

  const startCall = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your Vapi.ai API key first');
      return;
    }

    try {
      // This is where you would initialize Vapi with your specific agent configuration
      console.log('Starting meditation session with Vapi.ai...');
      setConnectionStatus('connecting');
      
      // Simulate connection for demo purposes
      // In real implementation, you would use:
      // const vapi = new Vapi(apiKey);
      // await vapi.start(assistantId);
      
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        console.log('Connected to meditation agent');
      }, 2000);

    } catch (error) {
      console.error('Failed to start meditation session:', error);
      setConnectionStatus('error');
    }
  };

  const endCall = () => {
    console.log('Ending meditation session...');
    setIsConnected(false);
    setConnectionStatus('disconnected');
    
    // In real implementation:
    // if (vapiRef.current) {
    //   vapiRef.current.stop();
    // }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(`Microphone ${!isMuted ? 'muted' : 'unmuted'}`);
    
    // In real implementation:
    // if (vapiRef.current) {
    //   vapiRef.current.setMuted(!isMuted);
    // }
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
                <span className="text-green-700 font-medium">Session Active</span>
              </div>
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
