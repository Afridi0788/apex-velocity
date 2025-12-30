import React from 'react';
import { Trophy, Medal, Award, Star, Gift, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import trophyImage from '@/assets/trophy.jpg';

const prizes = [
  {
    position: 1,
    title: 'Grand Champion',
    prize: '₹1,00,000',
    perks: ['Trophy', 'Certificate', 'Internship Opportunity', 'Swag Kit'],
    icon: Trophy,
    color: 'from-yellow-500 to-amber-600',
  },
  {
    position: 2,
    title: 'First Runner-up',
    prize: '₹50,000',
    perks: ['Medal', 'Certificate', 'Tech Gadgets', 'Swag Kit'],
    icon: Medal,
    color: 'from-gray-300 to-gray-500',
  },
  {
    position: 3,
    title: 'Second Runner-up',
    prize: '₹25,000',
    perks: ['Medal', 'Certificate', 'Vouchers', 'Swag Kit'],
    icon: Award,
    color: 'from-orange-400 to-orange-600',
  },
];

const additionalPrizes = [
  { title: 'Best Innovation', prize: '₹15,000', icon: Sparkles },
  { title: 'People\'s Choice', prize: '₹10,000', icon: Star },
  { title: 'Special Mention', prize: 'Goodies', icon: Gift },
];

const PrizesSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: podiumRef, isVisible: podiumVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="prizes" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with Trophy Image */}
      <div className="absolute inset-0">
        <img 
          src={trophyImage} 
          alt="Trophy Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Victory Lane
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-racing">Prizes</span> & Rewards
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Race to the podium and claim your glory. Massive prizes await the champions!
          </p>
        </div>

        {/* Podium Style Prizes */}
        <div 
          ref={podiumRef}
          className={`flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 transition-all duration-700
                      ${podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Reorder for podium effect: 2nd, 1st, 3rd */}
          {[prizes[1], prizes[0], prizes[2]].map((prize, idx) => {
            const isFirst = prize.position === 1;
            const height = isFirst ? 'h-96' : prize.position === 2 ? 'h-80' : 'h-72';
            
            return (
              <div 
                key={prize.position}
                className={`w-full lg:w-1/3 max-w-sm ${isFirst ? 'lg:order-2' : idx === 0 ? 'lg:order-1' : 'lg:order-3'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className={`relative ${height} card-racing p-6 flex flex-col overflow-hidden
                                 ${isFirst ? 'border-primary/50 shadow-neon-strong' : ''}`}>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 holographic opacity-20" />
                  
                  {/* Position Badge */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full 
                                  bg-gradient-to-br ${prize.color} flex items-center justify-center
                                  border-4 border-background shadow-lg
                                  ${isFirst ? 'animate-float' : ''}`}>
                    <span className="font-orbitron text-2xl font-black text-background">
                      {prize.position}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center pt-8">
                    <prize.icon className={`w-12 h-12 mb-4 ${isFirst ? 'text-yellow-500' : 'text-primary'}`} />
                    <h3 className="font-orbitron text-xl font-bold mb-2">{prize.title}</h3>
                    <div className={`font-orbitron text-3xl font-black mb-4 bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                      {prize.prize}
                    </div>
                    
                    {/* Perks */}
                    <ul className="space-y-1">
                      {prize.perks.map((perk) => (
                        <li key={perk} className="font-rajdhani text-sm text-muted-foreground flex items-center gap-2">
                          <Star className="w-3 h-3 text-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Podium Base */}
                  <div className="h-2 bg-gradient-racing rounded-b-lg -mx-6 -mb-6 mt-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Prizes */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {additionalPrizes.map((prize, index) => (
            <div 
              key={prize.title}
              className="card-racing p-6 text-center group hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 
                              flex items-center justify-center mx-auto mb-3
                              group-hover:bg-primary/20 group-hover:shadow-neon transition-all duration-300">
                <prize.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-orbitron font-bold mb-1">{prize.title}</h4>
              <p className="font-orbitron text-lg font-bold text-primary">{prize.prize}</p>
            </div>
          ))}
        </div>

        {/* Total Prize Pool */}
        <div className="text-center mt-16">
          <p className="font-rajdhani text-lg text-muted-foreground mb-2">Total Prize Pool</p>
          <div className="font-orbitron text-5xl sm:text-6xl font-black text-gradient-racing animate-pulse-glow inline-block">
            ₹10,00,000+
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
