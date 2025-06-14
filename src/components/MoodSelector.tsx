
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodLevel } from '../types/session';

interface MoodSelectorProps {
  title: string;
  selectedMood?: MoodLevel;
  onMoodSelect: (mood: MoodLevel) => void;
  disabled?: boolean;
}

const moodLevels: MoodLevel[] = [
  { value: 1, label: "Very Low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Somewhat Low" },
  { value: 4, label: "Below Average" },
  { value: 5, label: "Neutral" },
  { value: 6, label: "Somewhat Good" },
  { value: 7, label: "Good" },
  { value: 8, label: "Very Good" },
  { value: 9, label: "Excellent" },
  { value: 10, label: "Outstanding" }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  title, 
  selectedMood, 
  onMoodSelect, 
  disabled = false 
}) => {
  const getMoodEmoji = (value: number) => {
    if (value <= 2) return "😢";
    if (value <= 4) return "😕";
    if (value <= 6) return "😐";
    if (value <= 8) return "🙂";
    return "😊";
  };

  const getMoodColor = (value: number, isSelected: boolean) => {
    if (disabled && !isSelected) return "bg-gray-100 text-gray-400 cursor-not-allowed";
    if (isSelected) {
      if (value <= 3) return "bg-red-500 text-white";
      if (value <= 5) return "bg-yellow-500 text-white";
      if (value <= 7) return "bg-blue-500 text-white";
      return "bg-green-500 text-white";
    }
    
    if (value <= 3) return "bg-red-50 text-red-700 hover:bg-red-100";
    if (value <= 5) return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
    if (value <= 7) return "bg-blue-50 text-blue-700 hover:bg-blue-100";
    return "bg-green-50 text-green-700 hover:bg-green-100";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {moodLevels.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => !disabled && onMoodSelect(mood)}
              disabled={disabled && selectedMood?.value !== mood.value}
              className={`flex flex-col items-center p-2 h-auto transition-all ${getMoodColor(
                mood.value, 
                selectedMood?.value === mood.value
              )}`}
              variant="outline"
            >
              <span className="text-lg mb-1">{getMoodEmoji(mood.value)}</span>
              <span className="text-xs font-medium">{mood.value}</span>
              <span className="text-xs text-center leading-tight">{mood.label}</span>
            </Button>
          ))}
        </div>
        {selectedMood && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selected: {getMoodEmoji(selectedMood.value)} {selectedMood.label} ({selectedMood.value}/10)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
