import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// 1. IMPORT THE FILE HERE
// This tells the bundler to grab the file from the current folder
import energyFile from './energy.mp3'; 

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default max volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 2. USE THE IMPORTED VARIABLE HERE
    audioRef.current = new Audio(energyFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start at 0 for fade in

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
    
    // Clear any existing fade intervals
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    let currentVolume = audioRef.current.volume;
    audioRef.current.play().catch(e => console.log("Play failed:", e));

    fadeIntervalRef.current = setInterval(() => {
      // Use the 'volume' state as the target cap
      if (currentVolume < volume) {
        currentVolume = Math.min(currentVolume + 0.05, volume); // Increased step slightly for responsiveness
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 100);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;
    
    // Clear any existing fade intervals
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    let currentVolume = audioRef.current.volume;

    fadeIntervalRef.current = setInterval(() => {
      if (currentVolume > 0) {
        currentVolume = Math.max(currentVolume - 0.05, 0);
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
    }, 100);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
    } else {
      fadeIn();
      setIsPlaying(true);
    }
  };

  // 3. FIXED BUG: Removed 'isPlaying' from dependency array
  // If we kept 'isPlaying' here, it would snap the volume to 0.3 
  // immediately when you clicked play, ruining the fade effect.
  useEffect(() => {
    if (audioRef.current && isPlaying && !fadeIntervalRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]); 

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