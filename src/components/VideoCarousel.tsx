
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const VideoCarousel = () => {
  const videos = [
    {
      id: 1,
      title: "Ocean Waves",
      url: "https://vapi.mathivanan.com/video%20(41).mp4",
      description: "Calming ocean waves for deep relaxation"
    },
    {
      id: 2,
      title: "Forest Meditation",
      url: "https://vapi.mathivanan.com/video%20(41).mp4",
      description: "Peaceful forest sounds for mindfulness"
    },
    {
      id: 3,
      title: "Mountain Serenity",
      url: "https://vapi.mathivanan.com/video%20(41).mp4",
      description: "Tranquil mountain views for inner peace"
    },
    {
      id: 4,
      title: "Gentle Rain",
      url: "https://vapi.mathivanan.com/video%20(41).mp4",
      description: "Soothing rainfall for stress relief"
    }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Soothing Videos</h3>
        <p className="text-sm text-gray-600 mb-4">Watch these calming videos while talking with your meditation guide</p>
        
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <video 
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          className="w-full h-32 object-cover rounded-lg"
                        >
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div>
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                          <p className="text-xs text-gray-500">{video.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default VideoCarousel;
