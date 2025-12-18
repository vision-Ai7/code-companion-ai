-- Create subscription plans enum
CREATE TYPE public.subscription_plan AS ENUM ('monthly', 'yearly');

-- Create subscription status enum
CREATE TYPE public.subscription_status AS ENUM ('active', 'expired', 'cancelled');

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan subscription_plan NOT NULL,
  status subscription_status NOT NULL DEFAULT 'active',
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
ON public.subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();