
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ExternalLink, Key, Shield } from 'lucide-react';

interface ApiKeyConfigProps {
  useCustomKey: boolean;
  customApiKey: string;
  onToggleCustomKey: (enabled: boolean) => void;
  onCustomKeyChange: (key: string) => void;
  onStartSession: () => void;
  isValidKey: boolean;
  errorMessage?: string;
  connectionStatus: string;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({
  useCustomKey,
  customApiKey,
  onToggleCustomKey,
  onCustomKeyChange,
  onStartSession,
  isValidKey,
  errorMessage,
  connectionStatus,
}) => {
  const isConnecting = connectionStatus === 'connecting';
  const hasCustomKeyValue = customApiKey.trim().length > 0;
  const isCustomKeyValid = hasCustomKeyValue && isValidKey;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-3 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ready to Begin
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start your meditation session or configure your own API key
          </p>
        </div>

        {/* Quick Start Option */}
        <div className="space-y-4">
          <Button
            onClick={onStartSession}
            disabled={!isValidKey || isConnecting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Key className="w-5 h-5 mr-2" />
                Start Meditation Session
              </>
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Using secure default configuration
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
              Or
            </span>
          </div>
        </div>

        {/* Custom API Key Option */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="custom-key-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Use my own API key
            </label>
            <Switch
              id="custom-key-toggle"
              checked={useCustomKey}
              onCheckedChange={onToggleCustomKey}
            />
          </div>

          {useCustomKey && (
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Enter your Vapi.ai API key"
                value={customApiKey}
                onChange={(e) => onCustomKeyChange(e.target.value)}
                className="w-full"
              />
              
              <div className="flex items-center justify-between text-xs">
                <a
                  href="https://dashboard.vapi.ai/org/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                >
                  Get API Key <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                
                {isCustomKeyValid && (
                  <span className="text-green-600 dark:text-green-400">✓ Valid</span>
                )}
              </div>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyConfig;
