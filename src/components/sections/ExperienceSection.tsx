import React from 'react';
import { Rocket, Zap, Sparkles, Eye } from 'lucide-react';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import eventVenue from '@/assets/event-venue.jpg';

const experiences = [
  {
    icon: Zap,
    title: 'High-Energy Competitions',
    description: 'Feel the adrenaline rush as you compete in intense technical battles.',
  },
  {
    icon: Sparkles,
    title: 'Immersive Tech Expo',
    description: 'Explore cutting-edge innovations from leading tech companies.',
  },
  {
    icon: Eye,
    title: 'Spectacular Performances',
    description: 'Entertainment acts and cultural performances throughout the event.',
  },
  {
    icon: Rocket,
    title: 'Career Launchpad',
    description: 'Connect with recruiters and kickstart your dream career.',
  },
];

const ExperienceSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Parallax Background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <img 
          src={eventVenue} 
          alt="Event Experience" 
          className="w-full h-[120%] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            What Awaits You
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="text-gradient-racing">Experience</span>
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just a festival – it's an unforgettable journey into the future of technology.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {experiences.map((exp, index) => (
            <div 
              key={exp.title}
              className="group relative card-racing p-6 text-center
                         hover:-translate-y-2 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-radial from-primary/20 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 
                                flex items-center justify-center mx-auto mb-4
                                group-hover:bg-primary/20 group-hover:border-primary/40 
                                group-hover:shadow-neon transition-all duration-500">
                  <exp.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="font-rajdhani text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 holographic" />
          <div className="relative bg-card/60 backdrop-blur-xl border border-border/50 p-8 sm:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '3', label: 'Days' },
                { value: '50+', label: 'Events' },
                { value: '5000+', label: 'Participants' },
                { value: '100+', label: 'Sponsors' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-orbitron text-4xl sm:text-5xl font-black text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-rajdhani text-lg uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
