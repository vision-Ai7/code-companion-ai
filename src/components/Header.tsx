import { Code2, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'generate', label: 'Generate' },
    { id: 'chat', label: 'Chat' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate?.('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">VisionCode</h1>
              <span className="text-xs text-primary font-medium">AI</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.(item.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="glow" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => onNavigate?.('features')}
            >
              Get Started
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  onNavigate?.(item.id);
                  setMobileMenuOpen(false);
                }}
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="glow"
              onClick={() => {
                onNavigate?.('features');
                setMobileMenuOpen(false);
              }}
              className="mt-2"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
