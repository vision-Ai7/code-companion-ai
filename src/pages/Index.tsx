import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { CodeAnalyzer } from '@/components/CodeAnalyzer';
import { CodeExplainer } from '@/components/CodeExplainer';
import { BugFixer } from '@/components/BugFixer';
import { CodeGenerator } from '@/components/CodeGenerator';
import { ChatInterface } from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { extractCodeFromImage } from '@/lib/ocr';
import { analyzeCode, explainCode, fixBugs, generateCode, chatWithAI } from '@/lib/ai-service';

type ActiveSection = 'home' | 'features' | 'image' | 'analyze' | 'explain' | 'bugs' | 'generate' | 'chat';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section as ActiveSection);
    if (section !== 'home') {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFeatureSelect = (id: string) => {
    const sectionMap: Record<string, ActiveSection> = {
      image: 'analyze',
      analyze: 'analyze',
      explain: 'explain',
      bugs: 'bugs',
      generate: 'generate',
      chat: 'chat',
    };
    setActiveSection(sectionMap[id] || 'analyze');
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'analyze':
        return (
          <CodeAnalyzer
            onAnalyze={analyzeCode}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'explain':
        return (
          <CodeExplainer
            onExplain={explainCode}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'bugs':
        return (
          <BugFixer
            onFix={fixBugs}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'generate':
        return <CodeGenerator onGenerate={generateCode} />;
      case 'chat':
        return (
          <Card variant="glass" className="overflow-hidden">
            <ChatInterface onSendMessage={chatWithAI} />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />

      {/* Hero Section - only show on home */}
      {activeSection === 'home' && (
        <HeroSection onGetStarted={() => handleNavigate('features')} />
      )}

      {/* Features Grid - show on home and features */}
      {(activeSection === 'home' || activeSection === 'features') && (
        <section className="py-20 px-4" id="features">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful <span className="text-gradient">AI Features</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to analyze, understand, debug, and generate code with AI assistance
              </p>
            </div>
            <FeatureGrid onFeatureSelect={handleFeatureSelect} />
          </div>
        </section>
      )}

      {/* Active Feature Content */}
      {!['home', 'features'].includes(activeSection) && (
        <section ref={contentRef} className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => handleNavigate('features')}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Features
            </Button>
            {renderContent()}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>VisionCode AI — AI-Powered Code Intelligence</p>
          <p className="mt-1">Supporting 30+ programming languages</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
