import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', text, className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative">
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        <div className="absolute inset-0 blur-lg">
          <Loader2 className={cn("animate-spin text-primary opacity-50", sizeClasses[size])} />
        </div>
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const AnalysisLoader = () => (
  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-ping" />
      </div>
    </div>
    <div className="text-center space-y-1">
      <p className="font-medium">Analyzing your code...</p>
      <p className="text-sm text-muted-foreground">This may take a few seconds</p>
    </div>
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);
