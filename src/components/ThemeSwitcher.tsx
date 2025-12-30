import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const themes = [
  { id: 'red', name: 'Racing Red', color: 'hsl(0, 85%, 50%)' },
  { id: 'blue', name: 'Turbo Blue', color: 'hsl(210, 100%, 50%)' },
  { id: 'green', name: 'Neon Green', color: 'hsl(150, 100%, 45%)' },
  { id: 'purple', name: 'Hyper Purple', color: 'hsl(280, 85%, 55%)' },
] as const;

const ThemeSwitcher: React.FC = () => {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme options */}
      <div className={`absolute bottom-full right-0 mb-3 flex flex-col gap-2 
                       transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => {
              setThemeColor(theme.id);
              setIsOpen(false);
            }}
            className="group flex items-center gap-3 px-4 py-2.5 
                       bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg
                       hover:border-primary/50 transition-all duration-300
                       hover:shadow-neon"
          >
            <div 
              className="w-5 h-5 rounded-full border-2 border-border/50 
                         transition-all duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: theme.color,
                boxShadow: themeColor === theme.id ? `0 0 15px ${theme.color}` : 'none'
              }}
            >
              {themeColor === theme.id && (
                <Check className="w-full h-full p-0.5 text-white" />
              )}
            </div>
            <span className="font-medium text-sm whitespace-nowrap">{theme.name}</span>
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 
                   transition-all duration-300 hover:border-primary/50 hover:shadow-neon
                   hover:scale-110"
        aria-label="Change theme color"
      >
        <Palette className={`w-6 h-6 transition-all duration-300 
                            ${isOpen ? 'text-primary rotate-180' : 'text-muted-foreground group-hover:text-primary'}`} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
