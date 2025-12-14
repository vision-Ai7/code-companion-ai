import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlock } from '@/components/CodeBlock';
import { AnalysisLoader } from '@/components/LoadingSpinner';
import { ImageUpload } from '@/components/ImageUpload';
import { BookOpen, GraduationCap, Code2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ExplanationSection {
  lineRange: string;
  code: string;
  explanation: string;
}

interface CodeExplanation {
  overview: string;
  sections: ExplanationSection[];
  summary: string;
}

interface CodeExplainerProps {
  onExplain: (code: string, level: 'beginner' | 'advanced') => Promise<CodeExplanation>;
  onExtractCode: (file: File) => Promise<string>;
}

export const CodeExplainer = ({ onExplain, onExtractCode }: CodeExplainerProps) => {
  const [inputMode, setInputMode] = useState<'paste' | 'image'>('paste');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleImageSelect = async (file: File) => {
    setIsExtracting(true);
    try {
      const extractedCode = await onExtractCode(file);
      setCode(extractedCode);
    } catch (error) {
      console.error('OCR error:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleExplain = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await onExplain(code, level);
      setExplanation(result);
    } catch (error) {
      console.error('Explanation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Code Explainer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Mode Tabs */}
          <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'paste' | 'image')}>
            <TabsList className="w-full">
              <TabsTrigger value="paste" className="flex-1 gap-2">
                <Code2 className="h-4 w-4" />
                Paste Code
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1 gap-2">
                <BookOpen className="h-4 w-4" />
                Upload Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paste" className="mt-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="min-h-[200px] font-mono"
              />
            </TabsContent>

            <TabsContent value="image" className="mt-4">
              <ImageUpload
                onImageSelect={handleImageSelect}
                isProcessing={isExtracting}
              />
              {code && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Extracted code:</p>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Explanation Level */}
          <div>
            <label className="text-sm font-medium mb-2 block">Explanation Level</label>
            <div className="flex gap-2">
              <Button
                variant={level === 'beginner' ? 'default' : 'outline'}
                onClick={() => setLevel('beginner')}
                className="flex-1 gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                Beginner
              </Button>
              <Button
                variant={level === 'advanced' ? 'default' : 'outline'}
                onClick={() => setLevel('advanced')}
                className="flex-1 gap-2"
              >
                <Code2 className="h-4 w-4" />
                Advanced
              </Button>
            </div>
          </div>

          {/* Explain Button */}
          <Button
            onClick={handleExplain}
            disabled={!code.trim() || isLoading}
            className="w-full gap-2"
            size="lg"
          >
            <BookOpen className="h-4 w-4" />
            Explain Code
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && <AnalysisLoader />}

      {/* Explanation Result */}
      {explanation && !isLoading && (
        <div className="space-y-4 animate-fade-in">
          {/* Overview */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{explanation.overview}</p>
            </CardContent>
          </Card>

          {/* Line-by-line Explanation */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Line-by-Line Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {explanation.sections.map((section, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-secondary/50 px-4 py-2 text-sm font-mono text-muted-foreground">
                    Lines {section.lineRange}
                  </div>
                  <div className="p-4 bg-card/50">
                    <pre className="font-mono text-sm mb-3 text-primary overflow-x-auto">
                      <code>{section.code}</code>
                    </pre>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card variant="glass" className="border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-primary">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{explanation.summary}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
