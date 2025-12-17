import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AnalysisLoader } from '@/components/LoadingSpinner';
import { AnalysisResult } from '@/components/AnalysisResult';
import { ImageUpload } from '@/components/ImageUpload';
import { Code2, Scan, ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalysisResultData {
  language: string;
  description: string;
  strengths: string[];
  problems: string[];
  suggestions: string[];
  securityIssues?: string[];
  performanceNotes?: string[];
  cleanCode?: string;
}

interface CodeAnalyzerProps {
  onAnalyze: (code: string) => Promise<AnalysisResultData>;
  onExtractCode: (file: File) => Promise<string>;
}

export const CodeAnalyzer = ({ onAnalyze, onExtractCode }: CodeAnalyzerProps) => {
  const [inputMode, setInputMode] = useState<'paste' | 'image'>('paste');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<AnalysisResultData | null>(null);
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

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    try {
      const analysisResult = await onAnalyze(code);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card variant="glass">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Scan className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Code Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
          {/* Input Mode Tabs */}
          <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'paste' | 'image')}>
            <TabsList className="w-full h-auto flex-wrap">
              <TabsTrigger value="paste" className="flex-1 gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Paste</span> Code
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1 gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Upload</span> Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paste" className="mt-3 sm:mt-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here for analysis..."
                className="min-h-[150px] sm:min-h-[200px] font-mono text-xs sm:text-sm"
              />
            </TabsContent>

            <TabsContent value="image" className="mt-3 sm:mt-4">
              <ImageUpload
                onImageSelect={handleImageSelect}
                isProcessing={isExtracting}
              />
              {code && (
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">Extracted code:</p>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[120px] sm:min-h-[150px] font-mono text-xs sm:text-sm"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!code.trim() || isLoading}
            className="w-full gap-2 text-sm sm:text-base"
            size="lg"
          >
            <Scan className="h-4 w-4" />
            Analyze Code
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && <AnalysisLoader />}

      {/* Analysis Result */}
      {result && !isLoading && <AnalysisResult result={result} />}
    </div>
  );
};
