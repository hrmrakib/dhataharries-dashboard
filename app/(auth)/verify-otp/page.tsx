"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change and auto-focus to next input
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them
      const digits = value.split("").slice(0, otp.length);
      const newOtp = [...otp];

      digits.forEach((digit, i) => {
        if (index + i < otp.length) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on the appropriate input after pasting
      const nextIndex = Math.min(index + digits.length, otp.length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Normal single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input if current input is filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus on previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const otpValue = otp.join("");

    // Validate OTP
    if (otpValue.length !== 4 || !/^\d+$/.test(otpValue)) {
      toast.error("Please enter a valid OTP");

      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success notification
      toast.success("Verification successful");

      // Redirect to dashboard or home page after successful verification
      // window.location.href = "/dashboard"
    } catch (error) {
      toast.warning("The OTP you entered is incorrect or has expired");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30); // 30 seconds cooldown

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("OTP Resent");

      // Clear current OTP fields
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  return (
    <div className='w-full flex min-h-screen flex-col items-center justify-center p-4 md:p-8'>
      <div className='container mx-auto space-y-8 flex flex-col md:flex-row items-center'>
        <div className='flex flex-col md:flex-row items-center'>
          <Link href='/' className='mb-6 w-1/2'>
            <Image
              src='/logo.png'
              alt='DesignDoc Logo'
              width={300}
              height={150}
              priority
            />
          </Link>

          <div className='w-1/2'>
            <div className='text-center space-y-2'>
              <h1 className='text-[32px] font-semibold text-primary'>
                Verify with OTP
              </h1>
              <p className='text-lg text-primary'>
                To ensure your security. please enter the One-Time password
                (OTP) sent to your registered mobile/email below.
              </p>
            </div>
            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
              <div className='flex justify-center gap-2 md:gap-4'>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    maxLength={4}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='h-14 w-14 md:h-16 md:w-16 text-center text-xl font-semibold'
                    autoFocus={index === 0}
                    disabled={isSubmitting}
                  />
                ))}
              </div>

              <div className='flex justify-center'>
                <p className='text-lg text-primary'>
                  Didn&apos;t receive the OTP?{" "}
                  <button
                    type='button'
                    onClick={handleResend}
                    disabled={resendDisabled}
                    className='text-[#F99F04] hover:text-[#ffaf25] font-medium disabled:text-gray-400 disabled:cursor-not-allowed'
                  >
                    {resendDisabled ? `Resend (${countdown}s)` : "Resend"}
                  </button>
                </p>
              </div>

              <button
                type='submit'
                className='w-full !bg-[#F99F04] hover:bg-[#F99F04] text-[#FFFDF7] py-2 rounded-md transition-colors'
                disabled={isSubmitting || otp.some((digit) => !digit)}
              >
                {isSubmitting ? "Verifying..." : "Submit"}
              </button>

              <div className='text-center'>
                <Link
                  href='/signin'
                  className='text-primary hover:text-primary text-sm font-medium'
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
