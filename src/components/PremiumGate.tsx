import { useState } from 'react';
import { Lock, Crown, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface PremiumGateProps {
  children: React.ReactNode;
  featureName: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PremiumGate = ({ children, featureName }: PremiumGateProps) => {
  const { isPremium, loading, refreshSubscription } = useSubscription();
  const { user } = useAuth();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    if (!user) {
      toast.error('Please login to subscribe');
      return;
    }

    if (!agreedToPolicy) {
      toast.error('Please agree to the non-refundable policy to continue');
      return;
    }

    setProcessingPayment(true);
    setSelectedPlan(plan);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-create-order', {
        body: { plan },
      });

      if (orderError || !orderData) {
        throw new Error(orderError?.message || 'Failed to create order');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'VisionCode AI',
        description: `${plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium Subscription`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-verify-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan,
              },
            });

            if (verifyError || !verifyData?.success) {
              throw new Error('Payment verification failed');
            }

            toast.success('Premium activated successfully!');
            refreshSubscription();
          } catch (err) {
            console.error('Payment verification error:', err);
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setProcessingPayment(false);
            setSelectedPlan(null);
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false);
            setSelectedPlan(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to process subscription');
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Unlock {featureName}
        </h2>
        <p className="text-muted-foreground max-w-md">
          This is a premium feature. Subscribe to get unlimited access to AI Code Generator and AI Chatbot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Monthly Plan */}
        <Card className="relative border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Monthly Plan
            </CardTitle>
            <CardDescription>Perfect for trying out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-4xl font-bold">₹299</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                AI Code Generator
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                AI Chatbot
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                1 Month Access
              </li>
            </ul>
            <Button 
              className="w-full" 
              onClick={() => handleSubscribe('monthly')}
              disabled={processingPayment}
            >
              {processingPayment && selectedPlan === 'monthly' ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                'Subscribe Monthly'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Yearly Plan */}
        <Card className="relative border-2 border-primary bg-primary/5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              BEST VALUE
            </span>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Yearly Plan
            </CardTitle>
            <CardDescription>Save ₹2,989 per year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-4xl font-bold">₹599</span>
              <span className="text-muted-foreground">/year</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                AI Code Generator
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                AI Chatbot
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                12 Months Access
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                Priority Support
              </li>
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" 
              onClick={() => handleSubscribe('yearly')}
              disabled={processingPayment}
            >
              {processingPayment && selectedPlan === 'yearly' ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                'Subscribe Yearly'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Non-refundable policy checkbox */}
      {user && (
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <Checkbox 
              id="refund-policy" 
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="refund-policy" 
                className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                I understand and agree to the non-refundable policy
              </Label>
              <p className="text-xs text-muted-foreground">
                All subscription purchases are final and non-refundable. By checking this box, you acknowledge that you have read and agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>, 
                including the billing and refund policy.
              </p>
            </div>
          </div>
        </div>
      )}

      {!user && (
        <p className="mt-6 text-sm text-muted-foreground">
          <Lock className="w-4 h-4 inline mr-1" />
          Please <a href="/auth" className="text-primary hover:underline">login</a> to subscribe
        </p>
      )}
    </div>
  );
};
