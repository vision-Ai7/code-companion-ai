import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User authentication failed:', userError);
      return new Response(
        JSON.stringify({ error: 'User not authenticated' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
      return new Response(
        JSON.stringify({ error: 'Missing payment details' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keySecret) {
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(keySecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const data = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (expectedSignature !== razorpay_signature) {
      console.error('Signature verification failed');
      return new Response(
        JSON.stringify({ error: 'Payment verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Payment verified for user:', user.id, 'Plan:', plan);

    // Calculate expiry date
    const now = new Date();
    const expiresAt = new Date(now);
    if (plan === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    } else {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    }

    // Use service role to insert subscription
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminSupabase = createClient(supabaseUrl, serviceRoleKey);

    // First, expire any existing active subscriptions
    await adminSupabase
      .from('subscriptions')
      .update({ status: 'expired' })
      .eq('user_id', user.id)
      .eq('status', 'active');

    // Insert new subscription
    const { data: subscription, error: insertError } = await adminSupabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan,
        status: 'active',
        razorpay_payment_id,
        razorpay_order_id,
        amount_paid: plan === 'monthly' ? 299 : 599,
        currency: 'INR',
        started_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create subscription:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to activate subscription' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Subscription created:', subscription.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        subscription: {
          id: subscription.id,
          plan: subscription.plan,
          expiresAt: subscription.expires_at,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
