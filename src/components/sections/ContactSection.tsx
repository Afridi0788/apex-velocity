import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

const ContactSection: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 checkered opacity-20" style={{ backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700
                      ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 font-rajdhani font-medium text-sm uppercase tracking-wider
                          text-primary bg-primary/10 border border-primary/20 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-racing">Contact</span> Us
          </h2>
          <p className="font-rajdhani text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? Ready to register? Reach out to our team!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-racing p-8">
            <h3 className="font-orbitron text-2xl font-bold mb-6">Send Us A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-lg
                               font-rajdhani text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:border-primary focus:shadow-neon
                               transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-lg
                               font-rajdhani text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:border-primary focus:shadow-neon
                               transition-all duration-300"
                  />
                </div>
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-lg
                             font-rajdhani text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary focus:shadow-neon
                             transition-all duration-300"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-lg
                             font-rajdhani text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary focus:shadow-neon
                             transition-all duration-300 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-racing w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Registration */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="card-racing p-8">
              <h3 className="font-orbitron text-2xl font-bold mb-6">Quick Contact</h3>
              
              <div className="space-y-6">
                <a href="mailto:solutions2026@techclub.edu" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 
                                  group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">Email</h4>
                    <p className="font-rajdhani text-muted-foreground group-hover:text-primary transition-colors">
                      solutions2026@techclub.edu
                    </p>
                  </div>
                </a>

                <a href="tel:+919876543210" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 
                                  group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">Phone</h4>
                    <p className="font-rajdhani text-muted-foreground group-hover:text-primary transition-colors">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">Venue</h4>
                    <p className="font-rajdhani text-muted-foreground">
                      Technology Campus, Innovation Avenue<br />
                      Bangalore, India 560001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Register CTA */}
            <div className="relative card-racing p-8 overflow-hidden">
              <div className="absolute inset-0 holographic opacity-30" />
              
              <div className="relative">
                <h3 className="font-orbitron text-2xl font-bold mb-4">Ready To Race?</h3>
                <p className="font-rajdhani text-muted-foreground mb-6">
                  Register now and secure your spot in the most anticipated tech festival of 2026!
                </p>
                <button className="btn-racing group">
                  <span className="flex items-center gap-2">
                    Register Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
