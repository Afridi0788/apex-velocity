import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Team', href: '#team' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
                  ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative p-2">
              <Zap className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-orbitron font-bold text-xl tracking-wider">
              <span className="text-primary">SOLUTIONS</span>
              <span className="text-foreground ml-1">2026</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-2 font-rajdhani font-medium text-sm uppercase tracking-wider
                           transition-all duration-300 hover:text-primary
                           ${activeSection === item.href.slice(1) ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-neon" />
                )}
              </button>
            ))}
            <button className="btn-racing ml-4 text-sm py-2 px-6">
              Register Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-card/50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl
                    border-b border-border/50 transition-all duration-300 overflow-hidden
                    ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`block w-full text-left px-4 py-3 font-rajdhani font-medium uppercase tracking-wider
                         rounded-lg transition-all duration-300 hover:bg-card/50 hover:text-primary
                         ${activeSection === item.href.slice(1) ? 'text-primary bg-card/30' : 'text-muted-foreground'}`}
            >
              {item.label}
            </button>
          ))}
          <button className="btn-racing w-full mt-4 text-sm py-3">
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
