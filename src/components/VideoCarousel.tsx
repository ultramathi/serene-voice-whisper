import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Maximize, Minimize } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
}

const VideoCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videos = [
    {
      id: 1,
      title: "Ocean Waves",
      url: "https://images.aiwallpaper.app/video%20(11).mp4",
      description: "Calming ocean waves for deep relaxation"
    },
    {
      id: 2,
      title: "Forest Meditation",
      url: "https://images.aiwallpaper.app/video%20(12).mp4",
      description: "Peaceful forest sounds for mindfulness"
    },
    {
      id: 3,
      title: "Mountain Serenity",
      url: "https://images.aiwallpaper.app/video%20(13).mp4",
      description: "Tranquil mountain views for inner peace"
    },
    {
      id: 4,
      title: "Gentle Rain",
      url: "https://images.aiwallpaper.app/video%20(17).mp4",
      description: "Soothing rainfall for stress relief"
    },
    {
      id: 5,
      title: "Sunset Glow",
      url: "https://images.aiwallpaper.app/video%20(19).mp4",
      description: "Beautiful sunset for evening meditation"
    },
    {
      id: 6,
      title: "Flowing Water",
      url: "https://images.aiwallpaper.app/video%20(2).mp4",
      description: "Gentle water flow for relaxation"
    },
    {
      id: 7,
      title: "Cloud Dance",
      url: "https://images.aiwallpaper.app/video%20(20).mp4",
      description: "Peaceful clouds drifting by"
    },
    {
      id: 8,
      title: "Garden Zen",
      url: "https://images.aiwallpaper.app/video%20(21).mp4",
      description: "Serene garden for mindful moments"
    },
    {
      id: 9,
      title: "Aurora Beauty",
      url: "https://images.aiwallpaper.app/video%20(22).mp4",
      description: "Northern lights for wonder"
    },
    {
      id: 10,
      title: "Desert Peace",
      url: "https://images.aiwallpaper.app/video%20(23).mp4",
      description: "Calm desert landscape"
    },
    {
      id: 11,
      title: "Misty Morning",
      url: "https://images.aiwallpaper.app/video%20(24).mp4",
      description: "Peaceful morning mist"
    },
    {
      id: 12,
      title: "River Flow",
      url: "https://images.aiwallpaper.app/video%20(25).mp4",
      description: "Gentle river current"
    },
    {
      id: 13,
      title: "Starry Night",
      url: "https://images.aiwallpaper.app/video%20(26).mp4",
      description: "Peaceful night sky"
    },
    {
      id: 14,
      title: "Wind Chimes",
      url: "https://images.aiwallpaper.app/video%20(27).mp4",
      description: "Gentle wind melody"
    },
    {
      id: 15,
      title: "Lotus Pond",
      url: "https://images.aiwallpaper.app/video%20(28).mp4",
      description: "Serene lotus flowers"
    },
    {
      id: 16,
      title: "Bamboo Grove",
      url: "https://images.aiwallpaper.app/video%20(29).mp4",
      description: "Peaceful bamboo forest"
    },
    {
      id: 17,
      title: "Waterfall",
      url: "https://images.aiwallpaper.app/video%20(3).mp4",
      description: "Cascading water sounds"
    },
    {
      id: 18,
      title: "Meadow Breeze",
      url: "https://images.aiwallpaper.app/video%20(30).mp4",
      description: "Gentle meadow winds"
    },
    {
      id: 19,
      title: "Pebble Beach",
      url: "https://images.aiwallpaper.app/video%20(31).mp4",
      description: "Soothing beach sounds"
    },
    {
      id: 20,
      title: "Fireflies",
      url: "https://images.aiwallpaper.app/video%20(32).mp4",
      description: "Magical evening lights"
    },
    {
      id: 21,
      title: "Crystal Cave",
      url: "https://images.aiwallpaper.app/video%20(33).mp4",
      description: "Mystical cave ambience"
    },
    {
      id: 22,
      title: "Lavender Field",
      url: "https://images.aiwallpaper.app/video%20(34).mp4",
      description: "Aromatic lavender breeze"
    },
    {
      id: 23,
      title: "Moonlight",
      url: "https://images.aiwallpaper.app/video%20(35).mp4",
      description: "Gentle moonlit scene"
    },
    {
      id: 24,
      title: "Zen Garden",
      url: "https://images.aiwallpaper.app/video%20(36).mp4",
      description: "Traditional zen space"
    },
    {
      id: 25,
      title: "Spring Rain",
      url: "https://images.aiwallpaper.app/video%20(37).mp4",
      description: "Fresh spring rainfall"
    },
    {
      id: 26,
      title: "Butterfly Garden",
      url: "https://images.aiwallpaper.app/video%20(38).mp4",
      description: "Colorful butterflies dancing"
    },
    {
      id: 27,
      title: "Enchanted Forest",
      url: "https://images.aiwallpaper.app/video%20(39).mp4",
      description: "Magical forest atmosphere"
    },
    {
      id: 28,
      title: "Autumn Leaves",
      url: "https://images.aiwallpaper.app/video%20(4).mp4",
      description: "Falling autumn colors"
    },
    {
      id: 29,
      title: "Winter Frost",
      url: "https://images.aiwallpaper.app/video%20(40).mp4",
      description: "Peaceful winter scene"
    },
    {
      id: 30,
      title: "Cherry Blossoms",
      url: "https://images.aiwallpaper.app/video%20(41).mp4",
      description: "Beautiful cherry petals"
    },
    {
      id: 31,
      title: "Peaceful Lake",
      url: "https://images.aiwallpaper.app/video%20(42).mp4",
      description: "Still lake reflection"
    },
    {
      id: 32,
      title: "Morning Dew",
      url: "https://images.aiwallpaper.app/video%20(5).mp4",
      description: "Fresh morning dewdrops"
    },
    {
      id: 33,
      title: "Golden Hour",
      url: "https://images.aiwallpaper.app/video%20(6).mp4",
      description: "Warm golden light"
    },
    {
      id: 34,
      title: "Coastal Waves",
      url: "https://images.aiwallpaper.app/video%20(7).mp4",
      description: "Rhythmic ocean waves"
    },
    {
      id: 35,
      title: "Forest Stream",
      url: "https://images.aiwallpaper.app/video%20(8).mp4",
      description: "Babbling forest brook"
    }
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    const videoElement = document.getElementById('modal-video');
    if (!videoElement) return;

    if (!document.fullscreenElement) {
      videoElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Soothing Videos</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Watch these calming videos while talking with your meditation guide</p>
          
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
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleVideoClick(video)}
                          >
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{video.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{video.description}</p>
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

      {/* Enhanced Lightbox Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black">
          <div className="relative" id="modal-video">
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              <DialogClose className="bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors">
                <X className="h-6 w-6 text-white" />
              </DialogClose>
            </div>
            {selectedVideo && (
              <div className="relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-auto max-h-[80vh] object-contain"
                >
                  <source src={selectedVideo.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                  <p className="text-white/80 text-sm">{selectedVideo.description}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCarousel;
