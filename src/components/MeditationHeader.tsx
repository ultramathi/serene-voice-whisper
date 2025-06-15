
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const MeditationHeader = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-purple-400 absolute -top-2 -left-2 animate-pulse" />
          <Heart className="w-12 h-12 text-indigo-600" />
          <Sparkles className="w-6 h-6 text-pink-400 absolute -bottom-1 -right-1 animate-pulse delay-300" />
        </div>
      </div>
      
      <div className="mb-8">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
        >
          <source src="https://vapi.mathivanan.com/video%20(41).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <h1 className="text-5xl font-light text-gray-800 dark:text-white mb-4 tracking-wide">
        Peaceful Mind
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Your personal AI meditation guide. Experience tranquility through gentle voice guidance, 
        breathing exercises, and mindful conversations designed to bring peace to your day.
      </p>
    </header>
  );
};

export default MeditationHeader;
