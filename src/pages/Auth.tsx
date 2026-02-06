import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { PhoneAuthForm } from '@/components/auth/PhoneAuthForm';

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleAuthSuccess = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <Card variant="glass" className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to VisionCode AI</CardTitle>
          <CardDescription>
            Sign in with your phone number to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PhoneAuthForm onSuccess={handleAuthSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
