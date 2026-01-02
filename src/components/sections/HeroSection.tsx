import React, { useEffect, useState } from 'react';
import { ChevronDown, Flag, Zap, Timer } from 'lucide-react';
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster={heroImage}
        >
          <source src={heroVideo} type="video/mp4" />
          <img 
            src={heroImage} 
            alt="F1 Racing" 
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Speed Lines Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
            style={{
              top: `${20 + i * 15}%`,
              left: '-100%',
              right: '-100%',
              animation: `speed-line ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pre-title */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full 
                      bg-card/50 backdrop-blur-sm border border-border/50
                      transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Flag className="w-4 h-4 text-primary" />
          <span className="font-rajdhani font-medium text-sm uppercase tracking-wider text-muted-foreground">
            March 15-17, 2026 • Grand Festival
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className={`font-orbitron font-black text-5xl sm:text-7xl lg:text-9xl mb-6
                      transition-all duration-1000 delay-200 
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="block text-gradient-racing animate-pulse-glow">SOLUTIONS</span>
          <span className="block text-foreground">2026</span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`font-exo text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8
                      max-w-3xl mx-auto transition-all duration-1000 delay-300
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Racing Into The Future of <span className="text-primary font-semibold">Innovation</span>
        </p>

        {/* Countdown Timer */}
        <div 
          className={`flex justify-center gap-4 sm:gap-6 mb-10 transition-all duration-1000 delay-400
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Mins', value: countdown.minutes },
            { label: 'Secs', value: countdown.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-lg bg-card/80 backdrop-blur-sm 
                              border border-border/50 flex items-center justify-center mb-2
                              shadow-neon">
                <span className="font-orbitron text-2xl sm:text-3xl font-bold text-primary">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="font-rajdhani text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 
                      transition-all duration-1000 delay-500
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button className="btn-racing group">
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Register Now
            </span>
          </button>
          <button className="btn-outline-racing">
            <span className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Explore Events
            </span>
          </button>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto mt-16 pt-8 
                      border-t border-border/30 transition-all duration-1000 delay-700
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {[
            { value: '50+', label: 'Events' },
            { value: '5000+', label: 'Participants' },
            { value: '₹10L+', label: 'Prizes' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron text-2xl sm:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-rajdhani text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>

      {/* Racing Stripe at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

export default HeroSection;
