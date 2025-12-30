import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free futuristic track
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeIn = () => {
    if (!audioRef.current) return;
    
    let currentVolume = 0;
    audioRef.current.volume = 0;
    audioRef.current.play();

    fadeIntervalRef.current = setInterval(() => {
      if (currentVolume < volume) {
        currentVolume = Math.min(currentVolume + 0.02, volume);
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 50);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;

    let currentVolume = audioRef.current.volume;

    fadeIntervalRef.current = setInterval(() => {
      if (currentVolume > 0) {
        currentVolume = Math.max(currentVolume - 0.02, 0);
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 50);
  };

  const toggleMusic = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = volume;
    }
  }, [volume, isPlaying]);

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
