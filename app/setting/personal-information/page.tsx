"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";

export default function PersonalInformationPage() {
  const userData = {
    name: "Sharon",
    email: "alkhahiaksk@hmail.com",
    phone: "+88017999855325",
    profileImage: "/admin.jpg",
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-primary hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl font-semibold'>
                  Personal Information
                </span>
              </Link>
              <Link href='/setting/personal-information/edit'>
                <Button variant='outline' className='flex items-center gap-2'>
                  <Edit className='h-4 w-4' />
                  <span>Edit</span>
                </Button>
              </Link>
            </div>

            <div className='bg-[#ffffff93] rounded-md border border-gray-100 shadow p-6'>
              <div className='flex flex-col md:flex-row gap-8 mb-6'>
                {/* Profile Photo Section */}
                <div className='w-full md:w-64 flex flex-col items-center'>
                  <div className='w-32 h-32 rounded-full overflow-hidden relative mb-3'>
                    <Image
                      src={userData.profileImage || "/admin.jpg"}
                      alt='Profile'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span className='text-base text-primary'>Profile</span>
                  <span className='font-medium text-lg text-primary'>
                    Admin
                  </span>
                </div>

                {/* User Information Section */}
                <div className='flex-1 space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100'>
                    <div className='text-lg font-medium text-primary'>Name</div>
                    <div className='md:col-span-2 text-lg  text-primary'>
                      {userData.name}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100'>
                    <div className='text-lg font-medium text-primary'>
                      Email
                    </div>
                    <div className='md:col-span-2 text-lg text-primary'>
                      {userData.email}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-3'>
                    <div className='text-lg font-medium text-primary'>
                      Phone Number
                    </div>
                    <div className='md:col-span-2 text-lg text-primary'>
                      {userData.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
