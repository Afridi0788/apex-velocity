import React, { useEffect, useState } from 'react';
import { ChevronDown, Flag, Zap, Timer, Trophy, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '@/assets/hero-f1.jpg';
import heroVideo from './3825524305-preview.mp4';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '50+', label: 'Events', icon: Calendar },
    { value: '5K+', label: 'Participants', icon: Users },
    { value: '₹10L', label: 'Prize Pool', icon: Trophy },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroImage}
        >
          <source src={heroVideo} type="video/mp4" />
          <img src={heroImage} alt="F1 Racing" className="w-full h-full object-cover" />
        </video>
        
        {/* Premium Purple-Violet Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(260,60%,15%)] via-[hsl(250,50%,20%)] to-[hsl(280,40%,12%)] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      {/* Left Side - Vertical Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className="group relative"
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-card/30 backdrop-blur-xl border border-border/30 rounded-xl p-4 
                          hover:bg-card/50 hover:border-primary/30 transition-all duration-300
                          hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              {/* Glow line on left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-primary rounded-full
                            group-hover:h-12 group-hover:shadow-[0_0_10px_hsl(var(--primary))] transition-all duration-300" />
              
              <div className="pl-3">
                <div className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content - Center/Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pl-20 xl:pl-32 text-center lg:text-left">
            {/* Event Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-card/40 backdrop-blur-xl border border-border/40">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-rajdhani font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  15-17 March 2026
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                <span className="font-rajdhani font-semibold text-xs uppercase tracking-wider text-primary">
                  Grand Festival
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="font-orbitron font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none">
                <span className="block text-gradient-racing mb-2">SOLUTIONS</span>
                <span className="block text-foreground">2026</span>
              </h1>
            </motion.div>

            {/* Subtitle with accent line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
            >
              <div className="hidden sm:block w-12 h-0.5 bg-primary rounded-full" />
              <p className="font-exo text-lg sm:text-xl text-muted-foreground">
                Racing Into The Future of <span className="text-primary font-semibold">Innovation</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button className="btn-racing group w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Register Now
                </span>
              </button>
              <button className="btn-outline-racing w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <Timer className="w-5 h-5" />
                  Explore Events
                </span>
              </button>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-4 mt-10 md:hidden"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-orbitron text-xl font-bold text-primary">{stat.value}</div>
                  <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Countdown & Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Premium Glass Card */}
            <div className="relative bg-card/20 backdrop-blur-2xl border border-border/30 rounded-2xl p-6 lg:p-8
                          shadow-[0_8px_32px_hsl(var(--primary)/0.1)]">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/40 rounded-bl-2xl" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flag className="w-5 h-5 text-primary" />
                  <span className="font-rajdhani font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    Next Event
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-rajdhani text-xs text-green-500 uppercase tracking-wider">Live Soon</span>
                </div>
              </div>

              {/* Event Title in Card */}
              <div className="mb-6">
                <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-foreground mb-1">
                  Solutions 2026
                </h3>
                <p className="font-rajdhani text-muted-foreground">
                  Technical Club Grand Festival
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hrs', value: countdown.hours },
                  { label: 'Min', value: countdown.minutes },
                  { label: 'Sec', value: countdown.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-3
                                  group hover:border-primary/50 transition-all duration-300">
                      <span className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground block">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground mt-2 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="relative h-px bg-border/50 mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 bg-card/50 backdrop-blur-sm">
                  <span className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground">More Info</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/30 rounded-lg p-3 border border-border/30">
                  <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground mb-1">Venue</div>
                  <div className="font-exo text-sm font-semibold text-foreground">Campus Arena</div>
                </div>
                <div className="bg-card/30 rounded-lg p-3 border border-border/30">
                  <div className="font-rajdhani text-xs uppercase tracking-wider text-muted-foreground mb-1">Duration</div>
                  <div className="font-exo text-sm font-semibold text-foreground">3 Days</div>
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary/30 rounded-lg rotate-12 animate-float" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border border-primary/20 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          Explore
        </span>
        <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
      </motion.button>

      {/* Bottom Racing Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;
