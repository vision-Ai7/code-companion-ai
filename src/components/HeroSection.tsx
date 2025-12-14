import { Code2, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Code Intelligence
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Transform Your
            <br />
            <span className="text-gradient">Coding Experience</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Upload code images, analyze, debug, and generate clean code with AI. 
            Supporting 30+ programming languages with instant, accurate results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button size="xl" variant="glow" onClick={onGetStarted} className="gap-2">
              <Code2 className="h-5 w-5" />
              Start Analyzing
            </Button>
            <Button size="xl" variant="glass" onClick={onGetStarted} className="gap-2">
              <Zap className="h-5 w-5" />
              Generate Code
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { icon: <Zap className="h-3.5 w-3.5" />, text: 'Instant Analysis' },
              { icon: <Shield className="h-3.5 w-3.5" />, text: 'Bug Detection' },
              { icon: <Globe className="h-3.5 w-3.5" />, text: '30+ Languages' },
              { icon: <Sparkles className="h-3.5 w-3.5" />, text: 'AI Powered' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground"
              >
                <span className="text-primary">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};
