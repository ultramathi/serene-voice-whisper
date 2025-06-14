
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeOff } from 'lucide-react';

interface VolumeControlProps {
  label: string;
  volume: number;
  onVolumeChange: (volume: number) => void;
  muted: boolean;
  onMuteToggle: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  label,
  volume,
  onVolumeChange,
  muted,
  onMuteToggle,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMuteToggle}
              className="h-8 w-8 p-0"
            >
              {muted ? <VolumeOff className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="px-2">
            <Slider
              value={[muted ? 0 : volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={100}
              step={1}
              className="w-full"
              disabled={muted}
            />
          </div>
          <div className="text-xs text-gray-500 text-center">
            {muted ? 'Muted' : `${Math.round(volume)}%`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolumeControl;
