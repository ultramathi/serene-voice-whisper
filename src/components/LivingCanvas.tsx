
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Play, Pause, Volume2, VolumeOff, Grid3X3, X, Maximize, Minimize, Shuffle } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  mood: 'calm' | 'energetic' | 'mystical' | 'nature';
}

interface AmbientTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
  mood: 'calm' | 'energetic' | 'mystical' | 'nature';
  color: string;
}

const videos: Video[] = [
  { id: 23, title: "Desert Peace", url: "https://images.aiwallpaper.app/video%20(23).mp4", description: "Calm desert", mood: 'calm' },
  { id: 12, title: "Forest Meditation", url: "https://images.aiwallpaper.app/video%20(12).mp4", description: "Peaceful forest sounds", mood: 'nature' },
  { id: 13, title: "Mountain Serenity", url: "https://images.aiwallpaper.app/video%20(13).mp4", description: "Tranquil mountain views", mood: 'calm' },
  { id: 17, title: "Gentle Rain", url: "https://images.aiwallpaper.app/video%20(17).mp4", description: "Soothing rainfall", mood: 'calm' },
  { id: 19, title: "Sunset Glow", url: "https://images.aiwallpaper.app/video%20(19).mp4", description: "Beautiful sunset", mood: 'energetic' },
  { id: 2, title: "Flowing Water", url: "https://images.aiwallpaper.app/video%20(2).mp4", description: "Gentle water flow", mood: 'nature' },
  { id: 20, title: "Cloud Dance", url: "https://images.aiwallpaper.app/video%20(20).mp4", description: "Peaceful clouds", mood: 'mystical' },
  { id: 21, title: "Garden Zen", url: "https://images.aiwallpaper.app/video%20(21).mp4", description: "Serene garden", mood: 'nature' },
  { id: 22, title: "Aurora Beauty", url: "https://images.aiwallpaper.app/video%20(22).mp4", description: "Northern lights", mood: 'mystical' },
  { id: 24, title: "Mystic Waters", url: "https://images.aiwallpaper.app/video%20(24).mp4", description: "Mystical water scenes", mood: 'mystical' },
  { id: 25, title: "Forest Dreams", url: "https://images.aiwallpaper.app/video%20(25).mp4", description: "Dreamy forest", mood: 'nature' },
  { id: 26, title: "Ocean Depths", url: "https://images.aiwallpaper.app/video%20(26).mp4", description: "Deep ocean calm", mood: 'calm' },
  { id: 27, title: "Golden Hour", url: "https://images.aiwallpaper.app/video%20(27).mp4", description: "Golden light energy", mood: 'energetic' },
  { id: 28, title: "Starlight", url: "https://images.aiwallpaper.app/video%20(28).mp4", description: "Mystical starlight", mood: 'mystical' },
  { id: 29, title: "River Flow", url: "https://images.aiwallpaper.app/video%20(29).mp4", description: "Peaceful river", mood: 'nature' },
  { id: 3, title: "Peaceful Lake", url: "https://images.aiwallpaper.app/video%20(3).mp4", description: "Still lake waters", mood: 'calm' },
  { id: 30, title: "Wind Dance", url: "https://images.aiwallpaper.app/video%20(30).mp4", description: "Dancing in the wind", mood: 'energetic' },
  { id: 31, title: "Crystal Cave", url: "https://images.aiwallpaper.app/video%20(31).mp4", description: "Mystical crystal cave", mood: 'mystical' },
  { id: 32, title: "Bamboo Grove", url: "https://images.aiwallpaper.app/video%20(32).mp4", description: "Zen bamboo forest", mood: 'nature' },
  { id: 33, title: "Peaceful Shore", url: "https://images.aiwallpaper.app/video%20(33).mp4", description: "Calm shoreline", mood: 'calm' },
  { id: 34, title: "Fire Dance", url: "https://images.aiwallpaper.app/video%20(34).mp4", description: "Energetic flames", mood: 'energetic' },
  { id: 35, title: "Moonlight", url: "https://images.aiwallpaper.app/video%20(35).mp4", description: "Mystical moonlight", mood: 'mystical' },
  { id: 36, title: "Garden Path", url: "https://images.aiwallpaper.app/video%20(36).mp4", description: "Nature's pathway", mood: 'nature' },
  { id: 37, title: "Still Waters", url: "https://images.aiwallpaper.app/video%20(37).mp4", description: "Perfectly calm", mood: 'calm' },
  { id: 38, title: "Solar Flare", url: "https://images.aiwallpaper.app/video%20(38).mp4", description: "Energetic solar burst", mood: 'energetic' },
  { id: 39, title: "Spirit Lights", url: "https://images.aiwallpaper.app/video%20(39).mp4", description: "Mystical spirit dance", mood: 'mystical' },
  { id: 4, title: "Woodland Peace", url: "https://images.aiwallpaper.app/video%20(4).mp4", description: "Peaceful woodland", mood: 'nature' },
  { id: 40, title: "Misty Morning", url: "https://images.aiwallpaper.app/video%20(40).mp4", description: "Calm morning mist", mood: 'calm' },
  { id: 41, title: "Electric Storm", url: "https://images.aiwallpaper.app/video%20(41).mp4", description: "Energetic lightning", mood: 'energetic' },
  { id: 42, title: "Cosmic Dance", url: "https://images.aiwallpaper.app/video%20(42).mp4", description: "Mystical cosmos", mood: 'mystical' },
  { id: 5, title: "Fresh Spring", url: "https://images.aiwallpaper.app/video%20(5).mp4", description: "Spring nature", mood: 'nature' },
  { id: 6, title: "Tranquil Pool", url: "https://images.aiwallpaper.app/video%20(6).mp4", description: "Calm water pool", mood: 'calm' },
  { id: 7, title: "Sunrise Energy", url: "https://images.aiwallpaper.app/video%20(7).mp4", description: "Energetic sunrise", mood: 'energetic' },
  { id: 8, title: "Magic Forest", url: "https://images.aiwallpaper.app/video%20(8).mp4", description: "Mystical forest", mood: 'mystical' }
];

