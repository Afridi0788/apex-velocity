import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import eventVenue from '@/assets/event-venue.jpg';
import pitCrew from '@/assets/pit-crew.jpg';

const galleryImages = [
  { src: gallery1, alt: 'Racing Track Aerial View', caption: 'The Racing Arena' },
  { src: gallery2, alt: 'Hackathon Event', caption: 'Hackathon in Action' },
  { src: gallery3, alt: 'Racing Cockpit', caption: 'Tech & Speed Combined' },
  { src: gallery4, alt: 'Keynote Stage', caption: 'Inspiring Talks' },
  { src: eventVenue, alt: 'Event Venue', caption: 'The Experience' },
  { src: pitCrew, alt: 'Pit Crew Action', caption: 'Behind the Scenes' },
];

const GallerySection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-carbon" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Memories
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-racing">Gallery</span>
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Glimpses from previous editions and what awaits you this year.
          </p>
        </div>

        {/* Main Slideshow */}
        <div className="relative mb-8 rounded-2xl overflow-hidden group">
          {/* Main Image */}
          <div className="aspect-video relative">
            <img 
              src={galleryImages[currentSlide].src} 
              alt={galleryImages[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-orbitron text-2xl font-bold mb-2">
                {galleryImages[currentSlide].caption}
              </h3>
              <p className="font-rajdhani text-muted-foreground">
                {currentSlide + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Expand Button */}
            <button 
              onClick={() => setLightboxImage(galleryImages[currentSlide])}
              className="absolute top-6 right-6 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              <Expand className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                       bg-card/80 backdrop-blur-sm border border-border/50
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       hover:bg-primary hover:border-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                       bg-card/80 backdrop-blur-sm border border-border/50
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       hover:bg-primary hover:border-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30">
            <div 
              className="h-full bg-gradient-racing transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300
                          ${currentSlide === index 
                            ? 'border-primary shadow-neon scale-105' 
                            : 'border-transparent hover:border-primary/50'}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 rounded-full bg-card border border-border/50
                       hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage.src} 
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
