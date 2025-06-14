
import { useState, useEffect } from 'react';

interface VolumeState {
  volume: number;
  muted: boolean;
}

export const useVolumeControl = (key: string, defaultVolume: number = 70) => {
  const [volumeState, setVolumeState] = useState<VolumeState>(() => {
    const saved = localStorage.getItem(`volume-${key}`);
    return saved ? JSON.parse(saved) : { volume: defaultVolume, muted: false };
  });

  useEffect(() => {
    localStorage.setItem(`volume-${key}`, JSON.stringify(volumeState));
  }, [key, volumeState]);

  const setVolume = (volume: number) => {
    setVolumeState(prev => ({ ...prev, volume }));
  };

  const toggleMute = () => {
    setVolumeState(prev => ({ ...prev, muted: !prev.muted }));
  };

  const setMuted = (muted: boolean) => {
    setVolumeState(prev => ({ ...prev, muted }));
  };

  return {
    volume: volumeState.volume,
    muted: volumeState.muted,
    setVolume,
    toggleMute,
    setMuted,
    effectiveVolume: volumeState.muted ? 0 : volumeState.volume,
  };
};