const ambientTracks: AmbientTrack[] = [
  { id: 'fire', name: 'Fire Crackling', url: 'https://images.aiwallpaper.app/music/fire.mp3', icon: '🔥', mood: 'energetic', color: 'from-orange-400 to-red-500' },
  { id: 'rain', name: 'Rain Sounds', url: 'https://images.aiwallpaper.app/music/rain.mp3', icon: '🌧️', mood: 'calm', color: 'from-blue-400 to-indigo-500' },
  { id: 'waves', name: 'Ocean Waves', url: 'https://images.aiwallpaper.app/music/waves.mp3', icon: '🌊', mood: 'calm', color: 'from-cyan-400 to-blue-500' },
  { id: 'waterflow', name: 'Water Flow', url: 'https://images.aiwallpaper.app/music/waterflow.mp3', icon: '💧', mood: 'nature', color: 'from-teal-400 to-green-500' },
  { id: 'lofi_3', name: 'Lo-fi Chill', url: 'https://images.aiwallpaper.app/music/lofi_3.mp3', icon: '🎵', mood: 'mystical', color: 'from-purple-400 to-pink-500' },
  { id: 'lofi_4', name: 'Lo-fi Smooth', url: 'https://images.aiwallpaper.app/music/lofi_4.mp3', icon: '🎶', mood: 'calm', color: 'from-violet-400 to-purple-500' },
  { id: 'lofi_7', name: 'Lo-fi Dreams', url: 'https://images.aiwallpaper.app/music/lofi_7.mp3', icon: '🎼', mood: 'mystical', color: 'from-indigo-400 to-purple-500' },
  { id: 'lofi_8', name: 'Lo-fi Zen', url: 'https://images.aiwallpaper.app/music/lofi_8.mp3', icon: '🎹', mood: 'nature', color: 'from-green-400 to-teal-500' }
];

