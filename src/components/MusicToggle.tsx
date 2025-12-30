import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

const MusicToggle: React.FC = () => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      <div className="relative p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 
                      transition-all duration-300 hover:border-primary/50 hover:shadow-neon
                      group-hover:scale-110">
        {/* Animated ring when playing */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border border-primary/50 animate-pulse" />
          </>
        )}
        
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-primary relative z-10" />
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground relative z-10 group-hover:text-primary transition-colors" />
        )}
      </div>
      
      {/* Tooltip */}
      <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 
                       bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg
                       text-sm font-medium text-foreground whitespace-nowrap
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>
    </button>
  );
};

export default MusicToggle;
