import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Loader2, ArrowLeft } from 'lucide-react';
import { CountryCodeSelector } from './CountryCodeSelector';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const phoneSchema = z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number');

interface PhoneAuthFormProps {
  onSuccess: () => void;
}

type AuthStep = 'phone' | 'otp';

export const PhoneAuthForm = ({ onSuccess }: PhoneAuthFormProps) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const maxOtpAttempts = 5;

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  const validatePhone = () => {
    const result = phoneSchema.safeParse(phoneNumber);
    if (!result.success) {
      setPhoneError(result.error.errors[0].message);
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhone()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (error) {
        toast({
          title: 'Failed to send OTP',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'OTP Sent',
          description: `A verification code has been sent to ${fullPhoneNumber}`,
        });
        setStep('otp');
        setResendCooldown(60); // 60 second cooldown
        setOtpAttempts(0);
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a 6-digit verification code.',
        variant: 'destructive',
      });
      return;
    }

    if (otpAttempts >= maxOtpAttempts) {
      toast({
        title: 'Too many attempts',
        description: 'Please request a new OTP.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setOtpAttempts(prev => prev + 1);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) {
        toast({
          title: 'Verification failed',
          description: error.message,
          variant: 'destructive',
        });
        setOtp('');
      } else if (data.user) {
        // Check if profile exists, create if not
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', data.user.id)
          .single();

        if (!profile) {
          // Profile should be created by trigger, but create manually if not
          await supabase.from('profiles').insert({
            user_id: data.user.id,
            display_name: phoneNumber,
          });
        }

        toast({
          title: 'Welcome!',
          description: 'You have been signed in successfully.',
        });
        onSuccess();
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    await handleSendOtp();
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
    setOtpAttempts(0);
  };

  if (step === 'otp') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-medium">Verify your phone</h3>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to {fullPhoneNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <InputOTP
            value={otp}
            onChange={setOtp}
            maxLength={6}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerifyOtp}
          className="w-full"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Verify & Continue
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || isLoading}
              className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
            </button>
          </p>
          {otpAttempts > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Attempts: {otpAttempts}/{maxOtpAttempts}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <CountryCodeSelector
            value={countryCode}
            onChange={setCountryCode}
            disabled={isLoading}
          />
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="1234567890"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhoneNumber(value);
                setPhoneError(null);
              }}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
      </div>

      <Button
        onClick={handleSendOtp}
        className="w-full"
        disabled={isLoading || phoneNumber.length !== 10}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Send OTP
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};
