import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

export const CodeBlock = ({ code, language = 'javascript', showLineNumbers = true, fileName }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Code copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || `code.${language}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Code file downloaded' });
  };

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'hsl(222 47% 8%)',
      borderRadius: '0.75rem',
      padding: '0.75rem',
      margin: 0,
      fontSize: '0.75rem',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: '"JetBrains Mono", monospace',
    },
  };

  // Responsive custom styles
  const getResponsiveStyle = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 640) {
      return {
        ...customStyle,
        'pre[class*="language-"]': {
          ...customStyle['pre[class*="language-"]'],
          padding: '1.5rem',
          fontSize: '0.875rem',
        },
      };
    }
    return customStyle;
  };

  return (
    <div className="relative group rounded-lg sm:rounded-xl overflow-hidden border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-warning/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-mono ml-1 sm:ml-2 truncate max-w-[120px] sm:max-w-none">
            {fileName || language}
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 sm:h-7 sm:w-7 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-success" /> : <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 sm:h-7 sm:w-7 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            onClick={handleDownload}
          >
            <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto overflow-y-auto max-h-[300px] sm:max-h-[500px]">
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={false}
          lineNumberStyle={{
            color: 'hsl(215 20% 40%)',
            paddingRight: '0.5rem',
            minWidth: '2rem',
            fontSize: '0.7rem',
          }}
          customStyle={{
            margin: 0,
            padding: '0.75rem',
            fontSize: '0.7rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
