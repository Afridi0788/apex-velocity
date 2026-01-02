import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import pitCrewImage from '@/assets/pit-crew.jpg';
import heroF1Image from '@/assets/hero-f1.jpg';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    setIsLoaded(true);

    const eventDate = new Date('2026-03-15T09:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  

  const stats = [
    { value: '50', label: 'Events' },
    { value: '5000', label: 'Participants' },
    { value: '25', label: 'Categories' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium Purple Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(250,45%,18%)] via-[hsl(260,40%,22%)] to-[hsl(270,35%,15%)]" />
        
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[hsl(260,60%,30%)] rounded-full blur-[200px] opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[hsl(280,50%,25%)] rounded-full blur-[150px] opacity-20" />
        
        {/* Large "26" watermark */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 font-orbitron text-[30rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
          26
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-20" />

      {/* Main Content Grid */}
      <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] min-h-[calc(100vh-80px)]">
        
        {/* Left Side - Person/Visual + Stats */}
        <div className="relative flex items-end justify-center lg:justify-start">
          {/* Vertical Stats - Left Edge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-6"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="relative pl-4">
                {/* Accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                <div className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="font-orbitron text-3xl lg:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute left-4 bottom-1/4 z-20 hidden lg:flex flex-col gap-2">
            <button className="p-2 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Main Person/Visual Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-full flex items-end justify-center"
          >
            <img 
              src={pitCrewImage} 
              alt="Event Visual" 
              className="h-[70vh] lg:h-[85vh] w-auto object-contain object-bottom drop-shadow-2xl"
            />
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(260,40%,15%)] to-transparent" />
          </motion.div>
        </div>

        {/* Right Side - Event Info + Car */}
        <div className="relative flex flex-col justify-center px-6 lg:px-0 lg:pr-12 py-12">
          
          {/* Top Right - Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-8 right-6 lg:right-12 flex items-center gap-6"
          >
            {/* Event Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground">
                  15-17 March
                </div>
                <div className="font-exo text-sm font-semibold text-foreground flex items-center gap-2">
                  Solutions 2026
                  <Flag className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-4 pl-6 border-l border-border/30">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hrs', value: countdown.hours },
                { label: 'Mins', value: countdown.minutes },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="font-rajdhani text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="mt-20 lg:mt-0">
            {/* Event Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Solutions <span className="text-primary">2026</span>
              </h1>
            </motion.div>

            {/* Event Subtitle with accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-orbitron text-2xl font-bold text-primary">S26</span>
                <div className="w-8 h-0.5 bg-primary" />
              </div>
              <div>
                <div className="font-exo text-lg font-semibold text-foreground">
                  Technical Club Grand Festival
                </div>
                <div className="font-rajdhani text-sm text-muted-foreground flex items-center gap-2">
                  <span className="inline-block w-4 h-3 rounded-sm bg-gradient-to-r from-orange-500 via-white to-green-500" />
                  Campus Arena, India
                </div>
              </div>
            </motion.div>

            {/* Mini Chart/Stats Visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-end gap-1 h-12 mb-8"
            >
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((height, i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-primary/30 to-primary rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
              <span className="ml-2 font-rajdhani text-sm text-muted-foreground">92%</span>
            </motion.div>

            {/* Team/Club Logo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden xl:block"
            >
              <div className="text-right">
                <div className="font-orbitron text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Presented By
                </div>
                <div className="font-orbitron text-xl font-bold text-foreground">
                  TECHNICAL
                </div>
                <div className="font-orbitron text-xl font-bold text-primary">
                  CLUB
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom - Car Image + Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative mt-auto"
          >
            {/* F1 Car Image */}
            <div className="relative">
              <img 
                src={heroF1Image} 
                alt="F1 Racing Car" 
                className="w-full max-w-2xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
              
              {/* Speed trail effect */}
              <div className="absolute top-1/2 -left-20 w-32 h-1 bg-gradient-to-r from-primary/50 to-transparent blur-sm" />
              <div className="absolute top-1/2 -translate-y-4 -left-16 w-24 h-0.5 bg-gradient-to-r from-primary/30 to-transparent blur-sm" />
            </div>

            {/* Bottom Info */}
            <div className="flex items-end justify-between mt-4">
              <button className="font-rajdhani text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <span className="w-4 h-px bg-current" />
                More information
              </button>
              
              <div className="text-right">
                <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground">
                  Edition
                </div>
                <div className="font-orbitron text-2xl font-bold text-foreground">
                  2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 mt-8 md:hidden"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Racing Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;
