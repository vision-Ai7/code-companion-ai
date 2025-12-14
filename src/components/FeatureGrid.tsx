import { 
  Code2, 
  ImageIcon, 
  MessageSquare, 
  Sparkles, 
  Bug, 
  FileCode,
  ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
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
  },
  {
    id: 'chat',
    title: 'AI Chatbot',
    description: 'Chat about coding doubts, frameworks, and best practices',
    icon: <MessageSquare className="h-6 w-6" />,
    gradient: 'from-indigo-500 to-violet-500',
  },
];

interface FeatureCardProps {
  feature: Feature;
  onClick: (id: string) => void;
  delay?: number;
}

export const FeatureCard = ({ feature, onClick, delay = 0 }: FeatureCardProps) => {
  return (
    <Card
      variant="feature"
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick(feature.id)}
    >
      <CardHeader className="pb-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110",
          `bg-gradient-to-br ${feature.gradient}`
        )}>
          <div className="text-white">{feature.icon}</div>
        </div>
        <CardTitle className="flex items-center justify-between">
          {feature.title}
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

interface FeatureGridProps {
  onFeatureSelect: (id: string) => void;
}

export const FeatureGrid = ({ onFeatureSelect }: FeatureGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          onClick={onFeatureSelect}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export { features };
