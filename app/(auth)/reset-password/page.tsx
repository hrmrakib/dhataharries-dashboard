"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  // Validate password on change
  useEffect(() => {
    validatePassword(password);
  }, [password]);

  // Validate confirm password on change
  useEffect(() => {
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  }, [confirmPassword, password]);

  const validatePassword = (value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, password: "" }));
      return false;
    }

    if (value.length < 8 || value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be 8-10 characters long",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate both fields
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = password === confirmPassword;

    if (!isPasswordValid) {
      return;
    }

    if (!isConfirmValid) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to update password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password updated:", { password });
      alert("Password updated successfully!");
      router.push("/");
      // Redirect to login page or dashboard
    } catch (error) {
      console.error("Failed to update password:", error);
      alert("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-center bg-cover flex items-center justify-center p-4'>
      <div className='absolute top-0 left-0 w-full h-full bg-[#2c383c8c] opacity-50'></div>
      <div className='bg-white rounded-lg shadow-lg max-w-[645px] w-full p-6 md:p-16 z-[100]'>
        {/* Header */}
        <div className='flex items-center justify-center mb-4'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 19L3 12M3 12L10 5M3 12L21 12'
              stroke='#2C383C'
              strokeWidth='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>

          <h1 className='text-[32px] font-semibold text-center text-[#2C383C] ml-2'>
            Create New Password
          </h1>
        </div>

        {/* Subtitle */}
        <p className='text-base text-[#2C383C] text-center mb-6'>
          Your password must be 8-10 character long.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* New Password Input */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <KeyRound className='h-5 w-5 text-[#2C383C]' />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='New Password'
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
                <EyeOff className='h-5 w-5 text-[#2C383C]' />
              ) : (
                <Eye className='h-5 w-5 text-[#2C383C]' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
          )}

          {/* Confirm Password Input */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <KeyRound className='h-5 w-5 text-[#2C383C]' />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder='Re-type Password'
              className='pl-10 pr-10 py-2 rounded-full border border-[#2C383C] placeholder:text-[#2C383C] w-full'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type='button'
              className='absolute inset-y-0 right-3 flex items-center'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
              ) : (
                <Eye className='h-5 w-5 text-gray-400' />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.confirmPassword}
            </p>
          )}

          {/* Confirm Button */}
          <Button
            type='submit'
            className='w-full h-14 bg-[#760C2A] hover:bg-[#760C2A] text-lg text-white py-2 rounded-full mt-4'
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </Button>
        </form>
      </div>
    </main>
  );
}
