import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlock } from '@/components/CodeBlock';
import { AnalysisLoader } from '@/components/LoadingSpinner';
import { ImageUpload } from '@/components/ImageUpload';
import { Bug, AlertTriangle, CheckCircle2, Wrench, Code2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface BugReport {
  type: 'syntax' | 'logic' | 'security' | 'performance' | 'deprecated';
  severity: 'low' | 'medium' | 'high' | 'critical';
  line?: string;
  description: string;
  fix: string;
}

interface BugFixResult {
  language: string;
  bugs: BugReport[];
  fixedCode: string;
  changesSummary: string[];
}

interface BugFixerProps {
  onFix: (code: string) => Promise<BugFixResult>;
  onExtractCode: (file: File) => Promise<string>;
}

export const BugFixer = ({ onFix, onExtractCode }: BugFixerProps) => {
  const [inputMode, setInputMode] = useState<'paste' | 'image'>('paste');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<BugFixResult | null>(null);
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

  const handleFix = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    try {
      const fixResult = await onFix(code);
      setResult(fixResult);
    } catch (error) {
      console.error('Fix error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-destructive border-destructive/30 bg-destructive/10';
      case 'high': return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      case 'medium': return 'text-warning border-warning/30 bg-warning/10';
      case 'low': return 'text-muted-foreground border-border bg-secondary/50';
      default: return 'text-muted-foreground border-border bg-secondary/50';
    }
  };

  const getBugTypeIcon = (type: string) => {
    switch (type) {
      case 'syntax': return <Code2 className="h-4 w-4" />;
      case 'logic': return <Bug className="h-4 w-4" />;
      case 'security': return <AlertTriangle className="h-4 w-4" />;
      case 'performance': return <Wrench className="h-4 w-4" />;
      case 'deprecated': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Bug Detector & Fixer
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
                <Bug className="h-4 w-4" />
                Upload Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paste" className="mt-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your buggy code here..."
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

          {/* Fix Button */}
          <Button
            onClick={handleFix}
            disabled={!code.trim() || isLoading}
            className="w-full gap-2"
            size="lg"
          >
            <Wrench className="h-4 w-4" />
            Detect & Fix Bugs
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && <AnalysisLoader />}

      {/* Bug Fix Result */}
      {result && !isLoading && (
        <div className="space-y-4 animate-fade-in">
          {/* Language Badge */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-mono text-sm border border-primary/30">
              {result.language}
            </div>
            <span className="text-sm text-muted-foreground">detected</span>
          </div>

          {/* Bugs Found */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                Bugs Found ({result.bugs.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.bugs.length > 0 ? (
                result.bugs.map((bug, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      getSeverityColor(bug.severity)
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getBugTypeIcon(bug.type)}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium capitalize">{bug.type} Issue</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium uppercase",
                            getSeverityColor(bug.severity)
                          )}>
                            {bug.severity}
                          </span>
                          {bug.line && (
                            <span className="text-xs font-mono text-muted-foreground">
                              Line {bug.line}
                            </span>
                          )}
                        </div>
                        <p className="text-sm opacity-90">{bug.description}</p>
                        <div className="pt-2 border-t border-current/20">
                          <p className="text-sm">
                            <span className="font-medium">Fix:</span> {bug.fix}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-success p-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No bugs detected! Your code looks clean.</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Changes Summary */}
          {result.changesSummary.length > 0 && (
            <Card variant="glass" className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Changes Made
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.changesSummary.map((change, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Fixed Code */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-success" />
                Fixed Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={result.fixedCode}
                language={result.language.toLowerCase()}
                fileName={`fixed.${getExtension(result.language)}`}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

function getExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'cs',
    ruby: 'rb',
    go: 'go',
    rust: 'rs',
    php: 'php',
    swift: 'swift',
    kotlin: 'kt',
    dart: 'dart',
    html: 'html',
    css: 'css',
  };
  return extensions[language.toLowerCase()] || 'txt';
}
