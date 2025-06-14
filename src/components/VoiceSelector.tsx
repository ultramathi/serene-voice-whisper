
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  age: string;
  characteristics: string;
}

export const voices: Voice[] = [
  {
    id: "Hana",
    name: "Hana",
    gender: "Female",
    accent: "American",
    age: "22",
    characteristics: "Soft, soothing, gentle"
  },
  {
    id: "Neha",
    name: "Neha",
    gender: "Female",
    accent: "Indian American",
    age: "30",
    characteristics: "Professional, charming"
  },
  {
    id: "Cole",
    name: "Cole",
    gender: "Male",
    accent: "American",
    age: "22",
    characteristics: "Deeper tone, calming, professional"
  },
  {
    id: "Spencer",
    name: "Spencer",
    gender: "Female",
    accent: "American",
    age: "26",
    characteristics: "Energetic, quippy, lighthearted, cheeky, amused"
  }
];

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
  disabled?: boolean;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoice,
  onVoiceChange,
  disabled = false
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Choose Your Meditation Guide Voice</h3>
        <RadioGroup
          value={selectedVoice}
          onValueChange={onVoiceChange}
          disabled={disabled}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {voices.map((voice) => (
            <div key={voice.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors">
              <RadioGroupItem value={voice.id} id={voice.id} className="mt-1" />
              <Label htmlFor={voice.id} className="flex-1 cursor-pointer">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{voice.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {voice.gender} • {voice.accent} • Age {voice.age}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                    {voice.characteristics}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default VoiceSelector;