const LivingCanvas = () => {
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0]);
  const [playingTracks, setPlayingTracks] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('canvasVolumes');
    let savedVolumes = {};
    
    try {
      savedVolumes = saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn('Failed to parse saved volumes, using defaults');
      savedVolumes = {};
    }
    
    // Create default volumes and merge with saved volumes
    const defaultVolumes = ambientTracks.reduce((acc, track) => ({ ...acc, [track.id]: 50 }), {});
    
    // Merge saved volumes with defaults, ensuring all tracks have valid volume values
    const mergedVolumes = { ...defaultVolumes };
    
    Object.keys(savedVolumes).forEach(trackId => {
      const savedVolume = savedVolumes[trackId];
      if (typeof savedVolume === 'number' && !isNaN(savedVolume) && isFinite(savedVolume)) {
        mergedVolumes[trackId] = Math.max(0, Math.min(100, savedVolume));
      }
    });
    
    return mergedVolumes;
  });
  const [showVideoSelector, setShowVideoSelector] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [shuffledVideos, setShuffledVideos] = useState<Video[]>(videos);
  
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    localStorage.setItem('canvasVolumes', JSON.stringify(volumes));
  }, [volumes]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRandomVideo = (): Video => {
    const availableVideos = videos.filter(video => video.id !== currentVideo.id);
    return availableVideos[Math.floor(Math.random() * availableVideos.length)];
  };

  const toggleTrack = async (trackId: string) => {
    const audio = audioRefs.current[trackId];
    if (!audio) {
      console.error(`Audio element not found for track: ${trackId}`);
      return;
    }

    try {
      if (playingTracks.has(trackId)) {
        console.log(`Pausing track: ${trackId}`);
        audio.pause();
        setPlayingTracks(prev => {
          const newSet = new Set(prev);
          newSet.delete(trackId);
          return newSet;
        });
      } else {
        console.log(`Playing track: ${trackId}`);
        await audio.play();
        setPlayingTracks(prev => new Set(prev).add(trackId));
      }
    } catch (error) {
      console.error(`Error toggling track ${trackId}:`, error);
      setPlayingTracks(prev => {
        const newSet = new Set(prev);
        newSet.delete(trackId);
        return newSet;
      });
    }
  };

  const setTrackVolume = (trackId: string, volume: number) => {
    // Validate volume value
    const validVolume = Math.max(0, Math.min(100, volume));
    
    setVolumes(prev => ({ ...prev, [trackId]: validVolume }));
    
    const audio = audioRefs.current[trackId];
    if (audio) {
      const normalizedVolume = validVolume / 100;
      if (isFinite(normalizedVolume)) {
        audio.volume = normalizedVolume;
        console.log(`Set volume for ${trackId} to ${normalizedVolume}`);
      }
    }
  };

  const changeVideo = (video: Video) => {
    setCurrentVideo(video);
    setShowVideoSelector(false);
    
    // Auto-suggest matching audio tracks
    const matchingTracks = ambientTracks.filter(track => track.mood === video.mood);
    if (matchingTracks.length > 0 && playingTracks.size === 0) {
      const randomTrack = matchingTracks[Math.floor(Math.random() * matchingTracks.length)];
      setTimeout(() => toggleTrack(randomTrack.id), 500);
    }
  };

  const selectRandomVideo = () => {
    const randomVideo = getRandomVideo();
    changeVideo(randomVideo);
  };

  const shuffleVideoGrid = () => {
    setShuffledVideos(shuffleArray(videos));
  };

  const toggleFullscreen = () => {
    const canvasElement = document.getElementById('living-canvas');
    if (!canvasElement) return;

    if (!document.fullscreenElement) {
      canvasElement.requestFullscreen().then(() => {
        setShowFullscreen(true);
      }).catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setShowFullscreen(false);
      });
    }
  };

  const getSuggestedTracks = () => {
    return ambientTracks.filter(track => track.mood === currentVideo.mood);
  };

  return (
    <div id="living-canvas" className="relative min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        key={currentVideo.id}
      >
        <source src={currentVideo.url} type="video/mp4" />
      </video>

      {/* Overlay with backdrop blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Floating Controls - Hidden in Zen Mode */}
      {!zenMode && (
        <>
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <h3 className="text-white font-medium text-sm">{currentVideo.title}</h3>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectRandomVideo}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full h-10 w-10 p-0"
                title="Random Video"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVideoSelector(true)}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full h-10 w-10 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full h-10 w-10 p-0"
              >
                {showFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Floating Audio Bubbles */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ambientTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`relative group transition-all duration-500 ${
                    playingTracks.has(track.id) ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Sound Bubble */}
                  <div className={`
                    relative p-4 rounded-2xl backdrop-blur-lg border border-white/20 transition-all duration-300
                    ${playingTracks.has(track.id) 
                      ? `bg-gradient-to-br ${track.color} bg-opacity-40 shadow-lg shadow-white/10` 
                      : 'bg-white/10 hover:bg-white/15'
                    }
                  `}>
                    {/* Play/Pause Button */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{track.icon}</span>
                        <span className="text-white text-sm font-medium">{track.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTrack(track.id)}
                        className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                      >
                        {playingTracks.has(track.id) ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-3 w-3 text-white/80" />
                      <Slider
                        value={[volumes[track.id] || 50]}
                        onValueChange={(value) => setTrackVolume(track.id, value[0])}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-white/80 w-8 text-right">
                        {volumes[track.id] || 50}%
                      </span>
                    </div>

                    {/* Audio Element */}
                    <audio
                      ref={(el) => {
                        if (el) {
                          audioRefs.current[track.id] = el;
                          // Ensure we have a valid volume value before setting it
                          const trackVolume = volumes[track.id];
                          if (typeof trackVolume === 'number' && isFinite(trackVolume)) {
                            el.volume = Math.max(0, Math.min(1, trackVolume / 100));
                          } else {
                            el.volume = 0.5; // Default to 50%
                          }
                        }
                      }}
                      loop
                      preload="auto"
                      onLoadedData={() => {
                        console.log(`Audio loaded for track: ${track.id}`);
                      }}
                      onError={(e) => {
                        console.error(`Audio error for track ${track.id}:`, e);
                      }}
                      onEnded={() => {
                        console.log(`Audio ended for track: ${track.id}`);
                        setPlayingTracks(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(track.id);
                          return newSet;
                        });
                      }}
                      onPause={() => {
                        console.log(`Audio paused for track: ${track.id}`);
                      }}
                      onPlay={() => {
                        console.log(`Audio playing for track: ${track.id}`);
                      }}
                    >
                      <source src={track.url} type="audio/mpeg" />
                    </audio>

                    {/* Pulsing animation for active tracks */}
                    {playingTracks.has(track.id) && (
                      <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse pointer-events-none" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Tracks Hint */}
          {getSuggestedTracks().length > 0 && playingTracks.size === 0 && (
            <div className="absolute bottom-6 right-6 z-30">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 animate-pulse">
                <span className="text-white text-xs">💡 Try {getSuggestedTracks()[0].name} with this scene</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Zen Mode Toggle */}
      <div className="absolute bottom-4 right-4 z-30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZenMode(!zenMode)}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full px-4 py-2"
        >
          {zenMode ? 'Exit Zen' : 'Zen Mode'}
        </Button>
      </div>

      {/* Video Selector Modal */}
      <Dialog open={showVideoSelector} onOpenChange={setShowVideoSelector}>
        <DialogContent className="max-w-6xl bg-black/90 backdrop-blur-lg border-white/20">
          <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="text-white text-xl font-semibold">Choose Your Scene</h2>
            <Button
              onClick={shuffleVideoGrid}
              variant="ghost"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-h-[70vh] overflow-y-auto">
            {shuffledVideos.map((video) => (
              <div
                key={video.id}
                className="relative group cursor-pointer"
                onClick={() => changeVideo(video)}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-white font-medium text-sm">{video.title}</h4>
                  <p className="text-white/80 text-xs">{video.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                    video.mood === 'calm' ? 'bg-blue-500/30 text-blue-200' :
                    video.mood === 'energetic' ? 'bg-orange-500/30 text-orange-200' :
                    video.mood === 'mystical' ? 'bg-purple-500/30 text-purple-200' :
                    'bg-green-500/30 text-green-200'
                  }`}>
                    {video.mood}
                  </span>
                </div>
                {currentVideo.id === video.id && (
                  <div className="absolute inset-0 border-2 border-white rounded-lg" />
                )}
              </div>
            ))}
          </div>
          <DialogClose className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2">
            <X className="h-4 w-4 text-white" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LivingCanvas;
