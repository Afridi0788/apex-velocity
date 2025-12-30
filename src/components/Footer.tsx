import React from 'react';
import { Zap, Instagram, Twitter, Linkedin, Youtube, Github, Heart } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
  ],
  resources: [
    { label: 'FAQs', href: '#' },
    { label: 'Rules', href: '#' },
    { label: 'Sponsors', href: '#' },
    { label: 'Past Events', href: '#' },
  ],
  socials: [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' },
  ],
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card border-t border-border/30">
      {/* Racing Stripe Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Neon Edge */}
      <div className="h-px bg-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={scrollToTop} className="flex items-center gap-2 mb-4 group">
              <div className="relative p-2">
                <Zap className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-orbitron font-bold text-xl tracking-wider">
                <span className="text-primary">SOLUTIONS</span>
                <span className="text-foreground ml-1">2026</span>
              </span>
            </button>
            <p className="font-rajdhani text-muted-foreground mb-6 max-w-xs">
              The flagship technical festival where innovation meets speed. 
              Racing into the future of technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footerLinks.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-lg bg-background border border-border/50
                             hover:border-primary/50 hover:bg-primary/10 hover:text-primary
                             transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="font-rajdhani text-muted-foreground hover:text-primary transition-colors
                               inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="font-rajdhani text-muted-foreground hover:text-primary transition-colors
                               inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-4">Stay Updated</h4>
            <p className="font-rajdhani text-sm text-muted-foreground mb-4">
              Subscribe for exclusive updates and early registration access.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-lg
                           font-rajdhani text-sm text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:border-primary focus:shadow-neon
                           transition-all duration-300"
              />
              <button className="w-full py-2.5 font-rajdhani font-medium text-sm uppercase tracking-wider
                                 bg-primary text-primary-foreground rounded-lg
                                 hover:bg-primary-glow hover:shadow-neon transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-rajdhani text-sm text-muted-foreground">
              © 2026 SOLUTIONS. All rights reserved.
            </p>
            <p className="font-rajdhani text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by the Tech Club
            </p>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 checkered opacity-5 pointer-events-none" style={{ backgroundSize: '30px 30px' }} />
    </footer>
  );
};

export default Footer;
