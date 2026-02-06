import { 
  Code2, 
  ImageIcon, 
  MessageSquare, 
  Sparkles, 
  Bug, 
  FileCode,
  ChevronRight,
  Crown,
  Lock,
  LogIn
} from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  isPremium?: boolean;
}

const features: Feature[] = [
  {
    id: 'image',
    title: 'Code from Image',
    description: 'Upload or capture code images for instant OCR extraction and analysis',
    icon: <ImageIcon className="h-6 w-6" />,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'analyze',
    title: 'Code Analyzer',
    description: 'Deep analysis of logic, syntax, best practices, and security',
    icon: <Code2 className="h-6 w-6" />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'explain',
    title: 'Code Explainer',
    description: 'Line-by-line explanations with beginner and advanced modes',
    icon: <Sparkles className="h-6 w-6" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'bugs',
    title: 'Bug Detector',
    description: 'Find and fix bugs, security issues, and deprecated methods',
    icon: <Bug className="h-6 w-6" />,
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'generate',
    title: 'Code Generator',
    description: 'Generate complete, working code from natural language',
    icon: <FileCode className="h-6 w-6" />,
    gradient: 'from-yellow-500 to-amber-500',
    isPremium: true,
  },
  {
    id: 'chat',
    title: 'AI Chatbot',
    description: 'Chat about coding doubts, frameworks, and best practices',
    icon: <MessageSquare className="h-6 w-6" />,
    gradient: 'from-indigo-500 to-violet-500',
    isPremium: true,
  },
];

interface FeatureCardProps {
  feature: Feature;
  onClick: (id: string) => void;
  delay?: number;
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export const FeatureCard = ({ feature, onClick, delay = 0, isLoggedIn, onSignInClick }: FeatureCardProps) => {
  const handleClick = () => {
    if (!isLoggedIn) {
      onSignInClick();
      return;
    }
    onClick(feature.id);
  };

  return (
    <Card
      variant="feature"
      className={cn(
        "group cursor-pointer animate-fade-in relative",
        !isLoggedIn && "opacity-75"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      {/* Premium Badge */}
      {feature.isPremium && (
        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 gap-1">
          <Crown className="h-3 w-3" />
          Premium
        </Badge>
      )}
      
      {/* Lock Overlay for logged out users */}
      {!isLoggedIn && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Sign in to access</span>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110",
          `bg-gradient-to-br ${feature.gradient}`
        )}>
          <div className="text-white [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-6 sm:[&>svg]:w-6">{feature.icon}</div>
        </div>
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          {feature.title}
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

interface FeatureGridProps {
  onFeatureSelect: (id: string) => void;
}

export const FeatureGrid = ({ onFeatureSelect }: FeatureGridProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <div className="space-y-6">
      {/* Sign In CTA when logged out */}
      {!isLoggedIn && (
        <Card variant="glass" className="p-6 text-center mb-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Sign in to unlock all features</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a free account to use VisionCode AI's powerful code analysis tools
              </p>
              <Button onClick={handleSignInClick} className="gap-2">
                <LogIn className="h-4 w-4" />
                Sign In to Continue
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onClick={onFeatureSelect}
            delay={index * 100}
            isLoggedIn={isLoggedIn}
            onSignInClick={handleSignInClick}
          />
        ))}
      </div>
    </div>
  );
};

export { features };
