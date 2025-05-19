"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      const res = await forgotPassword({ email }).unwrap();
      console.log(res, "res");
      // In a real app, you would call your authentication API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempted with:", { email });
      toast.success(res?.message || "Email sent successfully!");
      router.push(`/forgetVerify?email=${email}`);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-center bg-cover flex items-center justify-center p-4'>
      <div className='absolute top-0 left-0 w-full h-full inset-0 bg-[#2c383c8c] opacity-50'></div>

      <div className='bg-white rounded-lg shadow-lg max-w-[545px] w-full p-6 md:p-8 z-[100]'>
        <div>
          <h1 className='text-[32px] font-semibold text-center text-[#2C383C] mb-2'>
            Forget Password
          </h1>
          <p className='text-lg text-center text-[#2C383C] mb-8 w-[350px] mx-auto'>
            Please enter your email address to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <Mail className='h-5 w-5 text-gray-400' />
            </div>
            <Input
              type='email'
              placeholder='Enter your email...'
              className='pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <Button
            type='submit'
            className='w-full h-[56px] text-lg font-medium bg-[#7a0c2e] hover:bg-[#690a27] text-white py-2 rounded-full'
            disabled={isLoading}
          >
            {isLoading ? "Send OTP ..." : "Send OTP"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className='mt-6 text-center text-base'>
          <span className='text-[#2C383C] text-base'>Already have account? </span>
          <Link
            href='/sign-in'
            className='text-[#760C2A] font-medium hover:underline'
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
