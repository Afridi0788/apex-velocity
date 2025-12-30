import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Play, Pause, RotateCcw, Volume2, VolumeX, Gauge, X, Calendar, ChevronRight, Trophy, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ==========================================
// EVENT DATA
// ==========================================
const timelineEvents = [
  {
    id: 1,
    title: 'Registration Opens',
    date: 'Jan 15, 2026',
    time: '10:00 AM EST',
    description: 'Start your engines! Registration begins for all events. Secure your spot early.',
    status: 'completed',
    icon: '🏁',
    prize: 'Early Bird Swag',
  },
  {
    id: 2,
    title: 'Online Rounds',
    date: 'Feb 01, 2026',
    time: '12:00 PM EST',
    description: 'Preliminary online rounds to qualify for the finals. Show your skills in the simulator.',
    status: 'completed',
    icon: '💻',
    prize: 'Qualification',
  },
  {
    id: 3,
    title: 'Screening Results',
    date: 'Feb 20, 2026',
    time: '05:00 PM EST',
    description: 'Qualified participants announced. Check the leaderboard to see if you made the cut.',
    status: 'current',
    icon: '📊',
    prize: 'Finalist Badge',
  },
  {
    id: 4,
    title: 'Workshop Week',
    date: 'Mar 01, 2026',
    time: '09:00 AM EST',
    description: 'Pre-event workshops and tech sessions with industry experts.',
    status: 'upcoming',
    icon: '🛠️',
    prize: 'Certificates',
  },
  {
    id: 5,
    title: 'Grand Finale',
    date: 'Mar 15, 2026',
    time: '10:00 AM EST',
    description: 'The final race! Three days of intense competition, networking, and glory.',
    status: 'upcoming',
    icon: '🏆',
    prize: '$10,000 Pool',
  },
];

// ==========================================
// CIRCULAR TRACK GENERATOR
// ==========================================
const generateCircularTrackPath = (width: number, height: number) => {
  const padding = 60;
  const rx = (width / 2) - padding;
  const ry = (height / 2) - padding;
  const cx = width / 2;
  const cy = height / 2;

  // SVG Path for an ellipse/circle starting at the top
  return `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy + ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy - ry}`;
};

const getCircularCheckpointPositions = (count: number, width: number, height: number) => {
  const padding = 60;
  const rx = (width / 2) - padding;
  const ry = (height / 2) - padding;
  const cx = width / 2;
  const cy = height / 2;
  
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - (Math.PI / 2);
    
    return {
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
      angle: angle,
      index: i,
    };
  });
};

// ==========================================
// RACE CAR COMPONENT
// ==========================================
const RaceCar: React.FC<{ progress: number; isMoving: boolean; path: string }> = ({ progress, isMoving, path }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-40" // High z-index to stay above inactive nodes
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: 'auto 90deg',
      }}
      animate={{
        offsetDistance: `${progress * 100}%`,
      }}
      transition={{
        duration: isMoving ? 0.5 : 0,
        ease: 'linear',
      }}
    >
      <div className="relative -rotate-90 origin-center">
        {/* Car Container - Scaled up for better visibility */}
        <div className="relative w-20 h-10 sm:w-24 sm:h-12 scale-100 sm:scale-125">
          
          {/* Engine Glow / Trail Effect */}
          {isMoving && (
            <>
             <motion.div
               className="absolute -left-16 top-1/2 -translate-y-1/2 w-24 h-8 bg-gradient-to-l from-primary via-primary/60 to-transparent blur-md"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1.1, 0.9] }}
               transition={{ duration: 0.1, repeat: Infinity }}
             />
             <motion.div
               className="absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-2 bg-white/50 blur-sm rounded-full"
               animate={{ opacity: [0.5, 0, 0.5], width: [20, 40, 20] }}
               transition={{ duration: 0.2, repeat: Infinity }}
             />
            </>
          )}

          {/* F1 Car SVG */}
          <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(var(--primary),0.6)]">
             <path d="M10,25 L30,15 L70,15 L90,20 L95,25 L90,30 L70,35 L30,35 L10,25 Z" fill="hsl(var(--primary))" />
             <circle cx="55" cy="25" r="5" fill="#000" stroke="hsl(var(--primary-glow))" strokeWidth="1" />
             <rect x="0" y="10" width="10" height="30" rx="2" fill="hsl(var(--foreground))" />
             <path d="M90,10 L95,10 L100,15 L100,35 L95,40 L90,40 Z" fill="hsl(var(--foreground))" />
             <rect x="20" y="5" width="12" height="8" rx="2" fill="#1a1a1a" stroke="#333" />
             <rect x="20" y="37" width="12" height="8" rx="2" fill="#1a1a1a" stroke="#333" />
             <rect x="70" y="5" width="12" height="8" rx="2" fill="#1a1a1a" stroke="#333" />
             <rect x="70" y="37" width="12" height="8" rx="2" fill="#1a1a1a" stroke="#333" />
             {/* Neon Trim */}
             <path d="M30,15 L70,15" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// CHECKPOINT NODE & POPUP
