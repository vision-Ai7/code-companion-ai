import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/CodeBlock';
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, Code2, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultProps {
  result: {
    language: string;
    description: string;
    strengths: string[];
    problems: string[];
    suggestions: string[];
    securityIssues?: string[];
    performanceNotes?: string[];
    cleanCode?: string;
  };
}

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Language Badge */}
      <div className="flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-mono text-sm border border-primary/30">
          {result.language}
        </div>
        <span className="text-sm text-muted-foreground">detected</span>
      </div>

      {/* Description */}
      <Card variant="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            What this code does
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{result.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card variant="glass" className="border-success/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Problems */}
        <Card variant="glass" className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.problems.length > 0 ? (
                result.problems.map((problem, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">No major problems detected!</span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Security Issues */}
      {result.securityIssues && result.securityIssues.length > 0 && (
        <Card variant="glass" className="border-warning/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-warning">
              <Shield className="h-5 w-5" />
              Security Concerns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.securityIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{issue}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      <Card variant="glass" className="border-accent/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-accent">
            <Lightbulb className="h-5 w-5" />
            Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Clean Code */}
      {result.cleanCode && (
        <Card variant="glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Optimized Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={result.cleanCode}
              language={result.language.toLowerCase()}
              fileName={`optimized.${getExtension(result.language)}`}
            />
          </CardContent>
        </Card>
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
