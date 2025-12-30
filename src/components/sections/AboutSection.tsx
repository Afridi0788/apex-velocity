import React from 'react';
import { Target, Rocket, Users, Trophy, Cpu, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import pitCrewImage from '@/assets/pit-crew.jpg';

const features = [
  {
    icon: Rocket,
    title: 'Innovation Hub',
    description: 'Cutting-edge tech showcases and hackathons',
  },
  {
    icon: Users,
    title: 'Networking',
    description: 'Connect with industry leaders and peers',
  },
  {
    icon: Trophy,
    title: 'Competitions',
    description: '50+ events across technical domains',
  },
  {
    icon: Cpu,
    title: 'Tech Talks',
    description: 'Expert sessions on emerging technologies',
  },
  {
    icon: Lightbulb,
    title: 'Workshops',
    description: 'Hands-on learning experiences',
  },
  {
    icon: Target,
    title: 'Career Fair',
    description: 'Direct recruitment opportunities',
  },
];

const AboutSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-carbon" />
      <div className="absolute inset-0 speed-lines opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            About The Event
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Where <span className="text-gradient-racing">Technology</span> Meets <span className="text-gradient-racing">Speed</span>
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            SOLUTIONS 2026 is the flagship technical festival that brings together the brightest minds 
            to innovate, compete, and celebrate the future of technology.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div 
            ref={contentRef}
            className={`relative transition-all duration-700 delay-200
                        ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={pitCrewImage} 
                alt="Pit Crew Action" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-card/80 backdrop-blur-xl 
                              border border-border/50 shadow-neon">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-orbitron text-2xl font-bold text-primary">15</div>
                    <div className="font-rajdhani text-sm text-muted-foreground">Years Legacy</div>
                  </div>
                  <div>
                    <div className="font-orbitron text-2xl font-bold text-primary">100+</div>
                    <div className="font-rajdhani text-sm text-muted-foreground">Colleges</div>
                  </div>
                  <div>
                    <div className="font-orbitron text-2xl font-bold text-primary">3</div>
                    <div className="font-rajdhani text-sm text-muted-foreground">Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-xl" />
          </div>

          {/* Text Content */}
          <div 
            className={`transition-all duration-700 delay-300
                        ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <h3 className="font-orbitron text-2xl sm:text-3xl font-bold mb-6">
              Racing Towards <span className="text-primary">Innovation</span>
            </h3>
            <div className="space-y-4 font-rajdhani text-lg text-muted-foreground">
              <p>
                Like the precision of a Formula 1 pit stop, SOLUTIONS 2026 is engineered for peak performance. 
                This three-day extravaganza transforms our campus into a high-octane arena of technical excellence.
              </p>
              <p>
                From coding sprints that rival the speed of race cars to robotics battles that test engineering 
                prowess, every event is designed to push boundaries and ignite passion.
              </p>
              <p>
                Join us as we accelerate into the future, where every participant is a champion and every 
                idea has the potential to cross the finish line first.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn-racing text-sm py-3 px-6">
                View Event Schedule
              </button>
              <button className="btn-outline-racing text-sm py-3 px-6">
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700
                      ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group card-racing p-6"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 
                              flex items-center justify-center mb-4
                              group-hover:bg-primary/20 group-hover:border-primary/40 
                              transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-orbitron text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              <p className="font-rajdhani text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
