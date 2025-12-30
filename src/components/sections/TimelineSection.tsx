import React, { useEffect, useRef, useState } from 'react';
import { Flag, CircleDot } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const timelineSteps = [
  {
    id: 1,
    title: 'Registration Opens',
    date: 'January 15, 2026',
    description: 'Start your engines! Registration begins for all events.',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Online Rounds',
    date: 'February 1-15, 2026',
    description: 'Preliminary online rounds to qualify for the finals.',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Screening Results',
    date: 'February 20, 2026',
    description: 'Qualified participants announced for on-campus events.',
    status: 'current',
  },
  {
    id: 4,
    title: 'Workshop Week',
    date: 'March 1-7, 2026',
    description: 'Pre-event workshops and tech sessions begin.',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Final Race Days',
    date: 'March 15-17, 2026',
    description: 'The grand finale! Three days of intense competition.',
    status: 'upcoming',
  },
];

const TimelineSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate how much of the timeline is visible
        const visibleStart = Math.max(0, windowHeight - rect.top);
        const visibleEnd = Math.max(0, windowHeight + elementHeight);
        const progress = Math.min(1, Math.max(0, visibleStart / visibleEnd));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-carbon" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Race Track
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Event <span className="text-gradient-racing">Timeline</span>
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the race track to glory. Each checkpoint brings you closer to the finish line.
          </p>
        </div>

        {/* Timeline Track */}
        <div ref={trackRef} className="relative">
          {/* Central Track Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div className="absolute inset-0 bg-border/30 rounded-full" />
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-primary-glow rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Mobile Track Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1">
            <div className="absolute inset-0 bg-border/30 rounded-full" />
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-primary-glow rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {timelineSteps.map((step, index) => (
              <TimelineItem 
                key={step.id} 
                step={step} 
                index={index} 
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Finish Flag */}
          <div className="flex justify-center mt-16">
            <div className="relative p-4 rounded-full bg-card border border-primary/50 shadow-neon-strong animate-pulse-glow">
              <Flag className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  step: typeof timelineSteps[0];
  index: number;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, index, isLeft }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-primary border-primary shadow-neon';
      case 'current':
        return 'bg-primary-glow border-primary-glow shadow-neon-strong animate-pulse';
      default:
        return 'bg-card border-border/50';
    }
  };

  return (
    <div 
      ref={ref}
      className={`relative flex items-center transition-all duration-700
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                  ${isVisible && isLeft ? 'lg:translate-x-0' : isVisible ? 'lg:translate-x-0' : isLeft ? 'lg:-translate-x-10' : 'lg:translate-x-10'}`}
    >
      {/* Desktop Layout */}
      <div className={`hidden lg:flex items-center w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content Card */}
        <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
          <div className={`card-racing p-6 inline-block ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
            <span className={`inline-block px-3 py-1 mb-3 font-rajdhani text-xs uppercase tracking-wider rounded
                             ${step.status === 'completed' ? 'bg-primary/20 text-primary' : 
                               step.status === 'current' ? 'bg-primary text-primary-foreground' : 
                               'bg-muted text-muted-foreground'}`}>
              {step.date}
            </span>
            <h3 className="font-orbitron text-xl font-bold mb-2">{step.title}</h3>
            <p className="font-rajdhani text-muted-foreground">{step.description}</p>
          </div>
        </div>

        {/* Center Node */}
        <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 ${getStatusColor()}`}>
          {step.status === 'current' && (
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
          )}
        </div>

        {/* Empty Space */}
        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex items-start gap-6 pl-16">
        {/* Node */}
        <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${getStatusColor()}`}>
          {step.status === 'current' && (
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
          )}
        </div>

        {/* Content */}
        <div className="card-racing p-4 flex-1">
          <span className={`inline-block px-3 py-1 mb-2 font-rajdhani text-xs uppercase tracking-wider rounded
                           ${step.status === 'completed' ? 'bg-primary/20 text-primary' : 
                             step.status === 'current' ? 'bg-primary text-primary-foreground' : 
                             'bg-muted text-muted-foreground'}`}>
            {step.date}
          </span>
          <h3 className="font-orbitron text-lg font-bold mb-1">{step.title}</h3>
          <p className="font-rajdhani text-sm text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
