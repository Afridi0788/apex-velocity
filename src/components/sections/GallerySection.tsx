import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X, Camera, Aperture, Maximize2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import eventVenue from '@/assets/event-venue.jpg';
import pitCrew from '@/assets/pit-crew.jpg';

const galleryImages = [
  { src: gallery1, alt: 'Racing Track Aerial View', caption: 'The Racing Arena', category: 'Venue' },
  { src: gallery2, alt: 'Hackathon Event', caption: 'Hackathon in Action', category: 'Competition' },
  { src: gallery3, alt: 'Racing Cockpit', caption: 'Tech & Speed Combined', category: 'Technology' },
  { src: gallery4, alt: 'Keynote Stage', caption: 'Inspiring Talks', category: 'Speakers' },
  { src: eventVenue, alt: 'Event Venue', caption: 'The Experience', category: 'Atmosphere' },
  { src: pitCrew, alt: 'Pit Crew Action', caption: 'Behind the Scenes', category: 'Team' },
];

// ==========================================
// 3D TILT CARD COMPONENT
// ==========================================
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

const GallerySection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden bg-black text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-primary/10 border border-primary/20 rounded-full text-primary">
            <Camera className="w-4 h-4" />
            <span className="font-rajdhani uppercase tracking-widest text-xs font-bold">Visual Archives</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">EVENTS</span> <span className="text-primary">GLIMPSES</span>
          </h2>
          <p className="font-rajdhani text-zinc-400 text-lg max-w-2xl mx-auto">
            Relive the adrenaline. Witness the technology. Experience the velocity.
          </p>
        </div>

        {/* Main 3D Slider Area */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-1000 mb-12">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotateY: { duration: 0.4 }
              }}
              className="absolute w-full max-w-4xl aspect-video px-4"
              style={{ perspective: 1200 }}
            >
              <TiltCard className="w-full h-full relative group cursor-pointer">
                {/* Image Container with Tech Border */}
                <div 
                  className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-shadow duration-300"
                  onClick={() => setLightboxImage(galleryImages[currentSlide])}
                >
                  <img 
                    src={galleryImages[currentSlide].src} 
                    alt={galleryImages[currentSlide].alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Tech Overlay Lines (Cyberpunk feel) */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(transparent_2px,#fff_2px)] bg-[size:100%_4px]" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" />

                  {/* Content Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-primary text-black text-xs font-bold font-orbitron uppercase rounded-sm">
                        {galleryImages[currentSlide].category}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
                    </div>
                    <h3 className="text-3xl font-orbitron font-bold text-white mb-1">
                      {galleryImages[currentSlide].caption}
                    </h3>
                    <p className="text-zinc-400 font-rajdhani text-sm">
                      Image {currentSlide + 1} of {galleryImages.length}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-black">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 z-20 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-black transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-8 z-20 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-black transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 snap-center group
                            ${currentSlide === index ? 'border-primary ring-4 ring-primary/20 scale-105 z-10' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${currentSlide === index ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Immersive Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-primary hover:text-black transition-all duration-300 z-50"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.src} 
                alt={lightboxImage.alt}
                className="w-full h-full object-contain max-h-[85vh] bg-black"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{lightboxImage.caption}</h3>
                <span className="px-3 py-1 bg-primary text-black text-xs font-bold font-orbitron uppercase rounded-full">
                  {lightboxImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;