// ==========================================
interface CheckpointProps {
  event: typeof timelineEvents[0];
  position: { x: number; y: number; angle: number };
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  showPopup: boolean;
  onClosePopup: () => void;
}

const Checkpoint: React.FC<CheckpointProps> = ({
  event,
  position,
  isActive,
  isCompleted,
  onClick,
  showPopup,
  onClosePopup,
}) => {
  const angleDeg = (position.angle * 180) / Math.PI;
  
  // Dynamic Popup Positioning
  let popupOriginClass = '';
  let popupPositionStyle: React.CSSProperties = {};

  if (angleDeg >= -135 && angleDeg < -45) { // Top -> Show Below
     popupOriginClass = 'origin-top';
     popupPositionStyle = { top: '4rem', left: '50%', transform: 'translateX(-50%)' };
  } else if (angleDeg >= -45 && angleDeg < 45) { // Right -> Show Left
     popupOriginClass = 'origin-right';
     popupPositionStyle = { top: '50%', right: '4rem', transform: 'translateY(-50%)' };
  } else if (angleDeg >= 45 && angleDeg < 135) { // Bottom -> Show Above
     popupOriginClass = 'origin-bottom';
     popupPositionStyle = { bottom: '4rem', left: '50%', transform: 'translateX(-50%)' };
  } else { // Left -> Show Right
     popupOriginClass = 'origin-left';
     popupPositionStyle = { top: '50%', left: '4rem', transform: 'translateY(-50%)' };
  }

  return (
    <motion.div
      // FIXED: Dynamic z-index prevents overlapping with next stops
      className={`absolute ${isActive ? 'z-50' : 'z-20'}`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: event.id * 0.1, type: 'spring', stiffness: 200 }}
    >
      {/* Node Button */}
      <motion.button
        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive ? 'bg-black border-primary shadow-[0_0_30px_hsl(var(--primary))] scale-110' :
                      isCompleted ? 'bg-zinc-900 border-primary/70 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]' :
                      'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-primary/50'}`}
        onClick={onClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
         <span className="text-xl sm:text-2xl">{isCompleted || isActive ? event.icon : <div className="w-2 h-2 rounded-full bg-current" />}</span>

        {/* Active Ripple */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-primary"
              animate={{ scale: [1, 2.5], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/50"
              animate={{ scale: [1, 2], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}
      </motion.button>

      {/* Label (Hidden when active) */}
      {!showPopup && (
         <div className={`absolute whitespace-nowrap pointer-events-none transition-opacity duration-300
            ${isActive ? 'opacity-0' : 'opacity-100'}
            ${angleDeg > 0 && angleDeg < 180 ? 'top-full mt-3' : 'bottom-full mb-3'}
            left-1/2 -translate-x-1/2 font-rajdhani text-xs sm:text-sm font-bold uppercase tracking-wider text-primary bg-black/90 border border-primary/30 px-3 py-1 rounded-full shadow-lg`}
         >
            {event.date}
         </div>
      )}

      {/* EXPANDED POPUP CARD */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            // Increased width: w-80 (mobile) to sm:w-96 (desktop)
            className={`absolute w-80 sm:w-96 ${popupOriginClass}`}
            style={popupPositionStyle}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/90 backdrop-blur-2xl border border-primary/50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
               
               {/* Neon Top Bar */}
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-white to-primary opacity-80" />
               
               <div className="p-6 relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-5">
                     <div className="flex flex-col gap-1">
                        <span className="font-rajdhani text-xs font-bold text-primary uppercase tracking-[0.2em]">
                           Checkpoint 0{event.id}
                        </span>
                        <h3 className="font-orbitron text-2xl font-black text-white leading-none tracking-wide">
                           {event.title}
                        </h3>
                     </div>
                     <button 
                        onClick={(e) => { e.stopPropagation(); onClosePopup(); }} 
                        className="p-1 -mr-2 -mt-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                     >
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                     <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-xs font-rajdhani font-medium text-gray-300">{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs font-rajdhani font-medium text-gray-300">{event.time}</span>
                     </div>
                  </div>

                  {/* Description */}
                  <div className="relative pl-4 border-l-2 border-primary/30 mb-6">
                     <p className="text-sm text-gray-400 leading-relaxed font-rajdhani">
                        {event.description}
                     </p>
                  </div>

                  {/* Prize / Reward Box */}
                  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-primary/20 p-4 transition-all hover:border-primary/50">
                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="flex items-center gap-4 relative z-10">
                        <div className="p-2.5 bg-primary/10 rounded-lg text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                           <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-0.5">Victory Reward</div>
                           <div className="text-base font-orbitron font-bold text-white group-hover:text-primary transition-colors">
                              {event.prize}
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                     </div>
                  </div>
               </div>

               {/* Background Glows */}
               <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
               <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ==========================================
// CONTROL PANEL
// ==========================================
interface ControlPanelProps {
   isPlaying: boolean;
   onPlayPause: () => void;
   onReset: () => void;
   speed: number;
   onSpeedChange: (speed: number) => void;
   isLooping: boolean;
   onLoopToggle: () => void;
   soundEnabled: boolean;
   onSoundToggle: () => void;
 }
 
 const ControlPanel: React.FC<ControlPanelProps> = ({
   isPlaying,
   onPlayPause,
   onReset,
   speed,
   onSpeedChange,
   isLooping,
   onLoopToggle,
   soundEnabled,
   onSoundToggle,
 }) => {
   const speedLabels = ['Slow', 'Normal', 'Fast'];
 
   return (
     <motion.div
       className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-2xl max-w-[90vw] mx-auto"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.5 }}
     >
       <button
         onClick={onPlayPause}
         className={`p-3 rounded-full transition-all duration-300 ${
           isPlaying 
             ? 'bg-primary text-black shadow-[0_0_20px_hsl(var(--primary))]' 
             : 'bg-white/5 hover:bg-primary/20 text-white'
         }`}
       >
         {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
       </button>
 
       <button onClick={onReset} className="p-3 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-colors">
         <RotateCcw className="w-5 h-5" />
       </button>
 
       <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
         <Gauge className="w-4 h-4 text-zinc-500 mr-2" />
         {speedLabels.map((label, index) => (
           <button
             key={label}
             onClick={() => onSpeedChange(index)}
             className={`px-3 py-1 text-[10px] sm:text-xs font-rajdhani uppercase rounded-md transition-all ${
               speed === index 
                 ? 'bg-primary text-black font-bold shadow-lg' 
                 : 'text-zinc-500 hover:text-white'
             }`}
           >
             {label}
           </button>
         ))}
       </div>
 
       <div className="flex gap-2 border-l border-white/10 pl-2">
         <button onClick={onLoopToggle} className={`p-2 rounded-lg transition-colors ${isLooping ? 'text-primary bg-primary/10' : 'text-zinc-500 hover:text-white'}`}>
            <RotateCcw className={`w-4 h-4 ${isLooping ? 'animate-spin-slow' : ''}`} />
         </button>
         <button onClick={onSoundToggle} className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'text-primary bg-primary/10' : 'text-zinc-500 hover:text-white'}`}>
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
         </button>
       </div>
     </motion.div>
   );
 };

