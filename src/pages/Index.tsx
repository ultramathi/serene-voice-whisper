
import React from 'react';
import VoiceAgent from '../components/VoiceAgent';
import MeditationHeader from '../components/MeditationHeader';
import FeatureCards from '../components/FeatureCards';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
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
