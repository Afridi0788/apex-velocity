import React, { useState } from 'react';
import { Code, Bot, Palette, Gamepad2, Brain, Shield, Wrench, Mic } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Technical', 'Creative', 'Gaming', 'Workshop'];

const events = [
  {
    id: 1,
    title: 'Code Grand Prix',
    category: 'Technical',
    icon: Code,
    eligibility: 'Open to All',
    description: 'High-speed coding competition with algorithmic challenges. Race against the clock!',
    prize: '₹50,000',
  },
  {
    id: 2,
    title: 'RoboRace',
    category: 'Technical',
    icon: Bot,
    eligibility: 'Team of 4',
    description: 'Build and race autonomous robots through challenging obstacle courses.',
    prize: '₹75,000',
  },
  {
    id: 3,
    title: 'Design Sprint',
    category: 'Creative',
    icon: Palette,
    eligibility: 'Individual',
    description: 'UI/UX design challenge with real-world problem statements.',
    prize: '₹30,000',
  },
  {
    id: 4,
    title: 'E-Sports Arena',
    category: 'Gaming',
    icon: Gamepad2,
    eligibility: 'Team of 5',
    description: 'Competitive gaming tournament featuring top esports titles.',
    prize: '₹40,000',
  },
  {
    id: 5,
    title: 'AI Challenge',
    category: 'Technical',
    icon: Brain,
    eligibility: 'Team of 3',
    description: 'Machine learning competition to solve complex data problems.',
    prize: '₹60,000',
  },
  {
    id: 6,
    title: 'CTF Warfare',
    category: 'Technical',
    icon: Shield,
    eligibility: 'Team of 3',
    description: 'Capture the flag cybersecurity competition for ethical hackers.',
    prize: '₹45,000',
  },
  {
    id: 7,
    title: 'IoT Workshop',
    category: 'Workshop',
    icon: Wrench,
    eligibility: 'Open to All',
    description: 'Hands-on workshop on building smart devices and IoT solutions.',
    prize: 'Certificate',
  },
  {
    id: 8,
    title: 'Tech Talks',
    category: 'Workshop',
    icon: Mic,
    eligibility: 'Open to All',
    description: 'Expert sessions from industry leaders on cutting-edge technologies.',
    prize: 'Certificate',
  },
];

const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: eventsRef, isVisible: eventsVisible } = useScrollAnimation<HTMLDivElement>();

  const filteredEvents = events.filter(
    event => activeCategory === 'All' || event.category === activeCategory
  );

  return (
    <section id="events" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 checkered opacity-30" style={{ backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Racing Categories
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-racing">Events</span> & Competitions
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your track and race to victory. From coding sprints to creative challenges, 
            there's a competition for every tech enthusiast.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 font-rajdhani font-medium text-sm uppercase tracking-wider 
                          rounded-full border transition-all duration-300
                          ${activeCategory === category 
                            ? 'bg-primary text-primary-foreground border-primary shadow-neon' 
                            : 'bg-card/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div 
          ref={eventsRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700
                      ${eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id}
              className="group relative card-racing p-6 overflow-hidden
                         hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Border */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 
                              flex items-center justify-center mb-4
                              group-hover:bg-primary/20 group-hover:border-primary/40 
                              group-hover:shadow-neon transition-all duration-300">
                <event.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Category Tag */}
              <span className="inline-block px-2 py-0.5 mb-3 font-rajdhani text-xs uppercase tracking-wider
                              text-primary bg-primary/10 rounded">
                {event.category}
              </span>

              {/* Title */}
              <h3 className="font-orbitron text-lg font-bold mb-2 
                             group-hover:text-primary transition-colors duration-300">
                {event.title}
              </h3>

              {/* Description */}
              <p className="font-rajdhani text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Meta Info */}
              <div className="space-y-2 pt-4 border-t border-border/30">
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani text-sm text-muted-foreground">Eligibility</span>
                  <span className="font-rajdhani text-sm font-medium">{event.eligibility}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani text-sm text-muted-foreground">Prize</span>
                  <span className="font-orbitron text-sm font-bold text-primary">{event.prize}</span>
                </div>
              </div>

              {/* Hover Action */}
              <button className="w-full mt-4 py-2 font-rajdhani font-medium text-sm uppercase tracking-wider
                                 bg-primary/10 border border-primary/30 rounded-lg
                                 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                                 hover:bg-primary/20 transition-all duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-outline-racing">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
