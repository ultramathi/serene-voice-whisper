
import React from 'react';
import { Waves, Wind, Zap, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Waves,
    title: "Guided Meditations",
    description: "Personalized meditation sessions tailored to your current emotional state and needs."
  },
  {
    icon: Wind,
    title: "Breathing Exercises",
    description: "AI-guided breathing techniques to help you find calm and center yourself."
  },
  {
    icon: Zap,
    title: "Stress Relief",
    description: "Immediate support for moments of anxiety or stress with proven relaxation methods."
  },
  {
    icon: Moon,
    title: "Sleep Assistance",
    description: "Gentle guidance to help you unwind and prepare for restful sleep."
  }
];

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {features.map((feature, index) => (
        <Card key={index} className="text-center shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
                <feature.icon className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-medium text-gray-800">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
