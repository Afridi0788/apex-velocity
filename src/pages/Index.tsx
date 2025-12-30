import { ThemeProvider } from '@/contexts/ThemeContext';
import { MusicProvider } from '@/contexts/MusicContext';
import Navigation from '@/components/Navigation';
import ParticleField from '@/components/ParticleField';
import MusicToggle from '@/components/MusicToggle';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EventsSection from '@/components/sections/EventsSection';
import TimelineSection from '@/components/sections/TimelineSection';
import TeamSection from '@/components/sections/TeamSection';
import PrizesSection from '@/components/sections/PrizesSection';
import GallerySection from '@/components/sections/GallerySection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <MusicProvider>
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
          {/* Particle Background */}
          <ParticleField />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            <HeroSection />
            <AboutSection />
            <EventsSection />
            <TimelineSection />
            <TeamSection />
            <PrizesSection />
            <GallerySection />
            <ExperienceSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Floating Controls */}
          <MusicToggle />
          <ThemeSwitcher />
        </div>
      </MusicProvider>
    </ThemeProvider>
  );
};

export default Index;