// ==========================================
// MAIN TIMELINE SECTION
// ==========================================
const TimelineSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const [carProgress, setCarProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [trackPath, setTrackPath] = useState('');
  
  // Settings
  const [speed, setSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  const speeds = [3000, 1500, 800]; 

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = Math.min(w, 600); 
        setDimensions({ width: w, height: h });
        setTrackPath(generateCircularTrackPath(w, h));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkpoints = getCircularCheckpointPositions(timelineEvents.length, dimensions.width, dimensions.height);

  // Sound FX
  const playSound = useCallback((type: 'check' | 'finish') => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'check') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
    }
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, [soundEnabled]);

  // Animation Engine
  useEffect(() => {
   if (!isPlaying) return;

   let timeoutId: NodeJS.Timeout;

   const animate = () => {
     if (currentCheckpoint >= timelineEvents.length) {
       if (isLooping) {
         setCarProgress(0); 
         setCurrentCheckpoint(0);
         timeoutId = setTimeout(animate, 500); 
       } else {
         setIsPlaying(false);
         playSound('finish');
       }
       return;
     }

     const segmentDuration = speeds[speed];
     const endProgress = (currentCheckpoint + 1) / timelineEvents.length;
     
     setCarProgress(endProgress);
     
     timeoutId = setTimeout(() => {
        if (currentCheckpoint < timelineEvents.length) {
           setShowPopup(currentCheckpoint);
           playSound('check');
           
           timeoutId = setTimeout(() => {
              setShowPopup(null);
              setCurrentCheckpoint(prev => prev + 1);
           }, 2500); // Wait time at checkpoint
        }
     }, segmentDuration);
   };

   animate();
   return () => clearTimeout(timeoutId);
 }, [isPlaying, currentCheckpoint, isLooping, speed, playSound]);

  return (
    <section className="relative py-24 overflow-hidden bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Mesh Grid Floor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
           }} 
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        
        {/* Title Header */}
        <motion.div 
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 animate-pulse">
            <Flag className="w-4 h-4" />
            <span className="font-rajdhani uppercase tracking-[0.2em] text-xs font-bold">Season 2026 Roadmap</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            RACE TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-text-shimmer bg-[length:200%_auto]">VICTORY</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-rajdhani text-lg md:text-xl">
            Navigate through our season highlights. The track is set, the engines are ready.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-12 relative z-20">
          <ControlPanel 
            isPlaying={isPlaying} 
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={() => { setIsPlaying(false); setCurrentCheckpoint(0); setCarProgress(0); setShowPopup(null); }}
            speed={speed} 
            onSpeedChange={setSpeed}
            isLooping={isLooping} 
            onLoopToggle={() => setIsLooping(!isLooping)}
            soundEnabled={soundEnabled} 
            onSoundToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>

        {/* TRACK AREA */}
        <div ref={containerRef} className="relative w-full aspect-square max-h-[650px] mx-auto hidden md:block">
           <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className="overflow-visible">
              <defs>
                 <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#222" />
                    <stop offset="50%" stopColor="#111" />
                    <stop offset="100%" stopColor="#222" />
                 </linearGradient>
                 <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>

              {/* Track Shadow/Base */}
              <path 
                 d={trackPath} 
                 fill="none" 
                 stroke="#000" 
                 strokeWidth="50" 
                 strokeLinecap="round" 
                 className="opacity-50 blur-sm"
              />
              <path 
                 d={trackPath} 
                 fill="none" 
                 stroke="url(#trackGradient)" 
                 strokeWidth="40" 
                 strokeLinecap="round" 
              />
              
              {/* Circuit Lines */}
              <path d={trackPath} fill="none" stroke="#333" strokeWidth="1" strokeDasharray="20 10" transform="scale(0.92)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              <path d={trackPath} fill="none" stroke="#333" strokeWidth="1" strokeDasharray="20 10" transform="scale(1.08)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

              {/* Progress Line */}
              <motion.path
                 d={trackPath}
                 fill="none"
                 stroke="hsl(var(--primary))"
                 strokeWidth="4"
                 strokeLinecap="round"
                 filter="url(#neonGlow)"
                 strokeDasharray="10 0" // Solid line
                 initial={{ pathLength: 0, opacity: 0.5 }}
                 animate={{ pathLength: carProgress, opacity: 1 }}
                 transition={{ duration: 0.5, ease: 'linear' }} 
              />
           </svg>

           {/* Checkpoints */}
           {checkpoints.map((pos, i) => (
              <Checkpoint 
                 key={i}
                 event={timelineEvents[i]}
                 position={pos}
                 isActive={showPopup === i}
                 isCompleted={currentCheckpoint > i}
                 onClick={() => { setIsPlaying(false); setShowPopup(i); setCurrentCheckpoint(i); setCarProgress(i / timelineEvents.length); }}
                 showPopup={showPopup === i}
                 onClosePopup={() => setShowPopup(null)}
              />
           ))}

           {/* F1 Car */}
           {trackPath && <RaceCar progress={carProgress} isMoving={isPlaying} path={trackPath} />}

           {/* Center Logo/Status */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-48 h-48 rounded-full border border-white/5 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                 <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                 <span className="font-rajdhani text-zinc-500 uppercase tracking-widest text-xs mb-1">Status</span>
                 <div className="text-5xl font-orbitron font-bold text-white mb-1">
                    {Math.round(carProgress * 100)}%
                 </div>
                 <div className="text-xs text-primary font-bold uppercase tracking-[0.3em]">Complete</div>
              </div>
           </div>
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden space-y-4">
           {timelineEvents.map((event, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className={`p-5 rounded-xl border transition-all duration-300 ${currentCheckpoint === i ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' : 'bg-zinc-900/50 border-white/5'}`}
                 onClick={() => { setCurrentCheckpoint(i); setShowPopup(showPopup === i ? null : i); }}
              >
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-black border ${currentCheckpoint >= i ? 'border-primary text-white shadow-[0_0_10px_hsl(var(--primary))]' : 'border-zinc-800 text-zinc-600'}`}>
                       {event.icon}
                    </div>
                    <div className="flex-1">
                       <h3 className="font-orbitron font-bold text-white text-lg">{event.title}</h3>
                       <div className="flex items-center gap-2 text-primary text-xs font-rajdhani uppercase tracking-wider mt-1">
                          <span>{event.date}</span>
                          <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                          <span>{event.time}</span>
                       </div>
                    </div>
                    {currentCheckpoint === i && <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />}
                 </div>
                 
                 <AnimatePresence>
                    {showPopup === i && (
                       <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                       >
                          <div className="pt-4 mt-4 border-t border-white/5">
                             <p className="text-sm text-zinc-400 font-rajdhani leading-relaxed mb-4">{event.description}</p>
                             <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-white/5">
                                <Trophy className="w-4 h-4 text-primary" />
                                <div>
                                   <div className="text-[10px] text-zinc-500 uppercase font-bold">Prize</div>
                                   <div className="text-sm font-bold text-white">{event.prize}</div>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;