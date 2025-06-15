
import { useState, useEffect } from 'react';

const DEFAULT_API_KEY = '6b92dc77-12db-4aa8-b204-8d5d37ea728b';

export const useApiKeyStorage = () => {
  const [apiKey, setApiKey] = useState('');
  const [useCustomKey, setUseCustomKey] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');

  useEffect(() => {
    // Load custom key preference from localStorage
    const savedUseCustom = localStorage.getItem('useCustomVapiKey') === 'true';
    const savedCustomKey = localStorage.getItem('customVapiKey') || '';
    
    setUseCustomKey(savedUseCustom);
    setCustomApiKey(savedCustomKey);
    
    // Set the active API key
    if (savedUseCustom && savedCustomKey) {
      setApiKey(savedCustomKey);
    } else {
      setApiKey(DEFAULT_API_KEY);
    }
  }, []);

  const updateCustomKey = (key: string) => {
    setCustomApiKey(key);
    localStorage.setItem('customVapiKey', key);
    if (useCustomKey) {
      setApiKey(key);
    }
  };

  const toggleCustomKey = (enabled: boolean) => {
    setUseCustomKey(enabled);
    localStorage.setItem('useCustomVapiKey', enabled.toString());
    
    if (enabled && customApiKey) {
      setApiKey(customApiKey);
    } else {
      setApiKey(DEFAULT_API_KEY);
    }
  };

  const isValidKey = (key: string) => {
    return key.length > 20 && key.includes('-');
  };

  return {
    apiKey,
    useCustomKey,
    customApiKey,
    updateCustomKey,
    toggleCustomKey,
    isValidKey,
    hasValidKey: isValidKey(apiKey),
  };
};
