import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Download, Calendar, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface SubscriptionRecord {
  id: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  amount_paid: number;
  currency: string;
  started_at: string;
  expires_at: string;
  razorpay_payment_id: string | null;
  created_at: string;
}

const Subscription = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscription, isPremium, loading: subLoading } = useSubscription();
  const [history, setHistory] = useState<SubscriptionRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data as SubscriptionRecord[]);
      } catch (err) {
        console.error('Error fetching subscription history:', err);
        toast.error('Failed to load subscription history');
      } finally {
        setLoadingHistory(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const generateInvoice = (sub: SubscriptionRecord) => {
    const invoiceContent = `
INVOICE
=======

VisionCode AI
Premium Subscription Invoice

Invoice Number: INV-${sub.id.slice(0, 8).toUpperCase()}
Date: ${format(new Date(sub.created_at), 'dd MMM yyyy')}

Customer Email: ${user?.email}

-----------------------------------

Plan: ${sub.plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium
Amount: ₹${sub.amount_paid}
Currency: ${sub.currency}

Period: ${format(new Date(sub.started_at), 'dd MMM yyyy')} - ${format(new Date(sub.expires_at), 'dd MMM yyyy')}

Payment ID: ${sub.razorpay_payment_id || 'N/A'}
Status: ${sub.status.toUpperCase()}

-----------------------------------

Thank you for subscribing to VisionCode AI Premium!

For support: support@visioncode.ai
    `.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VisionCode-Invoice-${sub.id.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Invoice downloaded');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" /> Active</Badge>;
      case 'expired':
        return <Badge variant="secondary" className="bg-muted"><Clock className="w-3 h-3 mr-1" /> Expired</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Subscription Management</h1>
            <p className="text-muted-foreground">Manage your VisionCode AI premium subscription</p>
          </div>
        </div>

        {/* Current Subscription Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPremium && subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {subscription.plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{subscription.plan === 'monthly' ? '299' : '599'}/{subscription.plan === 'monthly' ? 'month' : 'year'}
                    </p>
                  </div>
                  {getStatusBadge(subscription.status)}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">{format(new Date(subscription.started_at), 'dd MMM yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expires</p>
                    <p className="font-medium">{format(new Date(subscription.expires_at), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">You don't have an active subscription</p>
                <Button asChild>
                  <Link to="/">Subscribe Now</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payment History
            </CardTitle>
            <CardDescription>View and download invoices for your past payments</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingHistory ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No payment history found
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {sub.plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium
                        </p>
                        {getStatusBadge(sub.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(sub.created_at), 'dd MMM yyyy, hh:mm a')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">₹{sub.amount_paid}</p>
                        <p className="text-xs text-muted-foreground">{sub.currency}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateInvoice(sub)}
                        className="gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
