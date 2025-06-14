
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AmbientTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const ambientTracks: AmbientTrack[] = [
  { id: 'fire', name: 'Fire Crackling', url: 'https://images.aiwallpaper.app/music/fire.mp3', icon: '🔥' },
  { id: 'rain', name: 'Rain Sounds', url: 'https://images.aiwallpaper.app/music/rain.mp3', icon: '🌧️' },
  { id: 'waves', name: 'Ocean Waves', url: 'https://images.aiwallpaper.app/music/waves.mp3', icon: '🌊' },
  { id: 'waterflow', name: 'Water Flow', url: 'https://images.aiwallpaper.app/music/waterflow.mp3', icon: '💧' },
  { id: 'lofi_3', name: 'Lo-fi Chill', url: 'https://images.aiwallpaper.app/music/lofi_3.mp3', icon: '🎵' },
  { id: 'lofi_4', name: 'Lo-fi Smooth', url: 'https://images.aiwallpaper.app/music/lofi_4.mp3', icon: '🎶' },
  { id: 'lofi_7', name: 'Lo-fi Calm', url: 'https://images.aiwallpaper.app/music/lofi_7.mp3', icon: '🎼' },
  { id: 'lofi_8', name: 'Lo-fi Peace', url: 'https://images.aiwallpaper.app/music/lofi_8.mp3', icon: '🎹' },
];

const AmbientAudio = () => {
  const [playingTracks, setPlayingTracks] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ambientVolumes');
    return saved ? JSON.parse(saved) : ambientTracks.reduce((acc, track) => ({ ...acc, [track.id]: 50 }), {});
  });
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    localStorage.setItem('ambientVolumes', JSON.stringify(volumes));
  }, [volumes]);

  const toggleTrack = (trackId: string) => {
    const audio = audioRefs.current[trackId];
    if (!audio) return;

    if (playingTracks.has(trackId)) {
      audio.pause();
      setPlayingTracks(prev => {
        const newSet = new Set(prev);
        newSet.delete(trackId);
        return newSet;
      });
    } else {
      audio.play();
      setPlayingTracks(prev => new Set(prev).add(trackId));
    }
  };

  const setTrackVolume = (trackId: string, volume: number) => {
    setVolumes(prev => ({ ...prev, [trackId]: volume }));
    const audio = audioRefs.current[trackId];
    if (audio) {
      audio.volume = volume / 100;
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Ambient Sounds</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Layer ambient sounds with your meditation session
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ambientTracks.map((track) => (
            <div key={track.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{track.icon}</span>
                  <span className="font-medium text-sm">{track.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTrack(track.id)}
                  className="h-8 w-8 p-0"
                >
                  {playingTracks.has(track.id) ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="h-3 w-3 text-gray-500" />
                <Slider
                  value={[volumes[track.id]]}
                  onValueChange={(value) => setTrackVolume(track.id, value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500 w-8 text-right">
                  {volumes[track.id]}%
                </span>
              </div>
              
              <audio
                ref={(el) => {
                  if (el) {
                    audioRefs.current[track.id] = el;
                    el.volume = volumes[track.id] / 100;
                  }
                }}
                loop
                preload="metadata"
                onEnded={() => {
                  setPlayingTracks(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(track.id);
                    return newSet;
                  });
                }}
              >
                <source src={track.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbientAudio;
