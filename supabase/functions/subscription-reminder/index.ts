import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const generateReminderEmail = (daysRemaining: number, expiryDate: string, plan: string) => {
  const planName = plan === 'monthly' ? 'Monthly' : 'Yearly';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #10b981; }
    .content { background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
    .alert { background: ${daysRemaining <= 1 ? '#fef2f2' : '#fffbeb'}; border-left: 4px solid ${daysRemaining <= 1 ? '#ef4444' : '#f59e0b'}; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">VisionCode AI</div>
    </div>
    <div class="content">
      <div class="alert">
        <strong>⏰ Subscription Expiring ${daysRemaining === 1 ? 'Tomorrow' : `in ${daysRemaining} Days`}!</strong>
      </div>
      <p>Hi there,</p>
      <p>Your <strong>${planName} Premium</strong> subscription is set to expire on <strong>${expiryDate}</strong>.</p>
      <p>To continue enjoying unlimited access to:</p>
      <ul>
        <li>🚀 AI Code Generator</li>
        <li>💬 AI Chatbot</li>
        <li>📊 Priority Support</li>
      </ul>
      <p>Renew your subscription before it expires to avoid any interruption in service.</p>
      <p style="text-align: center; margin-top: 30px;">
        <a href="https://visioncode.ai/subscription" class="btn">Renew Now</a>
      </p>
    </div>
    <div class="footer">
      <p>Thank you for being a VisionCode AI Premium member!</p>
      <p>© 2024 VisionCode AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const now = new Date();
    const oneDayFromNow = new Date(now);
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
    
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    // Format dates for comparison (start and end of each target day)
    const formatDateStart = (d: Date) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.toISOString();
    };
    
    const formatDateEnd = (d: Date) => {
      const date = new Date(d);
      date.setHours(23, 59, 59, 999);
      return date.toISOString();
    };

    console.log("Checking for subscriptions expiring in 1 or 3 days...");

    // Get subscriptions expiring in exactly 1 day
    const { data: oneDayExpiring, error: error1 } = await supabase
      .from("subscriptions")
      .select("*, profiles!inner(user_id)")
      .eq("status", "active")
      .gte("expires_at", formatDateStart(oneDayFromNow))
      .lte("expires_at", formatDateEnd(oneDayFromNow));

    if (error1) {
      console.error("Error fetching 1-day expiring subscriptions:", error1);
    }

    // Get subscriptions expiring in exactly 3 days
    const { data: threeDaysExpiring, error: error3 } = await supabase
      .from("subscriptions")
      .select("*, profiles!inner(user_id)")
      .eq("status", "active")
      .gte("expires_at", formatDateStart(threeDaysFromNow))
      .lte("expires_at", formatDateEnd(threeDaysFromNow));

    if (error3) {
      console.error("Error fetching 3-day expiring subscriptions:", error3);
    }

    const emailsSent: string[] = [];
    const errors: string[] = [];

    // Process 1-day reminders
    if (oneDayExpiring && oneDayExpiring.length > 0) {
      console.log(`Found ${oneDayExpiring.length} subscriptions expiring in 1 day`);
      
      for (const sub of oneDayExpiring) {
        // Get user email from auth.users
        const { data: authUser } = await supabase.auth.admin.getUserById(sub.user_id);
        
        if (authUser?.user?.email) {
          const expiryDate = new Date(sub.expires_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          try {
            await resend.emails.send({
              from: "VisionCode AI <onboarding@resend.dev>",
              to: [authUser.user.email],
              subject: "⚠️ Your VisionCode AI Premium expires tomorrow!",
              html: generateReminderEmail(1, expiryDate, sub.plan),
            });
            emailsSent.push(authUser.user.email);
            console.log(`Sent 1-day reminder to ${authUser.user.email}`);
          } catch (emailError: any) {
            console.error(`Failed to send email to ${authUser.user.email}:`, emailError);
            errors.push(`Failed: ${authUser.user.email} - ${emailError.message}`);
          }
        }
      }
    }

    // Process 3-day reminders
    if (threeDaysExpiring && threeDaysExpiring.length > 0) {
      console.log(`Found ${threeDaysExpiring.length} subscriptions expiring in 3 days`);
      
      for (const sub of threeDaysExpiring) {
        const { data: authUser } = await supabase.auth.admin.getUserById(sub.user_id);
        
        if (authUser?.user?.email) {
          const expiryDate = new Date(sub.expires_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          try {
            await resend.emails.send({
              from: "VisionCode AI <onboarding@resend.dev>",
              to: [authUser.user.email],
              subject: "🔔 Your VisionCode AI Premium expires in 3 days",
              html: generateReminderEmail(3, expiryDate, sub.plan),
            });
            emailsSent.push(authUser.user.email);
            console.log(`Sent 3-day reminder to ${authUser.user.email}`);
          } catch (emailError: any) {
            console.error(`Failed to send email to ${authUser.user.email}:`, emailError);
            errors.push(`Failed: ${authUser.user.email} - ${emailError.message}`);
          }
        }
      }
    }

    console.log(`Reminder job complete. Sent ${emailsSent.length} emails.`);

    return new Response(
      JSON.stringify({
        success: true,
        emailsSent: emailsSent.length,
        emails: emailsSent,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in subscription-reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
