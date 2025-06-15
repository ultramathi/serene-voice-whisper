
import React from 'react';
import VoiceAgent from '../components/VoiceAgent';
import MeditationHeader from '../components/MeditationHeader';
import FeatureCards from '../components/FeatureCards';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <MeditationHeader />
        <div className="max-w-4xl mx-auto">
          <VoiceAgent />
          <FeatureCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
