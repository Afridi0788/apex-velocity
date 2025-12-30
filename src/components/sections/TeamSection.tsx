import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const teamMembers = [
  {
    name: 'Arjun Sharma',
    role: 'Team Principal',
    avatar: 'AS',
    department: 'Core Committee',
  },
  {
    name: 'Priya Patel',
    role: 'Chief Engineer',
    avatar: 'PP',
    department: 'Technical',
  },
  {
    name: 'Rahul Verma',
    role: 'Strategy Lead',
    avatar: 'RV',
    department: 'Marketing',
  },
  {
    name: 'Sneha Iyer',
    role: 'Operations Head',
    avatar: 'SI',
    department: 'Logistics',
  },
  {
    name: 'Vikram Singh',
    role: 'Tech Director',
    avatar: 'VS',
    department: 'Technical',
  },
  {
    name: 'Ananya Reddy',
    role: 'Creative Lead',
    avatar: 'AR',
    department: 'Design',
  },
];

const TeamSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="team" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 checkered opacity-20" style={{ backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Pit Crew
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Meet The <span className="text-gradient-racing">Team</span>
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Like a precision pit crew, our team works together to deliver an unforgettable experience.
          </p>
        </div>

        {/* Team Grid */}
        <div 
          ref={teamRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700
                      ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="group relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative card-racing p-6 text-center overflow-hidden
                              hover:-translate-y-2 transition-all duration-500">
                {/* Metallic Shine Effect */}
                <div className="absolute inset-0 metallic-shine pointer-events-none" />

                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-racing opacity-20 blur-xl 
                                  group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5
                                  border-2 border-primary/30 flex items-center justify-center
                                  group-hover:border-primary/60 group-hover:shadow-neon transition-all duration-500">
                    <span className="font-orbitron text-2xl font-bold text-primary">
                      {member.avatar}
                    </span>
                  </div>
                  
                  {/* Floating Ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/20 
                                  scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125
                                  transition-all duration-700" />
                </div>

                {/* Info */}
                <span className="inline-block px-2 py-0.5 mb-2 font-rajdhani text-xs uppercase tracking-wider
                                text-primary bg-primary/10 rounded">
                  {member.department}
                </span>
                <h3 className="font-orbitron text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="font-rajdhani text-muted-foreground mb-4">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 opacity-0 translate-y-4 
                                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a href="#" className="p-2 rounded-lg bg-card/50 border border-border/50 
                                        hover:border-primary/50 hover:text-primary transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-card/50 border border-border/50 
                                        hover:border-primary/50 hover:text-primary transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-card/50 border border-border/50 
                                        hover:border-primary/50 hover:text-primary transition-all">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <p className="font-rajdhani text-lg text-muted-foreground mb-6">
            Want to be part of the crew? We're always looking for passionate individuals.
          </p>
          <button className="btn-outline-racing">
            Join Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
