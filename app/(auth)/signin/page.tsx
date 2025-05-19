"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      const res = await login({ email, password }).unwrap();
      console.log("res", res);
      localStorage.setItem("accessToken", res?.access);
      // In a real app, you would call your authentication API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempted with:", { email, password });
      // alert("Login successful!");
      toast.success(res?.message || "Login successful!");

      router.push("/");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-center bg-cover flex items-center justify-center p-4'>
      <div className='absolute top-0 left-0 w-full h-full bg-[#2c383c8c] opacity-50'></div>
      <div className='bg-white rounded-lg shadow-lg max-w-md w-full p-6 md:p-8 z-[100]'>
        <h1 className='text-[32px] font-semibold text-center text-[#2C383C] mb-8'>
          Login
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <Mail className='h-5 w-5 text-[#2C383C]' />
            </div>
            <Input
              type='email'
              placeholder='Enter your email...'
              className='pl-10 pr-4 py-2.5 rounded-full bg-transparent border border-[#2C383C] placeholder:text-[#2C383C] w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <KeyRound className='h-5 w-5 text-[#2C383C]' />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='Enter Password'
              className='pl-10 pr-10 py-2 rounded-full border border-[#2C383C] placeholder:text-[#2C383C] w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='button'
              className='absolute inset-y-0 right-3 flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
              ) : (
                <Eye className='h-5 w-5 text-gray-400' />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className='flex justify-end'>
            <Link
              href='/forget-password'
              className='text-base text-[#2C383C] hover:text-[#7a0c2e] hover:underline'
            >
              Forgot Password
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type='submit'
            className='w-full bg-[#7a0c2e] hover:bg-[#690a27] text-white py-2 rounded-full'
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
}
