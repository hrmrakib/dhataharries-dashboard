"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted with data:", formData);
      setSubmitSuccess(true);

      // In a real app, you would redirect to dashboard or home page after successful login
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className='w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      <div className='container mx-auto flex flex-col md:flex-row items-center'>
        {/* Logo Section */}
        <div className='hidden w-full md:w-1/2 md:flex items-center justify-center p-8'>
          <Link href='/' className='max-w-xs'>
            <Image
              src='/logo.svg'
              alt='DesignDoc Logo'
              width={300}
              height={150}
              className='mb-2'
            />
          </Link>
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 max-w-md'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-primary mb-2'>
              Sign In Now
            </h1>
            <p className='text-primary text-lg'>
              Welcome back! Select method log in
            </p>
          </div>

          {submitSuccess ? (
            <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6'>
              Sign in successful! Redirecting to your dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-primary text-lg font-medium mb-1'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Full name...'
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border placeholder:text-primary ${
                    errors.name ? "border-red-500" : "border-slate-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-primary text-lg font-medium mb-1'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 border placeholder:text-primary ${
                      errors.password ? "border-red-500" : "border-slate-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    name='remember'
                    checked={formData.remember}
                    onChange={handleChange}
                    className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='remember'
                    className='ml-2 text-lg text-primary'
                  >
                    Remember
                  </label>
                </div>
                <Link
                  href='/forget-password'
                  className='text-lg font-medium text-[#F99F04] hover:underline'
                >
                  Forget Password?
                </Link>
              </div>

              {errors.submit && (
                <p className='text-red-500 text-sm'>{errors.submit}</p>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#F99F04] hover:bg-[#f99f04d2] text-[#FAFAFA] text-lg font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out'
              >
                {isSubmitting ? "Signing In..." : "Sign In Now"}
              </button>
            </form>
          )}

          <div className='text-center mt-6'>
            <p className='text-primary text-lg'>
              Don&apos;t have an account?{" "}
              <Link
                href='/create-account'
                className='text-primary text-lg font-medium hover:underline'
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
