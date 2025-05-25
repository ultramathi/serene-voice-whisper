
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  connectionStatus: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ connectionStatus }) => {
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
    <Badge variant="outline" className={`${getStatusColor()} text-white border-0 px-4 py-2`}>
      {getStatusText()}
    </Badge>
  );
};

export default ConnectionStatus;
