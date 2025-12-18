import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Subscription {
  id: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  expires_at: string;
  started_at: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const checkSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setIsPremium(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      if (data) {
        const expiresAt = new Date(data.expires_at);
        const now = new Date();
        
        if (expiresAt > now) {
          setSubscription(data as Subscription);
          setIsPremium(true);
        } else {
          setSubscription(null);
          setIsPremium(false);
        }
      } else {
        setSubscription(null);
        setIsPremium(false);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  const refreshSubscription = () => {
    setLoading(true);
    checkSubscription();
  };

  return {
    subscription,
    isPremium,
    loading,
    refreshSubscription,
  };
};
