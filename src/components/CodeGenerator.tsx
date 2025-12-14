import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CodeBlock } from '@/components/CodeBlock';
import { AnalysisLoader } from '@/components/LoadingSpinner';
import { Sparkles, FileCode } from 'lucide-react';

interface CodeGeneratorProps {
  onGenerate: (prompt: string, language: string) => Promise<string>;
}

const promptSuggestions = [
  'Create a calculator with basic operations',
  'Build a login form with validation',
  'Create a REST API endpoint for users',
  'Build a todo list with CRUD operations',
  'Create a weather app component',
  'Build a responsive navigation bar',
  'Create a form with email validation',
  'Build a pagination component',
];

export const CodeGenerator = ({ onGenerate }: CodeGeneratorProps) => {
  const [language, setLanguage] = useState('javascript');
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const code = await onGenerate(prompt, language);
      setGeneratedCode(code);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select Programming Language
            </label>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          {/* Prompt Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Describe what you want to build
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Create a function that calculates the factorial of a number..."
              className="min-h-[120px]"
            />
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="w-full gap-2"
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            Generate Code
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && <AnalysisLoader />}

      {/* Generated Code */}
      {generatedCode && !isLoading && (
        <Card variant="glass" className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={generatedCode}
              language={language}
              fileName={`generated.${getExtension(language)}`}
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
    react: 'jsx',
    vue: 'vue',
    angular: 'ts',
    nodejs: 'js',
  };
  return extensions[language] || 'txt';
}
