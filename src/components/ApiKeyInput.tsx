
import React from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  errorMessage: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange, errorMessage }) => {
  return (
    <div className="space-y-4">
      <input
        type="password"
        placeholder="Enter your Vapi.ai API key"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        className="w-full max-w-md mx-auto block px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Your API key is required to connect to your meditation voice agent. 
        It will only be stored in your browser's memory for this session.
      </p>
      
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
  );
};

export default ApiKeyInput;
