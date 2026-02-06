import { LogIn, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AuthGateProps {
  children: React.ReactNode;
  featureName: string;
}

export const AuthGate = ({ children, featureName }: AuthGateProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 md:p-8">
        <Card variant="glass" className="w-full max-w-md text-center">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 mx-auto">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl md:text-2xl">
              Sign in to access {featureName}
            </CardTitle>
            <CardDescription>
              Please sign in to continue using VisionCode AI features. Create a free account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="w-4 h-4" />
              Sign In to Continue
            </Button>
            <p className="text-xs text-muted-foreground">
              Don't have an account? You can create one for free on the sign in page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
