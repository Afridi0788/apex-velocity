import React from 'react';
import { Trophy, Medal, Award, Star, Gift, Sparkles, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import trophyImage from '@/assets/trophy.jpg';

const prizes = [
  {
    position: 1,
    title: 'Grand Champion',
    prize: '₹1,00,000',
    perks: ['Championship Trophy', 'Gold Certificate', 'Paid Internship', 'Exclusive Merch Kit'],
    icon: Trophy,
    theme: 'gold',
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    shadow: 'shadow-yellow-500/20',
    border: 'border-yellow-500/50',
  },
  {
    position: 2,
    title: 'First Runner-up',
    prize: '₹50,000',
    perks: ['Silver Medal', 'Certificate of Excellence', 'Tech Gadgets', 'Premium Swag'],
    icon: Medal,
    theme: 'silver',
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
    shadow: 'shadow-gray-400/20',
    border: 'border-gray-400/50',
  },
  {
    position: 3,
    title: 'Second Runner-up',
    prize: '₹25,000',
    perks: ['Bronze Medal', 'Certificate of Merit', 'Gift Vouchers', 'Participant Kit'],
    icon: Award,
    theme: 'bronze',
    gradient: 'from-orange-400 via-amber-700 to-orange-800',
    shadow: 'shadow-orange-500/20',
    border: 'border-orange-500/50',
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
    <section id="prizes" className="relative py-24 lg:py-32 overflow-hidden bg-black">
      {/* Background with Trophy Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={trophyImage} 
          alt="Trophy Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-24 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full animate-pulse">
            Victory Lane
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">Prizes</span> & Rewards
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto">
            Race to the podium and claim your glory. Massive prizes await the champions!
          </p>
        </div>

        {/* Podium Layout */}
        <div 
          ref={podiumRef}
          className={`flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 lg:gap-8 mb-20 transition-all duration-1000
                      ${podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          {/* Order: 2nd, 1st, 3rd for visual podium effect */}
          {[prizes[1], prizes[0], prizes[2]].map((prize, idx) => {
            const isFirst = prize.position === 1;
            // Heights: First place is tallest
            const cardHeight = isFirst ? 'min-h-[28rem]' : 'min-h-[24rem]';
            const orderClass = isFirst ? 'lg:order-2 order-1' : idx === 0 ? 'lg:order-1 order-2' : 'lg:order-3 order-3';
            
            return (
              <div 
                key={prize.position}
                className={`w-full max-w-sm relative group ${orderClass}`}
              >
                {/* Glow Effect behind card */}
                <div className={`absolute inset-0 bg-gradient-to-b ${prize.gradient} opacity-20 blur-2xl -z-10 group-hover:opacity-40 transition-opacity duration-500`} />

                <div className={`relative ${cardHeight} flex flex-col rounded-2xl border backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2
                                ${prize.border} ${isFirst ? 'bg-white/5' : 'bg-black/40'} ${prize.shadow} shadow-lg`}
                >
                  {/* Top Badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center font-orbitron font-bold text-xl text-black border-4 border-black shadow-lg bg-gradient-to-br ${prize.gradient}`}>
                        {prize.position}
                     </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-10 flex-1 flex flex-col items-center text-center">
                    
                    {/* Icon Circle */}
                    <div className={`mb-4 p-3 rounded-full bg-gradient-to-br ${prize.gradient} bg-opacity-10`}>
                      <prize.icon className="w-8 h-8 text-black drop-shadow-md" strokeWidth={1.5} />
                    </div>

                    <h3 className={`font-orbitron font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r ${prize.gradient}`}>
                      {prize.title}
                    </h3>
                    
                    <div className="font-orbitron text-4xl font-black text-white mb-6 tracking-tight">
                      {prize.prize}
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6`} />

                    {/* Perks List - Aligned Properly */}
                    <div className="w-full">
                       <ul className="space-y-3 text-left inline-block w-full px-2">
                         {prize.perks.map((perk, i) => (
                           <li key={i} className="flex items-start gap-3 text-zinc-300 font-rajdhani text-sm">
                             <div className={`mt-0.5 min-w-[16px] flex justify-center`}>
                               <Check className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${prize.gradient}`} />
                             </div>
                             <span>{perk}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </div>

                  {/* Decorative Bottom Bar */}
                  <div className={`h-2 w-full rounded-b-2xl bg-gradient-to-r ${prize.gradient} opacity-80`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Prizes Grid */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {additionalPrizes.map((prize, index) => (
            <div 
              key={prize.title}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                  <prize.icon className="w-6 h-6 text-primary" />
               </div>
               
               <h4 className="font-orbitron font-bold text-white mb-1 tracking-wide">{prize.title}</h4>
               <p className="font-rajdhani font-bold text-xl text-primary">{prize.prize}</p>
            </div>
          ))}
        </div>

        {/* Total Prize Pool Banner */}
        <div className="mt-20 relative rounded-2xl overflow-hidden border border-primary/30 bg-primary/5 max-w-4xl mx-auto">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" />
           <div className="relative p-8 text-center">
              <p className="font-rajdhani text-xl text-zinc-400 mb-2 uppercase tracking-widest">Total Prize Pool</p>
              <div className="font-orbitron text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)]">
                 ₹10,00,000+
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;