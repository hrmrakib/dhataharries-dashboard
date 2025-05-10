"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PersonalInformationEditPage() {
  const [formData, setFormData] = useState({
    name: "Sharon",
    email: "alkhahiaksaikgkgaik@hmail.com",
    phone: "alkhahiaksaikgkgaik@hmail.com",
    countryCode: "+1242",
  });

  const [profileImage, setProfileImage] = useState<string>("/admin.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated personal information:", { ...formData, profileImage });
    // Show success message or handle errors
  };

  return (
    <div className='flex bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6'>
              <Link
                href='/setting/personal-information'
                className='inline-flex items-center text-primary hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl font-semibold'>
                  Personal Information Edit
                </span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='flex flex-col md:flex-row gap-8'>
                {/* Profile Image Section */}
                <div className='w-full md:w-64 flex flex-col items-center border border-gray-200 rounded-md p-6 bg-white'>
                  <div
                    className='relative mb-4 cursor-pointer'
                    onClick={handleImageClick}
                  >
                    <div className='w-32 h-32 rounded-full overflow-hidden relative'>
                      <Image
                        src={profileImage || "/admin.jpg"}
                        alt='Profile'
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200'>
                      <Camera className='h-5 w-5 text-gray-600' />
                    </div>
                    <input
                      type='file'
                      ref={fileInputRef}
                      className='hidden'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  </div>
                  <span className='text-sm text-gray-600'>Profile</span>
                  <span className='font-medium text-gray-800'>Admin</span>
                </div>

                {/* Form Fields Section */}
                <div className='flex-1 space-y-4'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='name'
                      className='text-lg font-medium text-primary'
                    >
                      Name
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full text-lg text-primary'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-lg font-medium text-primary'
                    >
                      Email
                    </Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full text-lg text-primary'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='phone'
                      className='text-lg font-medium text-primary'
                    >
                      Phone Number
                    </Label>
                    <div className='w-full'>
                      <PhoneInput
                        country={"us"}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        containerClass='w-full' // Ensures the entire component takes full width
                        inputClass='w-full h-[100px] p-2 border border-[#20474E] rounded-md text-5xl font-semibold text-[#20474E]' // Ensures input field spans full width
                        buttonClass='border-[#20474E]' // Optional: styles for the country dropdown button
                        inputStyle={{ width: "100%", height: "40px", border: "1px solid #20474E" }} // Inline style fallback if inputClass fails
                        placeholder='Enter phone number'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <Button type='submit' className='bg-teal-800 hover:bg-teal-700'>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
