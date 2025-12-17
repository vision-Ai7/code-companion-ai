import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { CodeAnalyzer } from '@/components/CodeAnalyzer';
import { CodeExplainer } from '@/components/CodeExplainer';
import { BugFixer } from '@/components/BugFixer';
import { CodeGenerator } from '@/components/CodeGenerator';
import { ChatInterface } from '@/components/ChatInterface';
import { HistoryPanel } from '@/components/HistoryPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { extractCodeFromImage } from '@/lib/ocr';
import { analyzeCode, explainCode, fixBugs, generateCode, chatWithAI } from '@/lib/ai-service';
import { useHistory } from '@/hooks/useHistory';
import { useAuth } from '@/hooks/useAuth';
import { Json } from '@/integrations/supabase/types';

type ActiveSection = 'home' | 'features' | 'image' | 'analyze' | 'explain' | 'bugs' | 'generate' | 'chat' | 'history';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { saveAnalysis, createConversation, saveMessage } = useHistory();

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

  // Wrapped functions that also save to history
  const handleAnalyze = async (code: string) => {
    const result = await analyzeCode(code);
    if (user) {
      await saveAnalysis(code, 'analyze', result.language, result as unknown as Json);
    }
    return result;
  };

  const handleExplain = async (code: string, level: 'beginner' | 'advanced') => {
    const result = await explainCode(code, level);
    if (user) {
      await saveAnalysis(code, 'explain', null, result as unknown as Json);
    }
    return result;
  };

  const handleFix = async (code: string) => {
    const result = await fixBugs(code);
    if (user) {
      await saveAnalysis(code, 'fix', result.language, result as unknown as Json);
    }
    return result;
  };

  const handleGenerate = async (prompt: string, language: string) => {
    const result = await generateCode(prompt, language);
    if (user) {
      await saveAnalysis(prompt, 'generate', language, { code: result } as unknown as Json);
    }
    return result;
  };

  const handleChat = async (message: string) => {
    const response = await chatWithAI(message);
    // Chat history is handled differently via conversations
    return response;
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'analyze':
        return (
          <CodeAnalyzer
            onAnalyze={handleAnalyze}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'explain':
        return (
          <CodeExplainer
            onExplain={handleExplain}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'bugs':
        return (
          <BugFixer
            onFix={handleFix}
            onExtractCode={extractCodeFromImage}
          />
        );
      case 'generate':
        return <CodeGenerator onGenerate={handleGenerate} />;
      case 'chat':
        return (
          <Card variant="glass" className="overflow-hidden">
            <ChatInterface onSendMessage={handleChat} />
          </Card>
        );
      case 'history':
        return <HistoryPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header onNavigate={handleNavigate} />

      {/* Hero Section - only show on home */}
      {activeSection === 'home' && (
        <HeroSection onGetStarted={() => handleNavigate('features')} />
      )}

      {/* Features Grid - show on home and features */}
      {(activeSection === 'home' || activeSection === 'features') && (
        <section className="py-12 sm:py-16 md:py-20 px-4" id="features">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Powerful <span className="text-gradient">AI Features</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                Everything you need to analyze, understand, debug, and generate code with AI assistance
              </p>
            </div>
            <FeatureGrid onFeatureSelect={handleFeatureSelect} />
          </div>
        </section>
      )}

      {/* Active Feature Content */}
      {!['home', 'features'].includes(activeSection) && (
        <section ref={contentRef} className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => handleNavigate('features')}
              className="mb-4 sm:mb-6 gap-1.5 sm:gap-2 text-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Back to Features
            </Button>
            {renderContent()}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
