import { Code2, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-16 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 bg-accent/20 rounded-full blur-[60px] sm:blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            AI-Powered Code Intelligence
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight" style={{ animationDelay: '100ms' }}>
            Transform Your
            <br />
            <span className="text-gradient">Coding Experience</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in px-2" style={{ animationDelay: '200ms' }}>
            Upload code images, analyze, debug, and generate clean code with AI. 
            Supporting 30+ programming languages with instant, accurate results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button size="xl" variant="glow" onClick={onGetStarted} className="gap-2 w-full sm:w-auto text-sm sm:text-base">
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Analyzing
            </Button>
            <Button size="xl" variant="glass" onClick={onGetStarted} className="gap-2 w-full sm:w-auto text-sm sm:text-base">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              Generate Code
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { icon: <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, text: 'Instant Analysis' },
              { icon: <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, text: 'Bug Detection' },
              { icon: <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, text: '30+ Languages' },
              { icon: <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, text: 'AI Powered' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 border border-border text-xs sm:text-sm text-muted-foreground"
              >
                <span className="text-primary">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};
